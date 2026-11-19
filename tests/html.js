import { createXsltProcessor } from "../src/xslt";
import { expect } from 'chai';
import { htmlToAkn } from "../src/html";

function convert(html, ugly) {
  const element = new DOMParser().parseFromString(html, 'text/html');
  const akn = htmlToAkn(element);

  if (ugly) {
    return new XMLSerializer().serializeToString(akn);
  } else {
    return prettyify(akn);
  }
}

const prettyXslt = createXsltProcessor();
prettyXslt.importStylesheet(new DOMParser().parseFromString(`<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" indent="yes" encoding="ISO-8859-1"/>

<xsl:template match="@*|node( )">
 <xsl:copy>
  <xsl:apply-templates select="@*|node( )"/>
 </xsl:copy>
</xsl:template>

</xsl:stylesheet>
`, 'text/xml'));

function prettyify(xml) {
  return new XMLSerializer().serializeToString(prettyXslt.transformToDocument(xml));
}

describe('htmlToAkn', () => {
  it('does not import legacy fontsize attributes from HTML', () => {
    const xml = convert('<table fontsize="9"><tr><td fontsize="8"><p fontsize="7">Text</p></td></tr></table>', true);
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    expect(doc.querySelector('[fontsize]')).to.equal(null);
    expect(doc.documentElement.textContent).to.equal('Text');
  });

  it('preserves table, cell and paragraph formatting without structural classes', () => {
    const xml = convert(`<table class="akn-table custom akn--text-small akn--no-padding" data-eid="table_1"><tr>
      <td class="akn-td akn--text-right"><span class="akn-p akn--text-normal akn--text-left" data-eid="p_1">First</span><p class="akn--text-xsmall">Second</p></td>
    </tr></table>`, true);
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    expect(doc.documentElement.getAttribute('class')).to.equal('custom akn--text-small akn--no-padding');
    expect(doc.querySelector('td').getAttribute('class')).to.equal('akn--text-right');
    expect(doc.querySelectorAll('td > p').length).to.equal(2);
    expect(doc.querySelector('p').getAttribute('class')).to.equal('akn--text-normal akn--text-left');
    expect(doc.querySelector('p').getAttribute('eId')).to.equal('p_1');
    expect(doc.querySelectorAll('p')[1].getAttribute('class')).to.equal('akn--text-xsmall');
  });

  it('preserves inline runs around classified paragraphs and nested table boundaries', () => {
    const xml = convert(`<table><tr><td>Before <b>bold</b><p class="akn--text-small">Middle</p>After <i>italic</i>
      <table class="akn--no-padding"><tr><td>Nested</td></tr></table>End</td></tr></table>`, true);
    const doc = new DOMParser().parseFromString(xml, 'text/xml');
    const outer = doc.documentElement;
    expect(outer.children.length).to.equal(1);
    const cell = outer.children[0].children[0];
    expect(Array.from(cell.children).map(el => el.localName)).to.deep.equal(['p', 'p', 'p', 'table', 'p']);
    expect(cell.children[0].textContent).to.equal('Before bold');
    expect(cell.children[2].textContent.trim()).to.equal('After italic');
    expect(cell.children[4].textContent).to.equal('End');
  });

  describe('#cleanAttributes()', () => {
    it('should preserve column widths', () => {
      const akn = convert(`
<table id="hcontainer_1__table_2" data-eid="hcontainer_1__table_2">
<tbody>
<tr>
<th class="akn--text-center" style="width: 21.4684%;">
<span class="akn-p">heading 1</span>
</th>
<th style="width: 78.3457%;">
<span class="akn-p">heading 2</span>
</th>
</tr>
<tr>
<td style="width: 21.4684%;">
<span class="akn-p">cell 1</span>
</td>
<td style="width: 78.3457%;">
<span class="akn-p">cell 2</span>
</td>
</tr>
<tr>
<td style="width: 21.4684%;">
<span class="akn-p">cell 3</span>
</td>
<td style="width: 78.3457%;">
<span class="akn-p">cell 4</span>
</td>
</tr>
</tbody>
</table>
`);
      expect(akn).to.eql(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" eId="hcontainer_1__table_2">
  <tr> <th class="akn--text-center" style="width: 21.4684%;"><p>heading 1</p></th> <th style="width: 78.3457%;"><p>heading 2</p></th> </tr>
  <tr> <td style="width: 21.4684%;"><p>cell 1</p></td> <td style="width: 78.3457%;"><p>cell 2</p></td> </tr>
  <tr> <td style="width: 21.4684%;"><p>cell 3</p></td> <td style="width: 78.3457%;"><p>cell 4</p></td> </tr>
</table>`);
    });

    it('should discard unwanted styles (everything other than width)', () => {
      const akn = convert(`
<table id="hcontainer_1__table_2" data-eid="hcontainer_1__table_2">
<tbody>
<tr>
<th class="akn--text-center" style="width: 21.4684%;">
<span class="akn-p">heading 1</span>
</th>
<th style="width: 78.3457%; font-size: 13px;">
<span class="akn-p">heading 2</span>
</th>
</tr>
<tr>
<td style="width: 21.4684%;">
<span class="akn-p">cell 1</span>
</td>
<td style="width: 78.3457%;">
<span class="akn-p">cell 2</span>
</td>
</tr>
<tr>
<td style="width: 21.4684%;">
<span class="akn-p">cell 3</span>
</td>
<td style="width: 78.3457%;">
<span class="akn-p">cell 4</span>
</td>
</tr>
</tbody>
</table>
`);
      expect(akn).to.eql(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" eId="hcontainer_1__table_2">
  <tr> <th class="akn--text-center" style="width: 21.4684%;"><p>heading 1</p></th> <th style="width: 78.3457%;"><p>heading 2</p></th> </tr>
  <tr> <td style="width: 21.4684%;"><p>cell 1</p></td> <td style="width: 78.3457%;"><p>cell 2</p></td> </tr>
  <tr> <td style="width: 21.4684%;"><p>cell 3</p></td> <td style="width: 78.3457%;"><p>cell 4</p></td> </tr>
</table>`);
    });
  });

  it('should preserve superscript and subscript tags', () => {
      const akn = convert(`
<table id="hcontainer_1__table_2" data-eid="hcontainer_1__table_2">
<tbody>
<tr>
<th>
<span class="akn-p">heading <sup>1</sup></span>
</th>
<th>
<span class="akn-p">heading <sub>2</sub></span>
</th>
</tr>
<tr>
<td>
<span class="akn-p">cell 1</span>
</td>
<td>
<span class="akn-p">cell 2</span>
</td>
</tr>
</tbody>
</table>
`);
      expect(akn).to.eql(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" eId="hcontainer_1__table_2">
  <tr> <th><p>heading <sup>1</sup></p></th> <th><p>heading <sub>2</sub></p></th> </tr>
  <tr> <td><p>cell 1</p></td> <td><p>cell 2</p></td> </tr>
</table>`);
  });

  it('should ignore empty attributes', () => {
    const akn = convert(`
<table id="hcontainer_1__table_2" style="  ">
<tbody>
<tr>
<th style="  ">
<span class="akn-p">heading <sup>1</sup></span>
</th>
<td style="    ">
<span class="akn-p">cell 2</span>
</td>
</tr>
</tbody>
</table>
`);
    expect(akn).to.eql(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <tr> <th><p>heading <sup>1</sup></p></th> <td><p>cell 2</p></td> </tr>
</table>`);
  });

  it('should strip meaningless whitespace', () => {
    const akn = convert(`<table>
  <tr>
    <td>
      <p>\tsome text    \t  with lots
      
      
       of whitespace
       
       </p>
     </td>
   </tr>
 </table>`, true);
    expect(akn).to.eql(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0"><tr> <td><p>some text with lots of whitespace</p></td> </tr></table>`);
  });

  it('should handle unstructured html', () => {
    const akn = convert(`<div style="color: #000000;background-color: #fffffe;font-family: Menlo, Monaco, 'Courier New', monospace;font-weight: normal;font-size: 12px;line-height: 18px;white-space: pre;">
<div><span style="color: #000000;">I want </span><span style="color: #000000;font-weight: bold;">**to**</span><span style="color: #000000;"> pas<em>te</em></span>
</div></div>`, true);
    expect(akn).to.eql(`<p xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0"> <p>I want **to** paste </p></p>`);
  });

  it('should handle simple text ', () => {
    const akn = convert(`<span>some text</span>`, true);
    expect(akn).to.eql(`some text`);
  });

  it('should handle multi-line text ', () => {
    const akn = convert(`<div><div>first</div><div>second</div></div>`, true);
    expect(akn).to.eql(`<p xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0"><p>first</p><p>second</p></p>`);
  });
});
