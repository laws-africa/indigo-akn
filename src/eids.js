export class EidRewriter {
  constructor () {
    this.numExpected = [
      'alinea', 'article', 'book', 'chapter', 'clause', 'division', 'indent', 'item', 'level', 'list', 'paragraph', 'part', 'point', 'proviso', 'rule', 'section', 'subchapter', 'subclause', 'subdivision', 'sublist', 'subparagraph', 'subpart', 'subrule', 'subsection', 'subtitle', 'title', 'tome', 'transitional'
    ];
    // leading whitespace and punctuation
    this.leadingPunctRe = /^[\s\u2000-\u206f\u2e00-\u2e7f!"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/g;
    // trailing whitespace and punctuation
    this.trailingPunctRe = /[\s\u2000-\u206f\u2e00-\u2e7f!"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{|}~]+$/g;
    // whitespace
    this.whitespaceRe = /\s/g;
    // general punctuation
    this.punctRe = /[\u2000-\u206f\u2e00-\u2e7f!"#$%&'()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/g;
    this.idExempt = [
      'akomaNtoso', 'act', 'amendment', 'amendmentList', 'bill', 'debate', 'debateReport', 'doc', 'documentCollection', 'judgment', 'officialGazette', 'portion', 'statement',
      'amendmentBody', 'attachments', 'body', 'collectionBody', 'components', 'coverPage', 'debateBody', 'judgmentBody', 'mainBody', 'meta', 'portionBody',
      'br', 'tr', 'td', 'th', 'num', 'heading', 'subheading', 'content',
      'abbr', 'b', 'i', 'u', 'sub', 'sup', 'ins', 'del', 'inline', 'img', 'remark', 'span',
    ];
    this.elementAliases = {
      'alinea': 'al',
      'amendmentBody': 'body',
      'article': 'art',
      'attachment': 'att',
      'blockList': 'list',
      'chapter': 'chp',
      'citation': 'cit',
      'citations': 'cits',
      'clause': 'cl',
      'component': 'cmp',
      'components': 'cmpnts',
      'componentRef': 'cref',
      'debateBody': 'body',
      'debateSection': 'dbsect',
      'division': 'dvs',
      'documentRef': 'dref',
      'eventRef': 'eref',
      'judgmentBody': 'body',
      'listIntroduction': 'intro',
      'listWrapUp': 'wrapup',
      'mainBody': 'body',
      'paragraph': 'para',
      'quotedStructure': 'qstr',
      'quotedText': 'qtext',
      'recital': 'rec',
      'recitals': 'recs',
      'section': 'sec',
      'subchapter': 'subchp',
      'subclause': 'subcl',
      'subdivision': 'subdvs',
      'subparagraph': 'subpara',
      'subsection': 'subsec',
      'temporalGroup': 'tmpg',
      'wrapUp': 'wrapup',
    };
    this.idExemptButPassToChildren = [
      'arguments', 'background', 'conclusions', 'decision', 'header', 'intro', 'introduction', 'motivation', 'preamble', 'preface', 'remedies', 'wrapUp',
    ];
    this.counters = {};
    this.eIdCounter = {};
    this.mappings = {};
  }

  /** Rewrites the eIds for all nodes in the tree.
   */
  rewriteAllEids (element, prefix = '') {
    this.reset();
    this.rewriteEid(element, prefix);
    return this.mappings;
  }

  rewriteEid (element, prefix = '') {
    // skip meta blocks
    let tag = element.tagName;
    if (tag === 'meta') {
      return;
    }

    // don't generate an eId for `act`, `num`, etc
    if (!this.idExempt.includes(tag) && !this.idExemptButPassToChildren.includes(tag)) {
      let oldEid = element.getAttribute('eId') || '';

      let num = (element.firstElementChild && element.firstElementChild.tagName === 'num') ?
          element.firstElementChild.textContent : '';
      let newEid = this.getEid(prefix, tag, num) || '';

      // update eId if changed
      if (oldEid !== newEid) {
        element.setAttribute('eId', newEid);
        // update mappings if changed (ignores duplicates and elements with no eIds in original)
        if (oldEid && !this.mappings[oldEid]) {
          this.mappings[oldEid] = newEid;
        }
      }

      // use the new eId as the prefix if there is one, or keep using the same one
      prefix = newEid || prefix;
    }

    // include the current tag in the prefix if needed
    if (this.idExemptButPassToChildren.includes(tag)) {
      prefix = prefix ? `${prefix}__${tag.toLowerCase()}` : tag.toLowerCase();
    }

    // keep drilling down
    for (let i = 0; i < element.children.length; i++) {
      this.rewriteEid(element.children[i], prefix);
    }
  }

  /** Generates a unique eId based on the element tag and its num contents (if any).
   */
  getEid (prefix, name, naiveNum) {
    if (!this.idExempt.includes(name)) {
      let shortName = this.elementAliases[name] || name,
          eId = prefix ? `${prefix}__${shortName}` : shortName;

      // some elements are effectively unique and so don't need a differentiating number
      if (!this.idExemptButPassToChildren.includes(name)) {
        let [num, nn] = this.getNum(prefix, name, naiveNum);
        eId = this.ensureUnique(`${eId}_${num}`, nn);
      }

      return eId;
    }
  }

  getNum (prefix, name, num) {
    let nn = false;
    num = this.cleanNum(num);

    // use e.g. paragraph_nn for unnumbered elements that usually have a num
    if (!num && this.numExpected.includes(name)) {
      num = 'nn';
      nn = true;
    }

    // use e.g. hcontainer_1 for unnumbered elements where a num isn't expected
    if (!num) {
      num = this.incr(prefix, name);
    }

    return [num, nn];
  }

  reset () {
    this.counters = {};
    this.eIdCounter = {};
    this.mappings = {};
  }

  /**
   * Clean a <num> value for use in an eId
   * See https://docs.oasis-open.org/legaldocml/akn-nc/v1.0/os/akn-nc-v1.0-os.html*_Toc531692306
   *
   * "The number part of the identifiers of such elements corresponds to the
   * stripping of all final punctuation, meaningless separations as well as
   * redundant characters in the content of the <num> element. The
   * representation is case-sensitive."
   *
   * Our algorithm is:
   * 1. strip all leading and trailing whitespace and punctuation (using the unicode punctuation blocks)
   * 2. strip all whitespace
   * 3. replace all remaining punctuation with a hyphen.
   *
   * The General Punctuation block is \u2000-\u206F, and the Supplemental Punctuation block is \u2E00-\u2E7F.
   *
   * (i) -> i
   * 1.2. -> 1-2
   * “2.3“ -> 2-3
   * 3a bis -> 3abis
   */
  cleanNum (num) {
    return num.replace(this.leadingPunctRe, '')
        .replace(this.trailingPunctRe, '')
        .replace(this.whitespaceRe, '')
        .replace(this.punctRe, '-');
  }

  incr (prefix, name) {
    let counter = this.counters[prefix] || (this.counters[prefix] = {}),
        count = counter[name] || 0;
    counter[name] = count + 1;

    return counter[name];
  }

  /** Ensures a given eId is unique; adds the count to `nn` and non-unique eids.
   */
  ensureUnique (eId, nn) {
    let count = (this.eIdCounter[eId] || 0) + 1;
    this.eIdCounter[eId] = count;
    if (count === 1 && !nn) {
      return eId;
    }
    return this.ensureUnique(`${eId}_${count}`, false);
  }
}

export class WorkComponentRewriter {
  constructor () {
    this.counters = {};
    this.skipElements = ['meta', 'preface', 'preamble', 'body', 'mainBody'];
  }

  /** Rewrites the FRBR URI work components for all attachment nodes in the tree.
   */
  rewriteAllAttachmentWorkComponents (element, prefix = '') {
    this.counters = {};
    this.rewriteAttachmentWorkComponent(element, prefix);
  }

  rewriteAttachmentWorkComponent (element, prefix = '') {
    let tag = element.tagName;
    if (this.skipElements.includes(tag)) {
      return;
    }

    if (tag === 'attachment') {
      let newName = this.getComponentName(element, prefix),
          workComponents = element.getElementsByTagName('FRBRthis');
      for (let x = 0; x < workComponents.length; x++) {
        let oldURI = workComponents[x].getAttribute('value'),
            oldName = oldURI ? oldURI.split('!').pop() : '';
        if (oldName !== newName) {
          let newURI = oldURI.replace(oldName, newName);
          workComponents[x].setAttribute('value', newURI);
        }
      }
      prefix = newName;
    }

    // keep drilling down
    for (let i = 0; i < element.children.length; i++) {
      this.rewriteAttachmentWorkComponent(element.children[i], prefix);
    }
  }

  /** Derives the correct FRBR URI work component for an attachment based on its name, with 'attachment' as the default.
   */
  getComponentName (attachment, prefix = '') {
    let doc = attachment.getElementsByTagName('doc')[0],
        name = doc.getAttribute('name') || 'attachment',
        num = this.incr(`__attachments`, prefix ? `${prefix}__${name}` : name);

    return prefix ? `${prefix}/${name}_${num}` : `${name}_${num}`;
  }

  incr (prefix, name) {
    let counter = this.counters[prefix] || (this.counters[prefix] = {}),
        count = counter[name] || 0;
    counter[name] = count + 1;

    return counter[name];
  }
}
