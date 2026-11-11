import { expect } from 'chai';
import { createXsltProcessor } from '../src/xslt';
import { HTML_TO_AKN_XSL } from '../src/xsl';

const stylesheet = `<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:param name="prefix"/>
<xsl:template match="/"><p><xsl:value-of select="$prefix"/><xsl:value-of select="/root"/></p></xsl:template>
</xsl:stylesheet>`;
const parse = text => new DOMParser().parseFromString(text, 'application/xml');

describe('createXsltProcessor', () => {
  it('returns fresh processors using the installed implementation', () => {
    const first = createXsltProcessor();
    expect(first).to.be.instanceOf(window.XSLTProcessor);
    expect(createXsltProcessor()).not.to.equal(first);
  });

  it('transforms XML and keeps parameters local to each processor', () => {
    const processor = createXsltProcessor();
    processor.importStylesheet(parse(stylesheet));
    processor.setParameter(null, 'prefix', 'Hello ');
    const xml = parse('<root>world</root>');
    expect(processor.transformToFragment(xml, document).textContent).to.equal('Hello world');
    expect(processor.transformToDocument(xml).documentElement.textContent).to.equal('Hello world');
    const second = createXsltProcessor();
    second.importStylesheet(parse(stylesheet));
    expect(second.transformToFragment(xml, document).textContent).to.equal('world');
  });

  it('converts HTML to AKN with the selected processor', () => {
    const processor = createXsltProcessor();
    processor.importStylesheet(parse(HTML_TO_AKN_XSL));
    const xml = parse('<div xmlns="http://www.w3.org/1999/xhtml"><p>Hello <b>world</b></p></div>');
    const result = processor.transformToFragment(xml.documentElement, document);
    expect(result.textContent).to.equal('Hello world');
    expect(result.querySelector('p').namespaceURI).to.equal('http://docs.oasis-open.org/legaldocml/ns/akn/3.0');
  });
});
