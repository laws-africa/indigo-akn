import { expect } from 'chai';
import { mapTable, fixTable, fixTables } from "../src/xml";

describe('mapTable', () => {
  it('should return an accurate map of a table, taking all colspans and rowspans into account', () => {
    const xml = `<table eId="hcontainer_1__table_1">
<tr>
  <th>
    <p eId="hcontainer_1__table_1__p_1">Heading 1</p>
  </th>
  <th>
    <p eId="hcontainer_1__table_1__p_2">Heading 2</p>
  </th>
</tr>
<tr>
  <td rowspan="5" colspan="1">
    <p eId="hcontainer_1__table_1__p_3"/>
  </td>
  <td rowspan="2" colspan="1">
    <p eId="hcontainer_1__table_1__p_4"/>
  </td>
</tr>
<tr>
  <td>
    <p eId="hcontainer_1__table_1__p_5"/>
  </td>
</tr>
<tr>
  <td>
    <p eId="hcontainer_1__table_1__p_6">Content 1</p>
  </td>
  <td>
    <p eId="hcontainer_1__table_1__p_7">Content 2</p>
  </td>
</tr>
</table>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const table = doc.querySelector('table');
    const tableMap = mapTable(table);
    expect(tableMap).to.deep.equal({
      "0": {
        "0": true, "1": true
      },
      "1": {
        "0": true, "1": true
      },
      "2": {
        "0": true, "1": true, "2": true
      },
      "3": {
        "0": true, "1": true, "2": true
      },
      "4": {
        "0": true
      },
      "5": {
        "0": true
      }
    });
  });
});

describe('fixTable', () => {
  it('should insert missing rows and cells as required to get a clean table matrix', () => {
    const xml = `<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" eId="hcontainer_1__table_1">
<tr>
  <th>
    <p eId="hcontainer_1__table_1__p_1">Heading 1</p>
  </th>
  <th>
    <p eId="hcontainer_1__table_1__p_2">Heading 2</p>
  </th>
</tr>
<tr>
  <td rowspan="5" colspan="1">
    <p eId="hcontainer_1__table_1__p_3"/>
  </td>
  <td rowspan="2" colspan="1">
    <p eId="hcontainer_1__table_1__p_4"/>
  </td>
</tr>
<tr>
  <td>
    <p eId="hcontainer_1__table_1__p_5"/>
  </td>
</tr>
<tr>
  <td>
    <p eId="hcontainer_1__table_1__p_6">Content 1</p>
  </td>
  <td>
    <p eId="hcontainer_1__table_1__p_7">Content 2</p>
  </td>
</tr>
</table>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    const table = doc.querySelector('table');
    fixTable(table);
    expect(new XMLSerializer().serializeToString(table)).to.equal(`<table xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" eId="hcontainer_1__table_1">
<tr>
  <th>
    <p eId="hcontainer_1__table_1__p_1">Heading 1</p>
  </th>
  <th>
    <p eId="hcontainer_1__table_1__p_2">Heading 2</p>
  </th>
<td><p/></td></tr>
<tr>
  <td rowspan="5" colspan="1">
    <p eId="hcontainer_1__table_1__p_3"/>
  </td>
  <td rowspan="2" colspan="1">
    <p eId="hcontainer_1__table_1__p_4"/>
  </td>
<td><p/></td></tr>
<tr>
  <td>
    <p eId="hcontainer_1__table_1__p_5"/>
  </td>
</tr>
<tr>
  <td>
    <p eId="hcontainer_1__table_1__p_6">Content 1</p>
  </td>
  <td>
    <p eId="hcontainer_1__table_1__p_7">Content 2</p>
  </td>
</tr>
<tr><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td></tr></table>`);
    const tableMap = mapTable(table);
    expect(tableMap).to.deep.equal({
      "0": {
        "0": true, "1": true, "2": true
      },
      "1": {
        "0": true, "1": true, "2": true
      },
      "2": {
        "0": true, "1": true, "2": true
      },
      "3": {
        "0": true, "1": true, "2": true
      },
      "4": {
        "0": true, "1": true, "2": true
      },
      "5": {
        "0": true, "1": true, "2": true
      }
    });
  });
});

