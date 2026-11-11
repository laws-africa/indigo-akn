// Run with: node --experimental-vm-modules tests/lazy-xslt.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

(async () => {
  let constructions = 0;
  let imports = 0;
  const context = vm.createContext({});
  const module = new vm.SourceTextModule(fs.readFileSync('src/html.js', 'utf8'), { context });
  await module.link(specifier => new vm.SyntheticModule(
    specifier === './xsl' ? ['HTML_TO_AKN_XSL'] : ['decode'], function () {
      if (specifier === './xsl') this.setExport('HTML_TO_AKN_XSL', '<stylesheet/>');
      else this.setExport('decode', text => text);
    }, { context }
  ));
  // Loading HTML utilities must succeed with neither XSLTProcessor nor DOMParser.
  await module.evaluate();
  const processor = module.namespace.htmlToAknXslt;
  assert.throws(() => processor.transformToDocument({}), /XSLTProcessor/);
  // A failed first use must not prevent a later polyfill from supplying the API.
  context.DOMParser = class { parseFromString(text) { return text; } };
  context.XSLTProcessor = class {
    constructor() { constructions++; }
    importStylesheet() { imports++; }
    transformToDocument(node) { assert.ok(this instanceof context.XSLTProcessor); return node; }
  };
  const xml = {};
  assert.equal(processor.transformToDocument(xml), xml);
  assert.equal(processor.transformToDocument(xml), xml);
  assert.equal(constructions, 1);
  assert.equal(imports, 1);
  console.log('Lazy HTML processor: import without XSLT, retry, receiver binding and caching passed');
})().catch(error => { console.error(error); process.exitCode = 1; });
