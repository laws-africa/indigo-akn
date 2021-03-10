import { expect } from 'chai';
import { tableToAkn } from "../src/html";

describe('tableToAkn', () => {
  describe('#cleanAttributes()', () => {
    it('should preserve column widths', () => {
      const domparser = new DOMParser();
      const xmlserializer = new XMLSerializer();
      const table_html_string = `
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
`;
      const table_html = domparser.parseFromString(table_html_string, 'text/html');
      const table_akn = tableToAkn(table_html);
      const table_akn_string = xmlserializer.serializeToString(table_akn);
      expect(table_akn_string).to.eql(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" eId="hcontainer_1__table_2"><tr>
<th class="akn--text-center" style="width: 21.4684%;"><p>heading 1</p></th>
<th style="width: 78.3457%;"><p>heading 2</p></th>
</tr><tr>
<td style="width: 21.4684%;"><p>cell 1</p></td>
<td style="width: 78.3457%;"><p>cell 2</p></td>
</tr><tr>
<td style="width: 21.4684%;"><p>cell 3</p></td>
<td style="width: 78.3457%;"><p>cell 4</p></td>
</tr></table>
`);
    });

    it('should discard unwanted Word styles', () => {
      const domparser = new DOMParser();
      const xmlserializer = new XMLSerializer();
      const table_html_string = `
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
`;
      const table_html = domparser.parseFromString(table_html_string, 'text/html');
      const table_akn = tableToAkn(table_html);
      const table_akn_string = xmlserializer.serializeToString(table_akn);
      expect(table_akn_string).to.eql(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" eId="hcontainer_1__table_2"><tr>
<th class="akn--text-center" style="width: 21.4684%;"><p>heading 1</p></th>
<th style="width: 78.3457%;"><p>heading 2</p></th>
</tr><tr>
<td style="width: 21.4684%;"><p>cell 1</p></td>
<td style="width: 78.3457%;"><p>cell 2</p></td>
</tr><tr>
<td style="width: 21.4684%;"><p>cell 3</p></td>
<td style="width: 78.3457%;"><p>cell 4</p></td>
</tr></table>
`);
    });

  });
});