describe('fixTables', () => {
  it('should fix all tables, and not change correct tables', () => {
    const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta>
      <identification source="#Laws-Africa">
        <FRBRWork>
          <FRBRthis value="/akn/za-playground/act/2024/7/!main"/>
          <FRBRuri value="/akn/za-playground/act/2024/7"/>
          <FRBRalias value="Table editing" name="title"/>
          <FRBRdate date="2024" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRcountry value="za-playground"/>
          <FRBRnumber value="7"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/za-playground/act/2024/7/eng@2024-08-16/!main"/>
          <FRBRuri value="/akn/za-playground/act/2024/7/eng@2024-08-16"/>
          <FRBRdate date="2024-08-16" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRlanguage language="eng"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/za-playground/act/2024/7/eng@2024-08-16/!main"/>
          <FRBRuri value="/akn/za-playground/act/2024/7/eng@2024-08-16"/>
          <FRBRdate date="2024-08-17" name="Generation"/>
          <FRBRauthor href=""/>
        </FRBRManifestation>
      </identification>
      <publication showAs="" name="" date="0001-01-01" number=""/>
      <references source="#Laws-Africa">
        <TLCOrganization eId="Laws-Africa" href="http://localhost:8000" showAs="Laws.Africa"/>
      </references>
    </meta>
    <body>
      <hcontainer name="hcontainer" eId="hcontainer_1">
        <content>
          <table eId="hcontainer_1__table_1">
            <tr>
              <th>
                <p eId="hcontainer_1__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="hcontainer_1__table_1__p_2">Heading 2</p>
              </th>
            </tr>
            <tr>
              <td rowspan="5" colspan="1">
                <p eId="hcontainer_1__table_1__p_3"/>
              </td>
              <td rowspan="2" colspan="1">
                <p eId="hcontainer_1__table_1__p_4"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_1__table_1__p_5"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_1__table_1__p_6">Content 1</p>
              </td>
              <td>
                <p eId="hcontainer_1__table_1__p_7">Content 2</p>
              </td>
            </tr>
          </table>
        </content>
      </hcontainer>
      <part eId="part_1">
        <num>1</num>
        <content>
          <table eId="part_1__table_1">
            <tr>
              <th>
                <p eId="part_1__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="part_1__table_1__p_2">Heading 2</p>
              </th>
            </tr>
            <tr>
              <td>
                <p eId="part_1__table_1__p_3"/>
              </td>
              <td rowspan="5" colspan="1">
                <p eId="part_1__table_1__p_4"/>
              </td>
              <td rowspan="2" colspan="1">
                <p eId="part_1__table_1__p_5"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="part_1__table_1__p_6"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="part_1__table_1__p_7">Content 1</p>
              </td>
              <td>
                <p eId="part_1__table_1__p_8">Content 2</p>
              </td>
            </tr>
          </table>
        </content>
      </part>
      <part eId="part_2">
        <num>2</num>
        <content>
          <table eId="part_2__table_1">
            <tr>
              <th>
                <p eId="part_2__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="part_2__table_1__p_2">Heading 2</p>
              </th>
            </tr>
            <tr>
              <td rowspan="3" colspan="1">
                <p eId="part_2__table_1__p_3"/>
              </td>
              <td rowspan="2" colspan="1">
                <p eId="part_2__table_1__p_4"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="part_2__table_1__p_5"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="part_2__table_1__p_6">Content 1</p>
              </td>
              <td>
                <p eId="part_2__table_1__p_7">Content 2</p>
              </td>
            </tr>
          </table>
        </content>
      </part>
      <part eId="part_3">
        <num>3</num>
      </part>
      <hcontainer name="hcontainer" eId="hcontainer_2">
        <content>
          <table eId="hcontainer_2__table_1">
            <tr>
              <th>
                <p eId="hcontainer_2__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="hcontainer_2__table_1__p_2">Heading 2</p>
              </th>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_2__table_1__p_3"/>
              </td>
              <td>
                <p eId="hcontainer_2__table_1__p_4"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_2__table_1__p_5"/>
              </td>
              <td>
                <p eId="hcontainer_2__table_1__p_6"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_2__table_1__p_7">Content 1</p>
              </td>
              <td>
                <p eId="hcontainer_2__table_1__p_8">Content 2</p>
              </td>
            </tr>
          </table>
        </content>
      </hcontainer>
    </body>
  </act>
</akomaNtoso>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    fixTables([doc.documentElement]);
    expect(new XMLSerializer().serializeToString(doc)).to.equal(`<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta>
      <identification source="#Laws-Africa">
        <FRBRWork>
          <FRBRthis value="/akn/za-playground/act/2024/7/!main"/>
          <FRBRuri value="/akn/za-playground/act/2024/7"/>
          <FRBRalias value="Table editing" name="title"/>
          <FRBRdate date="2024" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRcountry value="za-playground"/>
          <FRBRnumber value="7"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/za-playground/act/2024/7/eng@2024-08-16/!main"/>
          <FRBRuri value="/akn/za-playground/act/2024/7/eng@2024-08-16"/>
          <FRBRdate date="2024-08-16" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRlanguage language="eng"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/za-playground/act/2024/7/eng@2024-08-16/!main"/>
          <FRBRuri value="/akn/za-playground/act/2024/7/eng@2024-08-16"/>
          <FRBRdate date="2024-08-17" name="Generation"/>
          <FRBRauthor href=""/>
        </FRBRManifestation>
      </identification>
      <publication showAs="" name="" date="0001-01-01" number=""/>
      <references source="#Laws-Africa">
        <TLCOrganization eId="Laws-Africa" href="http://localhost:8000" showAs="Laws.Africa"/>
      </references>
    </meta>
    <body>
      <hcontainer name="hcontainer" eId="hcontainer_1">
        <content>
          <table eId="hcontainer_1__table_1">
            <tr>
              <th>
                <p eId="hcontainer_1__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="hcontainer_1__table_1__p_2">Heading 2</p>
              </th>
            <td><p/></td></tr>
            <tr>
              <td rowspan="5" colspan="1">
                <p eId="hcontainer_1__table_1__p_3"/>
              </td>
              <td rowspan="2" colspan="1">
                <p eId="hcontainer_1__table_1__p_4"/>
              </td>
            <td><p/></td></tr>
            <tr>
              <td>
                <p eId="hcontainer_1__table_1__p_5"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_1__table_1__p_6">Content 1</p>
              </td>
              <td>
                <p eId="hcontainer_1__table_1__p_7">Content 2</p>
              </td>
            </tr>
          <tr><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td></tr></table>
        </content>
      </hcontainer>
      <part eId="part_1">
        <num>1</num>
        <content>
          <table eId="part_1__table_1">
            <tr>
              <th>
                <p eId="part_1__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="part_1__table_1__p_2">Heading 2</p>
              </th>
            <td><p/></td></tr>
            <tr>
              <td>
                <p eId="part_1__table_1__p_3"/>
              </td>
              <td rowspan="5" colspan="1">
                <p eId="part_1__table_1__p_4"/>
              </td>
              <td rowspan="2" colspan="1">
                <p eId="part_1__table_1__p_5"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="part_1__table_1__p_6"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="part_1__table_1__p_7">Content 1</p>
              </td>
              <td>
                <p eId="part_1__table_1__p_8">Content 2</p>
              </td>
            </tr>
          <tr><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td></tr></table>
        </content>
      </part>
      <part eId="part_2">
        <num>2</num>
        <content>
          <table eId="part_2__table_1">
            <tr>
              <th>
                <p eId="part_2__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="part_2__table_1__p_2">Heading 2</p>
              </th>
            <td><p/></td></tr>
            <tr>
              <td rowspan="3" colspan="1">
                <p eId="part_2__table_1__p_3"/>
              </td>
              <td rowspan="2" colspan="1">
                <p eId="part_2__table_1__p_4"/>
              </td>
            <td><p/></td></tr>
            <tr>
              <td>
                <p eId="part_2__table_1__p_5"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="part_2__table_1__p_6">Content 1</p>
              </td>
              <td>
                <p eId="part_2__table_1__p_7">Content 2</p>
              </td>
            </tr>
          </table>
        </content>
      </part>
      <part eId="part_3">
        <num>3</num>
      </part>
      <hcontainer name="hcontainer" eId="hcontainer_2">
        <content>
          <table eId="hcontainer_2__table_1">
            <tr>
              <th>
                <p eId="hcontainer_2__table_1__p_1">Heading 1</p>
              </th>
              <th>
                <p eId="hcontainer_2__table_1__p_2">Heading 2</p>
              </th>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_2__table_1__p_3"/>
              </td>
              <td>
                <p eId="hcontainer_2__table_1__p_4"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_2__table_1__p_5"/>
              </td>
              <td>
                <p eId="hcontainer_2__table_1__p_6"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="hcontainer_2__table_1__p_7">Content 1</p>
              </td>
              <td>
                <p eId="hcontainer_2__table_1__p_8">Content 2</p>
              </td>
            </tr>
          </table>
        </content>
      </hcontainer>
    </body>
  </act>
</akomaNtoso>`);
  });
});
