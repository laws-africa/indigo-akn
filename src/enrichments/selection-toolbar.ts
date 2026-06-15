import { IGutterEnrichmentProvider } from './gutter';
import { rangeToTarget, IRangeTarget } from "../ranges";
import tippy, { Instance as Tippy } from 'tippy.js';

function debounce(fn: (...args: unknown[]) => void, wait = 0) {
  let timeoutId: number | undefined;

  return function debounced(this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

export interface ISelectionToolbarContext {
  selection: Selection;
  range: Range;
  root: Element;
}

export interface ISelectionToolbarOptions {
  debounceDelay?: number;
  btnGroupClassName?: string;
  shouldShow?: (context: ISelectionToolbarContext) => boolean;
}

/**
 * This class handles showing a popup toolbar when the user selects text in the document body. Providers can
 * register themselves with addProvider to have an opportunity to add buttons to the toolbar when the selection
 * changes.
 */
export class SelectionToolbar {
  protected static defaultOptions: Required<ISelectionToolbarOptions> = {
    debounceDelay: 200,
    btnGroupClassName: 'btn-group btn-group-sm bg-light',
    shouldShow: () => true,
  };

  protected root: Element;
  protected providers: IGutterEnrichmentProvider[];
  protected btnGroup: HTMLDivElement;
  protected popup: Tippy;
  protected target: IRangeTarget | null = null;
  protected range: Range | null = null;
  protected options: Required<ISelectionToolbarOptions>;

  constructor (root: Element, options: ISelectionToolbarOptions = {}) {
    this.root = root;
    this.options = {
      ...SelectionToolbar.defaultOptions,
      ...options,
    };
    this.providers = [];
    this.btnGroup = document.createElement('div');
    this.btnGroup.className = this.options.btnGroupClassName;
    this.popup = this.createPopup();
    document.addEventListener('selectionchange', debounce(this.selectionChanged.bind(this), this.options.debounceDelay));
  }

  createPopup () {
    return tippy(this.root, {
      appendTo: document.body,
      interactive: true,
      theme: 'dark',
      zIndex: 0,
      // on mobile devices, the selection toolbar overlaps this otherwise
      placement: 'bottom',
      trigger: 'manual',
      delay: [0, 0],
      getReferenceClientRect: () => this.getBoundingClientRect(),
      onShow: (instance) => {
        if (this.target) {
          // some providers re-use the same element as the content between popups, so we must clear the content
          // first otherwise the popup doesn't re-render itself
          instance.setContent('');
          instance.setContent(this.getPopupContent(this.target));
        } else {
          this.hidePopup();
        }
      }
    });
  }

  addProvider (provider: IGutterEnrichmentProvider) {
    this.providers.push(provider);
  }

  selectionChanged () {
    const sel = document.getSelection();

    if (sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed) {
      const range = sel.getRangeAt(0);

      // is the common ancestor inside the content container?
      if (
        this.options.shouldShow({ selection: sel, range, root: this.root }) &&
        range.commonAncestorContainer.compareDocumentPosition(this.root) & Node.DOCUMENT_POSITION_CONTAINS
      ) {
        // stash the range as converted to a target; this may be null!
        const target = rangeToTarget(range, this.root);
        if (target) {
          this.range = range;
          this.target = target;
          this.popup.hide();
          this.popup.show();
          return;
        }
      }
    }

    // cleanup if anything fails
    this.hidePopup();
  }

  getBoundingClientRect () {
    // @ts-ignore
    return this.range.getBoundingClientRect();
  }

  getPopupContent (target: IRangeTarget) {
    this.btnGroup.innerHTML = '';

    for (const provider of this.providers) {
      const btn = provider.getButton(target);
      if (btn) {
        btn.addEventListener('click', () => {
          this.hidePopup();
          provider.addEnrichment(target);
        });
        this.btnGroup.appendChild(btn);
      }
    }

    return this.btnGroup;
  }

  hidePopup () {
    this.popup.hide();
  }
}
