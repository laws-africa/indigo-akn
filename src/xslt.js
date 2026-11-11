let installed = false;

/**
 * Create a fresh processor using the implementation selected by xslt-polyfill.
 * Loading the polyfill and initializing WASM are deferred until first use.
 */
export function createXsltProcessor () {
  if (!installed) {
    window.xsltDontAutoloadXmlDocs = true;
    window.xsltUsePolyfillOnlyIfNeeded = true;
    if (typeof window.XSLTProcessor !== 'function') {
      // Upstream detection handles an absent property, but not an undefined one.
      delete window.XSLTProcessor;
    }
    require('xslt-polyfill');
    installed = true;
  }
  return new window.XSLTProcessor();
}
