import { targetToRange, markRange, IRangeTarget } from '../ranges';
import tippy, { Instance as Tippy } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

/**
 * A basic enrichment. (TODO: name this to be target-specific?)
 */
export interface IEnrichment {
  target: IRangeTarget;
}

export interface IPopupEnrichmentProvider {
  /**
   * Called to load the enrichments provided by this provider.
   */
  getEnrichments(): IEnrichment[];

  /**
   * Called when a mark is created for an enrichment.
   * @param enrichment
   * @param mark
   */
  markCreated(enrichment: IEnrichment, mark: Element): void;

  /**
   * Called when a popup is created for an enrichment.
   * @param enrichment
   * @param popup
   */
  popupCreated(enrichment: IEnrichment, popup: Tippy): void;

  /**
   * Called when the popup is about to be shown. Return the HTML Element to show as the body of the popup.
   * @param enrichment
   * @param mark
   */
  getPopupContent(enrichment: IEnrichment, mark: Element): Element;
}

export class EnrichmentMarker {
  public provider: IPopupEnrichmentProvider;
  public enrichment: IEnrichment;
  public marks: Element[];
  public popups: Tippy[];

  constructor(provider: IPopupEnrichmentProvider, enrichment: IEnrichment) {
    this.provider = provider;
    this.enrichment = enrichment;
    this.marks = [];
    this.popups = [];
  }
}

/**
 * This manager provides functionality to handle range-based enrichments that provide a popup when the user
 * interacts with them. The manager watches its document root for top-level modifications and re-applies enrichments
 * when necessary.
 */
export class PopupEnrichmentManager {
  protected providers: IPopupEnrichmentProvider[];
  protected documentRoot: Element;
  protected markTag: string = 'mark';
  protected markClasses: string[] = ['enrichment', 'enrichment--popup'];
  protected markers: EnrichmentMarker[];
  protected observer: MutationObserver;

  constructor (documentRoot: Element) {
    this.documentRoot = documentRoot;
    this.providers = [];
    this.markers = [];
    this.observer = this.createObserver();
  }

  createObserver (): MutationObserver {
    // watch the document root for changes and re-apply enrichments
    const observer = new MutationObserver(() => this.applyEnrichments());
    observer.observe(this.documentRoot, { childList: true });
    return observer;
  }

  /**
   * Register an enrichment provider with the manager.
   * @param provider
   */
  addProvider (provider: IPopupEnrichmentProvider) {
    this.providers.push(provider);
  }

  /**
   * Unregister a previously registered enrichment provider.
   * @param provider
   */
  removeProvider (provider: IPopupEnrichmentProvider) {
    const ix = this.providers.indexOf(provider);
    if (ix > -1) {
      this.unapplyProviderEnrichments(provider);
      this.providers.splice(ix, 1);
    }
  }

  /**
   * Re-apply all enrichments from all providers.
   */
  applyEnrichments () {
    for (const provider of this.providers) {
      this.applyProviderEnrichments(provider);
    }
  }

  /**
   * Creates the marks and markers for enrichments provided by this provider, after removing any existing enrichments.
   */
  applyProviderEnrichments (provider: IPopupEnrichmentProvider) {
    this.unapplyProviderEnrichments(provider);

    for (const enrichment of provider.getEnrichments()) {
      const marker = new EnrichmentMarker(provider, enrichment);
      const range = targetToRange(enrichment.target, this.documentRoot);

      if (range) {
        markRange(range, this.markTag, (mark: HTMLElement) => {
          // setup the mark
          marker.marks.push(mark);
          mark.classList.add(...this.markClasses);
          provider.markCreated(enrichment, mark);

          // setup the popup
          marker.popups.push(this.createPopup(provider, enrichment, mark));

          return mark;
        });
      }

      // only store this marker if marks were created
      if (marker.marks.length) {
        this.markers.push(marker);
      }
    }
  }

  /**
   * Remove the enrichments applied for a provider.
   * @param provider
   */
  unapplyProviderEnrichments (provider: IPopupEnrichmentProvider) {
    const markers = this.markers.filter(m => m.provider === provider);
    for (const marker of markers) {
      this.unapplyMarker(marker);
    }
  }

  /**
   * Remove and destroy all marks and popups for this marker.
   * @param marker
   */
  unapplyMarker (marker: EnrichmentMarker) {
    for (const mark of marker.marks) {
      if (mark.parentElement) {
        while (mark.firstChild) {
          mark.parentElement.insertBefore(mark.firstChild, mark);
        }
        mark.parentElement.removeChild(mark);
      }
    }

    // clean up tippies
    for (const popup of marker.popups) {
      popup.destroy();
    }
  }

  /**
   * Create a popup for this provider, enrichment and mark.
   * @param provider
   * @param enrichment
   * @param mark
   */
  createPopup (provider: IPopupEnrichmentProvider, enrichment: IEnrichment, mark: Element) {
    const popup = tippy(mark, {
      appendTo: document.body,
      interactive: true,
      theme: 'light',
      zIndex: 0,
      onShow: (instance) => {
        instance.setContent(provider.getPopupContent(enrichment, mark));
      }
    });
    provider.popupCreated(enrichment, popup);
    return popup;
  }
}
