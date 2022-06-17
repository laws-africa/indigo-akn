import { rangeToTarget, IRangeTarget } from "../ranges";

export interface IGutterEnrichmentProvider {
  /** If the provider wants to add an enrichment for this target, return a button element.
   * @param target
   */
  getButton(target: IRangeTarget): HTMLButtonElement | null;

  /**
   * The user clicked the provider's button, add an enrichment for the provided target.
   * @param target
   */
  addEnrichment(target: IRangeTarget): void;
}

/**
 * This manager provides support for creating gutter item enrichments from selected text in the document body.
 * Providers register themselves with the manager and will be called when a new range is selected.
 *
 * The manager must be created on an element that has an `la-gutter` and an `la-akoma-ntoso` element as descendants.
 */
export class GutterEnrichmentManager {
  protected root: Element;
  protected gutter: Element | null;
  protected akn: Element | null;
  protected providers: IGutterEnrichmentProvider[];
  protected floaterTimeout: number | null;
  protected target: IRangeTarget | null;
  protected floatingContainer: HTMLElement;

  constructor (root: Element) {
    this.root = root;
    this.gutter = root.querySelector('la-gutter');
    this.akn = root.querySelector('la-akoma-ntoso');
    this.providers = [];
    this.floatingContainer = this.createFloatingContainer();
    this.floaterTimeout = null;
    this.target = null;
    document.addEventListener('selectionchange', this.selectionChanged.bind(this));
  }

  addProvider (provider: IGutterEnrichmentProvider) {
    this.providers.push(provider);
  }

  createFloatingContainer () {
    const item = document.createElement('la-gutter-item');
    const btnGroup = document.createElement('div');
    btnGroup.className = 'gutter-enrichment-new-buttons btn-group-vertical btn-group-sm';
    item.appendChild(btnGroup);
    return item;
  }

  /**
   * When the selection in the document changes, transform it into a target description and, if successful,
   * show the floating button container in the gutter.
   */
  selectionChanged () {
    const sel = document.getSelection();

    if (!(this.akn && this.gutter)) {
      return;
    }

    if (sel && sel.rangeCount > 0 && !sel.getRangeAt(0).collapsed) {
      if (this.floaterTimeout) window.clearTimeout(this.floaterTimeout);

      const range = sel.getRangeAt(0);

      // is the common ancestor inside the akn container?
      if (range.commonAncestorContainer.compareDocumentPosition(this.akn) & Node.DOCUMENT_POSITION_CONTAINS) {
        // find first element
        let root: Node | null = range.startContainer;
        while (root && root.nodeType !== Node.ELEMENT_NODE) root = root.parentElement;

        // stash the range as converted to a target; this may be null!
        this.target = rangeToTarget(range, this.akn);
        if (this.target) {
          this.addProviderButtons(this.target);

          // @ts-ignore
          this.floatingContainer.anchor = root;

          // add it to the gutter if it is not already there
          if (!this.gutter.contains(this.floatingContainer)) {
            this.gutter.appendChild(this.floatingContainer);
          }
        } else {
          this.removeFloater();
        }
      }
    } else {
      // this needs to stick around for a little bit, for the case
      // where the selection has been cleared because the button is
      // being clicked
      this.floaterTimeout = window.setTimeout(this.removeFloater.bind(this), 200);
    }
  }

  addProviderButtons (target: IRangeTarget) {
    const btnGroup = this.floatingContainer.firstElementChild;
    if (btnGroup) {
      btnGroup.innerHTML = '';

      for (const provider of this.providers) {
        const btn = provider.getButton(target);
        if (btn) {
          btn.addEventListener('click', () => {
            this.removeFloater();
            provider.addEnrichment(target);
          });
          btnGroup.appendChild(btn);
        }
      }
    }
  }

  removeFloater () {
    this.floatingContainer.remove();
    this.floaterTimeout = null;
  }
}
