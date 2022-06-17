// @ts-ignore
import { toRange as textPositionToRange, fromRange as textPositionFromRange } from 'dom-anchor-text-position';
// @ts-ignore
import { toRange as textQuoteToRange, fromTextPosition as textQuoteFromTextPosition } from 'dom-anchor-text-quote';

// Selector for elements that are foreign to AKN documents, such as table editor buttons and annotations
export const foreignElementsSelector = '.ig';

export interface IRangeSelector {
  type: string;
  start?: number;
  end?: number;
  exact?: string;
}

export interface IRangeTarget {
  anchor_id: string;
  selectors?: IRangeSelector[];
}

/**
 * Gather all the text nodes in the given range.
 * @param range
 */
export function getTextNodes (range: Range): Text[] {
  const textNodes: Text[] = [];
  const ignore = {
    TABLE: 1,
    THEAD: 1,
    TBODY: 1,
    TR: 1
  };
  let iterator, node, posn, start, end;

  function split (node: Text, offset: number): Text {
    // split the text node so that the offsets fall on text node boundaries
    if (offset !== 0) {
      return node.splitText(offset);
    } else {
      return node;
    }
  }

  // remove foreign elements while working with the range
  if (range.startContainer.nodeType === Node.TEXT_NODE) {
    // split the start and end text nodes so that the offsets fall on text node boundaries
    start = split((range.startContainer as Text), range.startOffset);
  } else {
    // first text node
    start = document.createNodeIterator(range.startContainer, NodeFilter.SHOW_TEXT).nextNode();
    if (!start) return textNodes;
  }

  if (range.endContainer.nodeType === Node.TEXT_NODE) {
    end = split((range.endContainer as Text), range.endOffset);
  } else {
    end = range.endContainer;
  }

  // gather all the text nodes between start and end
  iterator = document.createNodeIterator(
    range.commonAncestorContainer, NodeFilter.SHOW_TEXT,
    function (n) {
      // ignore text nodes in weird positions in tables
      // @ts-ignore
      if (ignore[n.parentElement.tagName]) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    });

  // advance until we're at the start node
  let textNode = (iterator.nextNode() as Text);
  while (textNode && textNode !== start) textNode = (iterator.nextNode() as Text);

  // gather text nodes
  while (textNode) {
    posn = textNode.compareDocumentPosition(end);
    // stop if node isn't inside end, and doesn't come before end
    if ((posn & Node.DOCUMENT_POSITION_CONTAINS) === 0 &&
      (posn & Node.DOCUMENT_POSITION_FOLLOWING) === 0) break;

    textNodes.push(textNode);
    textNode = (iterator.nextNode() as Text);
  }

  return textNodes;
}

/**
 * Mark all the text nodes in a range with a given tag (eg. 'mark'),
 * calling the callback for each new marked element.
 */
export function markRange (range: Range, tag='mark', callback: (e: HTMLElement, t: Text) => HTMLElement) {
  let node: Element|null = (range.commonAncestorContainer as Element);
  if (node.nodeType !== Node.ELEMENT_NODE) {
    node = node.parentElement;
  }

  if (node) {
    withoutForeignElements(node, () => {
      // mark the gathered nodes
      for (const textNode of getTextNodes(range)) {
        if (textNode.parentElement) {
          let mark = textNode.ownerDocument.createElement(tag);
          if (callback) {
            // let the callback modify the mark
            mark = callback(mark, textNode);
          }
          if (mark) {
            textNode.parentElement.insertBefore(mark, textNode);
            mark.appendChild(textNode);
          }
        }
      }
    });
  }
}

/**
 * Removes foreign elements from the tree at root, executes callback,
 * and then replaces the foreign elements.
 *
 * This is useful for annotations because we inject foreign (ie. non-Akoma Ntoso)
 * elements into the rendered AKN document, such as table editor buttons, annotations
 * and issue indicators.
 *
 * @returns the result of callback()
 */
export function withoutForeignElements (root: Element, callback: () => any, selector=foreignElementsSelector): any {
  type RemovedElement = {
    e: Element,
    before: Node | null,
    parent: HTMLElement | null,
  };
  const removed: RemovedElement[] = [];

  // remove the foreign elements
  for (const elem of Array.from(root.querySelectorAll(selector))) {
    const info: RemovedElement = {
      e: elem,
      before: null,
      parent: null
    };

    // store where the element was in the tree
    if (elem.nextSibling) info.before = elem.nextSibling;
    // no next sibling, it's the last child
    else info.parent = elem.parentElement;

    if (elem.parentElement) {
      elem.parentElement.removeChild(elem);
    }
    removed.push(info);
  }

  try {
    return callback();
  } finally {
    // put the elements back, even if result throws an error
    removed.reverse();
    for (const info of removed) {
      if (info.before && info.before.parentElement) {
        info.before.parentElement.insertBefore(info.e, info.before);
      } else if (info.parent) {
        info.parent.appendChild(info.e);
      }
    }
  }
}

