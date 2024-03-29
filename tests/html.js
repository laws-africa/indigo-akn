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

const prettyXslt = new XSLTProcessor();
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
