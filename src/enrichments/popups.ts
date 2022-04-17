// @ts-ignore
import { targetToRange, markRange } from '../dom';
import tippy, { Instance as Tippy } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

/**
 * A basic enrichment.
 */
export interface IEnrichment {
  // TODO:
  target: object;
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
   * Called when a mark is being removed from the DOM.
   * @param enrichment
   * @param mark
   */
  markDestroyed(enrichment: IEnrichment, mark: Element): void;

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
 * interacts with them.
 */
export class PopupEnrichmentManager {
  protected providers: IPopupEnrichmentProvider[];
  protected documentRoot: Element;
  protected markTag: string = 'mark';
  protected markClasses: string[] = ['enrichment', 'enrichment--popup'];
  protected markers: EnrichmentMarker[];
  protected tippies: Tippy[];

  constructor (documentRoot: Element) {
    this.documentRoot = documentRoot;
    this.providers = [];
    this.markers = [];
    this.tippies = [];
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
      this.providers.splice(ix, 1);
    }
  }

  /**
   * Re-render the enrichments.
   */
  render () {
    this.removeMarks();
    this.createMarks();
    this.createPopups();
  }

  /**
   * Creates the marks and markers for enrichments provided by the providers.
   */
  createMarks () {
    for (const provider of this.providers) {
      const enrichments = provider.getEnrichments();

      for (const enrichment of enrichments) {
        const marker = new EnrichmentMarker(provider, enrichment);
        const range = targetToRange(enrichment.target, this.documentRoot);

        if (range) {
          markRange(range, this.markTag, (mark: Element) => {
            marker.marks.push(mark);
            mark.classList.add(...this.markClasses);
            provider.markCreated(enrichment, mark);
            return mark;
          });
        }

        // only add this marker marks were created
        if (marker.marks.length) {
          this.markers.push(marker);
        }
      }
    }
  }

  /**
   * Remove and destroy all marks and popups.
   */
  removeMarks () {
    for (const mark of this.markers) {
      this.unmark(mark);
    }
    this.markers = [];
  }

  /**
   * Remove and destroy all marks and popups for this marker.
   * @param marker
   */
  unmark (marker: EnrichmentMarker) {
    for (const mark of marker.marks) {
      if (mark.parentElement) {
        while (mark.firstChild) {
          mark.parentElement.insertBefore(mark.firstChild, mark);
        }
        mark.parentElement.removeChild(mark);
      }

      marker.provider.markDestroyed(marker.enrichment, mark);
    }

    // clean up tippies
    for (const popup of marker.popups) {
      popup.destroy();
    }
  }

  /**
   * Create the popups for all markers.
   */
  createPopups () {
    for (const marker of this.markers) {
      for (const mark of marker.marks) {
        const popup = tippy(mark, {
          appendTo: document.body,
          interactive: true,
          theme: 'light',
          zIndex: 0,
          onShow: (instance) => {
            instance.setContent(marker.provider.getPopupContent(marker.enrichment, mark));
          }
        });

        marker.popups.push(popup);
        marker.provider.popupCreated(marker.enrichment, popup);
      }
    }
  }
}