/**
 * Convert a Target object (anchor_id, selectors) to an Range object in an HTML document.
 *
 * This does its best to try to find a match, walking up the anchor hierarchy if possible.
 *
 * @param target the range target
 * @param root root element to look within
 */
export function targetToRange (target: IRangeTarget, root: Element): Range | null {
  let anchorId = target.anchor_id;
  let ix = anchorId.lastIndexOf('__');
  let anchor = root.querySelector(`[id="${anchorId}"]`);

  // do our best to find the anchor node, going upwards up the id chain if the id has components
  while (!anchor && ix > -1) {
    anchorId = anchorId.substring(0, ix);
    ix = anchorId.lastIndexOf('__');
    anchor = root.querySelector(`[id="${anchorId}"]`);
  }

  if (anchor) {
    if (target.selectors) {
      // remove foreign elements, then use the selectors to find the text and build up a Range object.
      return withoutForeignElements(anchor, () => {
        // @ts-ignore
        return selectorsToRange(anchor, target.selectors);
      });
    } else {
      // no selectors, the anchor is the range
      const range = root.ownerDocument.createRange();
      range.setStartBefore(anchor);
      range.setEndAfter(anchor);
      return range;
    }
  }

  return null;
}

/**
 * Convert a Target object (anchor_id, selectors) to an Range object in an AKN XML document.
 *
 * This does its best to try to find a match, walking up the anchor hierarchy if possible.
 *
 * @param target the range target
 * @param root root element to look within
 */
export function targetToAknRange (target: IRangeTarget, root: Element): Range | null {
  function find (id: string): Element | null {
    // special case of top-level anchor
    // TODO: add others
    if (id === 'arguments') {
      return root.querySelector(id);
    } else {
      return root.querySelector(`[eId=${id}]`);
    }
  }
  let anchorId = target.anchor_id;
  let ix = anchorId.lastIndexOf('__');
  let anchor = find(anchorId);

  // do our best to find the anchor node, going upwards up the id chain if the id has components
  while (!anchor && ix > -1) {
    anchorId = anchorId.substring(0, ix);
    ix = anchorId.lastIndexOf('__');
    anchor = find(anchorId);
  }

  if (anchor) {
    if (target.selectors) {
      return selectorsToRange(anchor, target.selectors);
    } else {
      // no selectors, the anchor is the range
      const range = new Range();
      range.setStartBefore(anchor);
      range.setEndAfter(anchor);
      return range;
    }
  }

  return null;
}

/**
 * Given a root and a list of selectors, create browser Range object.
 *
 * Only TextPositionSelector and TextQuoteSelector types from https://www.w3.org/TR/annotation-model/
 * are used.
 */
export function selectorsToRange (anchor: Element, selectors: IRangeSelector[]) {
  let range;
  const posnSelector = selectors.find(s => s.type === 'TextPositionSelector');
  const quoteSelector = selectors.find(s => s.type === 'TextQuoteSelector');

  if (posnSelector) {
    try {
      range = textPositionToRange(anchor, posnSelector);
      // compare text with the exact from the quote selector
      if (!quoteSelector || range.toString() === quoteSelector.exact) {
        return range;
      }
    } catch (err) {
      // couldn't match to the position, try the quote selector instead
    }
  }

  // fall back to the quote selector
  if (quoteSelector) {
    return textQuoteToRange(anchor, quoteSelector);
  }
}

/**
 * Given a browser Range object, transform it into a target description
 * suitable for use with annotations. Will not go above root, if given.
 */
export function rangeToTarget (range: Range, root: Element): IRangeTarget | null {
  let anchor: Element | null = (range.commonAncestorContainer as Element);

  // find the closest element to this anchor that has an id attribute
  if (anchor.nodeType !== Node.ELEMENT_NODE) {
    anchor = anchor.parentElement;
    if (!anchor) {
      return null;
    }
  }

  anchor = anchor.closest('[id]');
  // bail if there's no anchor, or the anchor is outside of the root
  if (!anchor || (anchor !== root && (anchor.compareDocumentPosition(root) & Node.DOCUMENT_POSITION_CONTAINS) === 0)) {
    return null;
  }

  const target: IRangeTarget = {
    anchor_id: anchor.id,
    selectors: []
  };

  withoutForeignElements(anchor, () => {
    // position selector
    let selector = textPositionFromRange(anchor, range);
    selector.type = 'TextPositionSelector';
    // @ts-ignore
    target.selectors.push(selector);

    // quote selector, based on the position
    selector = textQuoteFromTextPosition(anchor, selector);
    selector.type = 'TextQuoteSelector';
    // @ts-ignore
    target.selectors.push(selector);
  });

  return target;
}
