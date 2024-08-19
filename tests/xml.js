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
  it('should handle empty rows and more examples of bad spans', () => {
    const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta/>
    <body>
      <part eId="part_1">
        <num>1.</num>
        <heading>Heading</heading>
        <content>
          <table eId="att_1__table_2">
            <tr>
              <td rowspan="12">
                <p eId="att_1__table_2__p_1">Nature of ownership<br/>or control the<br/>beneficial owner has<br/>in the company ,<br/>whether individually<br/>or jointly*</p>
              </td>
              <td rowspan="2" colspan="3">
                <p eId="att_1__table_2__p_2">.The percentage of issued shares a person holds in the company - Directly.........%of shares<br/>-Indirectly.........%of shares</p>
              </td>
            </tr>
            <tr/>
            <tr>
              <td colspan="3">
                <p eId="att_1__table_2__p_3">The percentage of voting rights a person holds in the company <br/>- Directly.........%of shares<br/>-Indirectly.........%of shares</p>
              </td>
            </tr>
            <tr>
              <td rowspan="2" colspan="3">
                <p eId="att_1__table_2__p_4">.A person holds a right to appoint or remove a majority of the members of the board of directors of the company : <br/>- Directly<br/>-Indirectly</p>
              </td>
            </tr>
            <tr/>
            <tr>
              <td colspan="3">
                <p eId="att_1__table_2__p_5">A person exercises significant influence or control over the company.<br/>- Directly<br/>-Indirectly</p>
              </td>
            </tr>
            <tr>
              <td rowspan="2" colspan="3" style="width:54.078%">
                <p eId="att_1__table_2__p_6">.A person holds the highest percentage of the issued<br/>shares but does not meet the above<br/>four criteria . <br/>- Directly.........%of shares<br/>-Indirectly.........%of shares</p>
              </td>
            </tr>
          </table>
          <table eId="att_2__table_1">
            <tr>
              <td colspan="4">
                <p eId="att_2__table_1__p_1"><b>Address of Department</b></p>
                <p eId="att_2__table_1__p_2"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="4">
                <p eId="att_2__table_1__p_3"/>
              </td>
              <td rowspan="14">
                <p eId="att_2__table_1__p_4"/>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p eId="att_2__table_1__p_5"><b>Reference number</b></p>
                <p eId="att_2__table_1__p_6"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="4">
                <p eId="att_2__table_1__p_7"/>
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <p eId="att_2__table_1__p_8"><i>Complete this form by using BLOCK letters and by ticking the appropriate boxes.</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="akn--text-center">
                <p eId="att_2__table_1__p_9"><b>Part A: Applications in terms of the Act</b></p>
              </td>
            </tr>
            <tr>
              <td style="width:54.4725%">
                <p eId="att_2__table_1__p_10"><b>Land development</b></p>
                <p eId="att_2__table_1__p_11"><i>Section 53(2) of the Act and regulations 10(4) and 12)</i></p>
              </td>
              <td style="width:4.12844%">
                <p eId="att_2__table_1__p_12">Y</p>
              </td>
              <td style="width:3.7844%">
                <p eId="att_2__table_1__p_13">N</p>
              </td>
              <td colspan="5" style="width:35.0917%">
                <p eId="att_2__table_1__p_14">If yes, complete all parts, except part H, of this application form.</p>
              </td>
            </tr>
            <tr>
              <td style="width:54.4725%">
                <p eId="att_2__table_1__p_15"><b>Amendment of land development approval </b></p>
                <p eId="att_2__table_1__p_16"><i>(Section 53(2) of the Act and regulations 10(5) and 12)</i></p>
              </td>
              <td style="width:4.12844%">
                <p eId="att_2__table_1__p_17">Y</p>
              </td>
              <td style="width:3.7844%">
                <p eId="att_2__table_1__p_18">N</p>
              </td>
              <td colspan="5" style="width:35.0917%">
                <p eId="att_2__table_1__p_19">If yes, complete all parts, except part H, of this application form.</p>
              </td>
            </tr>
            <tr>
              <td style="width:54.4725%">
                <p eId="att_2__table_1__p_20"><b>Extension of validity period </b></p>
                <p eId="att_2__table_1__p_21"><i>(Section 57(2) of the Act and regulation 28)</i></p>
              </td>
              <td style="width:4.12844%">
                <p eId="att_2__table_1__p_22">Y</p>
              </td>
              <td style="width:3.7844%">
                <p eId="att_2__table_1__p_23">N</p>
              </td>
              <td colspan="5" style="width:35.0917%">
                <p eId="att_2__table_1__p_24">If yes, complete all parts, except part G, of this application form.</p>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="akn--text-center">
                <p eId="att_2__table_1__p_25"><b>Part B: Applicant details</b></p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_26">First name(s)</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_27"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_28">Surname</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_29"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_30">Company name (If applicable)</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_31"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_32">Postal address</p>
              </td>
              <td colspan="3" style="width:3.89908%">
                <p eId="att_2__table_1__p_33"/>
              </td>
              <td colspan="2">
                <p eId="att_2__table_1__p_34">Postal code</p>
              </td>
              <td>
                <p eId="att_2__table_1__p_35"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_36">E-mail</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_37"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_2__table_1__p_38">Tel.</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_1__p_39">Fax</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_1__p_40"/>
              </td>
              <td>
                <p eId="att_2__table_1__p_41">Cell.</p>
              </td>
              <td>
                <p eId="att_2__table_1__p_42"/>
              </td>
            </tr>
          </table>
          <table eId="att_2__table_2">
            <tr>
              <td colspan="16" class="akn--text-center">
                <p eId="att_2__table_2__p_1"><b>Part C: Details of owner(s)</b><i>(If different from applicant)</i></p>
              </td>
            </tr>
            <tr>
              <td style="width:32.7982%">
                <p eId="att_2__table_2__p_2">Full name(s)</p>
              </td>
              <td colspan="15" style="width:61.9266%">
                <p eId="att_2__table_2__p_3"/>
              </td>
            </tr>
            <tr>
              <td rowspan="2" style="width:32.7982%">
                <p eId="att_2__table_2__p_4">Physical address(es)</p>
              </td>
              <td colspan="11" rowspan="2" style="width:34.633%">
                <p eId="att_2__table_2__p_5"/>
              </td>
              <td colspan="4">
                <p eId="att_2__table_2__p_6"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_2__table_2__p_7"/>
              </td>
              <td>
                <p eId="att_2__table_2__p_8">Postal code</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_2__p_9"/>
              </td>
            </tr>
            <tr>
              <td style="width:32.7982%">
                <p eId="att_2__table_2__p_10">E-mail</p>
              </td>
              <td colspan="15" style="width:61.9266%">
                <p eId="att_2__table_2__p_11"/>
              </td>
            </tr>
            <tr>
              <td colspan="5" style="width:18.1193%">
                <p eId="att_2__table_2__p_12">Tel.</p>
              </td>
              <td style="width:20.9862%">
                <p eId="att_2__table_2__p_13"/>
              </td>
              <td colspan="7">
                <p eId="att_2__table_2__p_14">Fax</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_15">Cell.</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_2__p_16"/>
              </td>
            </tr>
            <tr>
              <td colspan="16" class="akn--text-center">
                <p eId="att_2__table_2__p_17"><b>Part D: Property details </b><i>(In accordance with title deed)</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_18">Property description <i>(Number(s) of Erf/ Erven/Portion(s) or Farm(s))</i></p>
              </td>
              <td colspan="14">
                <p eId="att_2__table_2__p_19"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_20">Physical address</p>
              </td>
              <td colspan="11">
                <p eId="att_2__table_2__p_21"/>
              </td>
              <td colspan="2">
                <p eId="att_2__table_2__p_22">Town/City</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_23"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_24">Current zoning</p>
              </td>
              <td colspan="7">
                <p eId="att_2__table_2__p_25"/>
              </td>
              <td colspan="3">
                <p eId="att_2__table_2__p_26">Extent</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_27">m²/ ha</p>
              </td>
              <td colspan="3">
                <p eId="att_2__table_2__p_28">Are there existing buildings?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_29">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_30">N</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_31">Current land use</p>
              </td>
              <td colspan="14">
                <p eId="att_2__table_2__p_32"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_33">Title deed number and date</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_34">T</p>
              </td>
              <td colspan="13">
                <p eId="att_2__table_2__p_35"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_36">Any restrictive conditions?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_37">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_38">N</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_39">If yes, list conditions</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_40"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_41">Is the property encumbered by a bond?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_42">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_43">N</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_44">If yes, list bondholder(s)</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_45"/>
              </td>
            </tr>
            <tr>
              <td colspan="16" class="akn--text-center">
                <p eId="att_2__table_2__p_46"><b>Part E: Pre-application consultation</b><i> (regulation 11)</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="7">
                <p eId="att_2__table_2__p_47">Has there been any pre-application consultation?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_48">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_49">N</p>
              </td>
              <td colspan="7">
                <p eId="att_2__table_2__p_50">If yes, complete the information below and attach the minutes of the pre-application consultation.</p>
              </td>
            </tr>
            <tr>
              <td colspan="7">
                <p eId="att_2__table_2__p_51">Official’s name</p>
              </td>
              <td colspan="4">
                <p eId="att_2__table_2__p_52">Reference Number</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_53">Date of consultation</p>
              </td>
            </tr>
          </table>
          <table eId="att_3__table_1">
            <tr>
              <td colspan="4">
                <p eId="att_3__table_1__p_1"><b>Address of Department </b></p>
                <p eId="att_3__table_1__p_2"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="6">
                <p eId="att_3__table_1__p_3"/>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p eId="att_3__table_1__p_4"><b>Reference number</b></p>
                <p eId="att_3__table_1__p_5"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="6">
                <p eId="att_3__table_1__p_6"/>
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <p eId="att_3__table_1__p_7"><i>Complete this form using BLOCK letters and ticking the appropriate boxes.</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <p eId="att_3__table_1__p_8"><i>Note:</i></p>
                <p eId="att_3__table_1__p_9"><i>An appeal to the Provincial Minister must be submitted within <b>21 days</b> of the date of notification of the decision.</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="10" class="akn--text-center">
                <p eId="att_3__table_1__p_10"><b>Part A: Appeal</b></p>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_3__table_1__p_11">Are you appealing against the decision of the Head of Department?</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_12">Y</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_13">N</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_14"/>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_3__table_1__p_15">Are you appealing against a condition of approval imposed by the Head of Department?</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_16">Y</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_17">N</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_18">If yes, list condition(s) in Part F</p>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_3__table_1__p_19">Are you are appealing because your rights have been affected by the failure of the Head of Department to decide on your application within the prescribed period?</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_20">Y</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_21">N</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_22"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_3__table_1__p_23">Date of decision</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_24">DD/MM/YYYY</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_25">Date of notification</p>
              </td>
              <td colspan="5">
                <p eId="att_3__table_1__p_26">DD/MM/YYYY</p>
              </td>
            </tr>
            <tr>
              <td colspan="10" class="akn--text-center">
                <p eId="att_3__table_1__p_27"><b>Part B: Appellant's details</b></p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_28">First name(s)</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_29"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_30">Surname</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_31"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_32">Company or legal person's name <i>(If applicable)</i></p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_33"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_34">Physical address</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_35"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_36">Postal address <i>(If different from physical address)</i></p>
              </td>
              <td colspan="4">
                <p eId="att_3__table_1__p_37"/>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_38">Postal code</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_39"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_40">E-mail</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_41"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_3__table_1__p_42">Tel.</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_43">Fax</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_44"/>
              </td>
              <td>
                <p eId="att_3__table_1__p_45">Cell.</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_46"/>
              </td>
            </tr>
          </table>
          <table eId="att_23__table_1">
            <tr>
              <th>
                <p eId="att_23__table_1__p_1">No.</p>
              </th>
              <th class="akn--text-center">
                <p eId="att_23__table_1__p_2">Security plan</p>
              </th>
              <th rowspan="1" colspan="2" class="akn--text-center">
                <p eId="att_23__table_1__p_3">Check box</p>
              </th>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_4">1.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_5">The floor plan of the proposed site or area.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_6">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_7">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_8">2.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_9">The access point (entry and exit).</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_10">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_11">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_12">3.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_13">The entry/ exit point to be manned at all times.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_14">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_15">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_16">4.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_17">Patrons to be searched at point of arrival and departure.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_18">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_19">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_20">5.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_21">Storage facilities for licensed firearms to be provided.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_22">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_23">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_24">6.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_25">The point of sale to be cordoned off (indicated on the floor plan submitted).</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_26">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_27">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_28">7.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_29">The restricted part for consumption of liquor to be cordoned off (to be indicated on the floor plan submitted).</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_30">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_31">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_32">8.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_33">Parking to be provided.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_34">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_35">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_36">9.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_37">Ablution facilities for males and females to be provided.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_38">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_39">No</p>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="akn--text-center">
                <p eId="att_23__table_1__p_40"/>
              </th>
              <th class="akn--text-center">
                <p eId="att_23__table_1__p_41"/>
              </th>
            </tr>
          </table>
          <table eId="att_22__table_1">
            <tr>
              <th colspan="2" class="akn--text-center">
                <p eId="att_22__table_1__p_1">1. Details of licensed outlet or premises</p>
              </th>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_2">(a) Name of outlet:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_3">(b) Trade name/s (if any):</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_4">(c) Registration number:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_5">(d) Name of the metropolitan municipality/district municipality or local municipality where the licensed premises are situated:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_6">(e) Physical business address of applicant:</p>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="akn--text-center">
                <p eId="att_22__table_1__p_7">2. Personal details of the applicant</p>
              </th>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_8">(a) Names and surname:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_9">(b) Designation of applicant:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_10">(c) Contact details:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_11">Cell: __________________________ Tel: __________________________ Fax: __________________________ Email: _________________________________</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_12"><i><b>(Please attach certified copies of the documents requested in terms of regulation 25(3) to this form)</b></i></p>
                <p eId="att_22__table_1__p_13">1. During the past 12 months, has the applicant, or any person holding an interest in the applicant, become disqualified from holding this liquor licence, as contemplated in section 40 of the Act?</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_22__table_1__p_14">Yes</p>
              </td>
              <td>
                <p eId="att_22__table_1__p_15">No</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_16">2. If the answer to the above question is in the affirmative, please provide details of any decision taken by the relevant provincial licensing authority in terms of section 40 of the Act</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_17">3. Has the applicant or any of its owners, directors or subsidiaries been indicted or charged with any criminal offence, excluding traffic offences, during the past 12 months?</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_22__table_1__p_18">Yes</p>
              </td>
              <td>
                <p eId="att_22__table_1__p_19">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_22__table_1__p_20"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_21">4. Has the applicant or any of its subsidiaries been a party to a law suit during the past 12 months?</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_22">If yes, provide details: __________________________</p>
              </td>
            </tr>
          </table>
        </content>
      </part>
    </body>
  </act>
</akomaNtoso>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    fixTables([doc.documentElement]);
    expect(new XMLSerializer().serializeToString(doc)).to.equal(`<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta/>
    <body>
      <part eId="part_1">
        <num>1.</num>
        <heading>Heading</heading>
        <content>
          <table eId="att_1__table_2">
            <tr>
              <td rowspan="12">
                <p eId="att_1__table_2__p_1">Nature of ownership<br/>or control the<br/>beneficial owner has<br/>in the company ,<br/>whether individually<br/>or jointly*</p>
              </td>
              <td rowspan="2" colspan="3">
                <p eId="att_1__table_2__p_2">.The percentage of issued shares a person holds in the company - Directly.........%of shares<br/>-Indirectly.........%of shares</p>
              </td>
            <td><p/></td><td><p/></td><td><p/></td></tr>
            
            <tr>
              <td colspan="3">
                <p eId="att_1__table_2__p_3">The percentage of voting rights a person holds in the company <br/>- Directly.........%of shares<br/>-Indirectly.........%of shares</p>
              </td>
            </tr>
            <tr>
              <td rowspan="2" colspan="3">
                <p eId="att_1__table_2__p_4">.A person holds a right to appoint or remove a majority of the members of the board of directors of the company : <br/>- Directly<br/>-Indirectly</p>
              </td>
            <td><p/></td><td><p/></td><td><p/></td></tr>
            
            <tr>
              <td colspan="3">
                <p eId="att_1__table_2__p_5">A person exercises significant influence or control over the company.<br/>- Directly<br/>-Indirectly</p>
              </td>
            </tr>
            <tr>
              <td rowspan="2" colspan="3" style="width:54.078%">
                <p eId="att_1__table_2__p_6">.A person holds the highest percentage of the issued<br/>shares but does not meet the above<br/>four criteria . <br/>- Directly.........%of shares<br/>-Indirectly.........%of shares</p>
              </td>
            <td><p/></td><td><p/></td><td><p/></td></tr>
          <tr><td><p/></td><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td></tr><tr><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td><td><p/></td></tr></table>
          <table eId="att_2__table_1">
            <tr>
              <td colspan="4">
                <p eId="att_2__table_1__p_1"><b>Address of Department</b></p>
                <p eId="att_2__table_1__p_2"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="4">
                <p eId="att_2__table_1__p_3"/>
              </td>
              <td rowspan="14">
                <p eId="att_2__table_1__p_4"/>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p eId="att_2__table_1__p_5"><b>Reference number</b></p>
                <p eId="att_2__table_1__p_6"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="4">
                <p eId="att_2__table_1__p_7"/>
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <p eId="att_2__table_1__p_8"><i>Complete this form by using BLOCK letters and by ticking the appropriate boxes.</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="akn--text-center">
                <p eId="att_2__table_1__p_9"><b>Part A: Applications in terms of the Act</b></p>
              </td>
            </tr>
            <tr>
              <td style="width:54.4725%">
                <p eId="att_2__table_1__p_10"><b>Land development</b></p>
                <p eId="att_2__table_1__p_11"><i>Section 53(2) of the Act and regulations 10(4) and 12)</i></p>
              </td>
              <td style="width:4.12844%">
                <p eId="att_2__table_1__p_12">Y</p>
              </td>
              <td style="width:3.7844%">
                <p eId="att_2__table_1__p_13">N</p>
              </td>
              <td colspan="5" style="width:35.0917%">
                <p eId="att_2__table_1__p_14">If yes, complete all parts, except part H, of this application form.</p>
              </td>
            </tr>
            <tr>
              <td style="width:54.4725%">
                <p eId="att_2__table_1__p_15"><b>Amendment of land development approval </b></p>
                <p eId="att_2__table_1__p_16"><i>(Section 53(2) of the Act and regulations 10(5) and 12)</i></p>
              </td>
              <td style="width:4.12844%">
                <p eId="att_2__table_1__p_17">Y</p>
              </td>
              <td style="width:3.7844%">
                <p eId="att_2__table_1__p_18">N</p>
              </td>
              <td colspan="5" style="width:35.0917%">
                <p eId="att_2__table_1__p_19">If yes, complete all parts, except part H, of this application form.</p>
              </td>
            </tr>
            <tr>
              <td style="width:54.4725%">
                <p eId="att_2__table_1__p_20"><b>Extension of validity period </b></p>
                <p eId="att_2__table_1__p_21"><i>(Section 57(2) of the Act and regulation 28)</i></p>
              </td>
              <td style="width:4.12844%">
                <p eId="att_2__table_1__p_22">Y</p>
              </td>
              <td style="width:3.7844%">
                <p eId="att_2__table_1__p_23">N</p>
              </td>
              <td colspan="5" style="width:35.0917%">
                <p eId="att_2__table_1__p_24">If yes, complete all parts, except part G, of this application form.</p>
              </td>
            </tr>
            <tr>
              <td colspan="8" class="akn--text-center">
                <p eId="att_2__table_1__p_25"><b>Part B: Applicant details</b></p>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_26">First name(s)</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_27"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_28">Surname</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_29"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_30">Company name (If applicable)</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_31"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_32">Postal address</p>
              </td>
              <td colspan="3" style="width:3.89908%">
                <p eId="att_2__table_1__p_33"/>
              </td>
              <td colspan="2">
                <p eId="att_2__table_1__p_34">Postal code</p>
              </td>
              <td>
                <p eId="att_2__table_1__p_35"/>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="width:58.7156%">
                <p eId="att_2__table_1__p_36">E-mail</p>
              </td>
              <td colspan="6" style="width:39.2202%">
                <p eId="att_2__table_1__p_37"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_2__table_1__p_38">Tel.</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_1__p_39">Fax</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_1__p_40"/>
              </td>
              <td>
                <p eId="att_2__table_1__p_41">Cell.</p>
              </td>
              <td>
                <p eId="att_2__table_1__p_42"/>
              </td>
            <td><p/></td></tr>
          </table>
          <table eId="att_2__table_2">
            <tr>
              <td colspan="16" class="akn--text-center">
                <p eId="att_2__table_2__p_1"><b>Part C: Details of owner(s)</b><i>(If different from applicant)</i></p>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td style="width:32.7982%">
                <p eId="att_2__table_2__p_2">Full name(s)</p>
              </td>
              <td colspan="15" style="width:61.9266%">
                <p eId="att_2__table_2__p_3"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td rowspan="2" style="width:32.7982%">
                <p eId="att_2__table_2__p_4">Physical address(es)</p>
              </td>
              <td colspan="11" rowspan="2" style="width:34.633%">
                <p eId="att_2__table_2__p_5"/>
              </td>
              <td colspan="4">
                <p eId="att_2__table_2__p_6"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td>
                <p eId="att_2__table_2__p_7"/>
              </td>
              <td>
                <p eId="att_2__table_2__p_8">Postal code</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_2__p_9"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td style="width:32.7982%">
                <p eId="att_2__table_2__p_10">E-mail</p>
              </td>
              <td colspan="15" style="width:61.9266%">
                <p eId="att_2__table_2__p_11"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="5" style="width:18.1193%">
                <p eId="att_2__table_2__p_12">Tel.</p>
              </td>
              <td style="width:20.9862%">
                <p eId="att_2__table_2__p_13"/>
              </td>
              <td colspan="7">
                <p eId="att_2__table_2__p_14">Fax</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_15">Cell.</p>
              </td>
              <td colspan="2">
                <p eId="att_2__table_2__p_16"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="16" class="akn--text-center">
                <p eId="att_2__table_2__p_17"><b>Part D: Property details </b><i>(In accordance with title deed)</i></p>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_18">Property description <i>(Number(s) of Erf/ Erven/Portion(s) or Farm(s))</i></p>
              </td>
              <td colspan="14">
                <p eId="att_2__table_2__p_19"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_20">Physical address</p>
              </td>
              <td colspan="11">
                <p eId="att_2__table_2__p_21"/>
              </td>
              <td colspan="2">
                <p eId="att_2__table_2__p_22">Town/City</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_23"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_24">Current zoning</p>
              </td>
              <td colspan="7">
                <p eId="att_2__table_2__p_25"/>
              </td>
              <td colspan="3">
                <p eId="att_2__table_2__p_26">Extent</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_27">m²/ ha</p>
              </td>
              <td colspan="3">
                <p eId="att_2__table_2__p_28">Are there existing buildings?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_29">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_30">N</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_31">Current land use</p>
              </td>
              <td colspan="14">
                <p eId="att_2__table_2__p_32"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_33">Title deed number and date</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_34">T</p>
              </td>
              <td colspan="13">
                <p eId="att_2__table_2__p_35"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_36">Any restrictive conditions?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_37">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_38">N</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_39">If yes, list conditions</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_40"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="2">
                <p eId="att_2__table_2__p_41">Is the property encumbered by a bond?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_42">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_43">N</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_44">If yes, list bondholder(s)</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_45"/>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="16" class="akn--text-center">
                <p eId="att_2__table_2__p_46"><b>Part E: Pre-application consultation</b><i> (regulation 11)</i></p>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="7">
                <p eId="att_2__table_2__p_47">Has there been any pre-application consultation?</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_48">Y</p>
              </td>
              <td>
                <p eId="att_2__table_2__p_49">N</p>
              </td>
              <td colspan="7">
                <p eId="att_2__table_2__p_50">If yes, complete the information below and attach the minutes of the pre-application consultation.</p>
              </td>
            <td><p/></td><td><p/></td></tr>
            <tr>
              <td colspan="7">
                <p eId="att_2__table_2__p_51">Official’s name</p>
              </td>
              <td colspan="4">
                <p eId="att_2__table_2__p_52">Reference Number</p>
              </td>
              <td colspan="6">
                <p eId="att_2__table_2__p_53">Date of consultation</p>
              </td>
            <td><p/></td></tr>
          </table>
          <table eId="att_3__table_1">
            <tr>
              <td colspan="4">
                <p eId="att_3__table_1__p_1"><b>Address of Department </b></p>
                <p eId="att_3__table_1__p_2"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="6">
                <p eId="att_3__table_1__p_3"/>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <p eId="att_3__table_1__p_4"><b>Reference number</b></p>
                <p eId="att_3__table_1__p_5"><i>(To be completed by an official)</i></p>
              </td>
              <td colspan="6">
                <p eId="att_3__table_1__p_6"/>
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <p eId="att_3__table_1__p_7"><i>Complete this form using BLOCK letters and ticking the appropriate boxes.</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="10">
                <p eId="att_3__table_1__p_8"><i>Note:</i></p>
                <p eId="att_3__table_1__p_9"><i>An appeal to the Provincial Minister must be submitted within <b>21 days</b> of the date of notification of the decision.</i></p>
              </td>
            </tr>
            <tr>
              <td colspan="10" class="akn--text-center">
                <p eId="att_3__table_1__p_10"><b>Part A: Appeal</b></p>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_3__table_1__p_11">Are you appealing against the decision of the Head of Department?</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_12">Y</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_13">N</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_14"/>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_3__table_1__p_15">Are you appealing against a condition of approval imposed by the Head of Department?</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_16">Y</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_17">N</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_18">If yes, list condition(s) in Part F</p>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_3__table_1__p_19">Are you are appealing because your rights have been affected by the failure of the Head of Department to decide on your application within the prescribed period?</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_20">Y</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_21">N</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_22"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_3__table_1__p_23">Date of decision</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_24">DD/MM/YYYY</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_25">Date of notification</p>
              </td>
              <td colspan="5">
                <p eId="att_3__table_1__p_26">DD/MM/YYYY</p>
              </td>
            </tr>
            <tr>
              <td colspan="10" class="akn--text-center">
                <p eId="att_3__table_1__p_27"><b>Part B: Appellant's details</b></p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_28">First name(s)</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_29"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_30">Surname</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_31"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_32">Company or legal person's name <i>(If applicable)</i></p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_33"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_34">Physical address</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_35"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_36">Postal address <i>(If different from physical address)</i></p>
              </td>
              <td colspan="4">
                <p eId="att_3__table_1__p_37"/>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_38">Postal code</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_39"/>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_3__table_1__p_40">E-mail</p>
              </td>
              <td colspan="8">
                <p eId="att_3__table_1__p_41"/>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_3__table_1__p_42">Tel.</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_43">Fax</p>
              </td>
              <td colspan="2">
                <p eId="att_3__table_1__p_44"/>
              </td>
              <td>
                <p eId="att_3__table_1__p_45">Cell.</p>
              </td>
              <td>
                <p eId="att_3__table_1__p_46"/>
              </td>
            <td><p/></td><td><p/></td><td><p/></td></tr>
          </table>
          <table eId="att_23__table_1">
            <tr>
              <th>
                <p eId="att_23__table_1__p_1">No.</p>
              </th>
              <th class="akn--text-center">
                <p eId="att_23__table_1__p_2">Security plan</p>
              </th>
              <th rowspan="1" colspan="2" class="akn--text-center">
                <p eId="att_23__table_1__p_3">Check box</p>
              </th>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_4">1.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_5">The floor plan of the proposed site or area.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_6">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_7">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_8">2.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_9">The access point (entry and exit).</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_10">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_11">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_12">3.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_13">The entry/ exit point to be manned at all times.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_14">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_15">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_16">4.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_17">Patrons to be searched at point of arrival and departure.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_18">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_19">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_20">5.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_21">Storage facilities for licensed firearms to be provided.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_22">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_23">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_24">6.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_25">The point of sale to be cordoned off (indicated on the floor plan submitted).</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_26">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_27">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_28">7.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_29">The restricted part for consumption of liquor to be cordoned off (to be indicated on the floor plan submitted).</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_30">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_31">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_32">8.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_33">Parking to be provided.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_34">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_35">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_23__table_1__p_36">9.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_37">Ablution facilities for males and females to be provided.</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_38">Yes</p>
              </td>
              <td>
                <p eId="att_23__table_1__p_39">No</p>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="akn--text-center">
                <p eId="att_23__table_1__p_40"/>
              </th>
              <th class="akn--text-center">
                <p eId="att_23__table_1__p_41"/>
              </th>
            <td><p/></td></tr>
          </table>
          <table eId="att_22__table_1">
            <tr>
              <th colspan="2" class="akn--text-center">
                <p eId="att_22__table_1__p_1">1. Details of licensed outlet or premises</p>
              </th>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_2">(a) Name of outlet:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_3">(b) Trade name/s (if any):</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_4">(c) Registration number:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_5">(d) Name of the metropolitan municipality/district municipality or local municipality where the licensed premises are situated:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_6">(e) Physical business address of applicant:</p>
              </td>
            </tr>
            <tr>
              <th colspan="2" class="akn--text-center">
                <p eId="att_22__table_1__p_7">2. Personal details of the applicant</p>
              </th>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_8">(a) Names and surname:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_9">(b) Designation of applicant:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_10">(c) Contact details:</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_11">Cell: __________________________ Tel: __________________________ Fax: __________________________ Email: _________________________________</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_12"><i><b>(Please attach certified copies of the documents requested in terms of regulation 25(3) to this form)</b></i></p>
                <p eId="att_22__table_1__p_13">1. During the past 12 months, has the applicant, or any person holding an interest in the applicant, become disqualified from holding this liquor licence, as contemplated in section 40 of the Act?</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_22__table_1__p_14">Yes</p>
              </td>
              <td>
                <p eId="att_22__table_1__p_15">No</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_16">2. If the answer to the above question is in the affirmative, please provide details of any decision taken by the relevant provincial licensing authority in terms of section 40 of the Act</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_17">3. Has the applicant or any of its owners, directors or subsidiaries been indicted or charged with any criminal offence, excluding traffic offences, during the past 12 months?</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_22__table_1__p_18">Yes</p>
              </td>
              <td>
                <p eId="att_22__table_1__p_19">No</p>
              </td>
            </tr>
            <tr>
              <td>
                <p eId="att_22__table_1__p_20"/>
              </td>
            <td><p/></td></tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_21">4. Has the applicant or any of its subsidiaries been a party to a law suit during the past 12 months?</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <p eId="att_22__table_1__p_22">If yes, provide details: __________________________</p>
              </td>
            </tr>
          </table>
        </content>
      </part>
    </body>
  </act>
</akomaNtoso>`);
  });
  it('should throw an error when there are overlapping spans', () => {
    const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta/>
    <body>
      <part eId="part_1">
        <num>1.</num>
        <heading>Heading</heading>
        <content>
          <table eId="att_13__table_1">
            <tr>
              <td colspan="5">
                <p eId="att_13__table_1__p_1"><b>Notice of intention to apply for a liquor licence for the undermentioned premises and proof of service </b></p>
                <p eId="att_13__table_1__p_2">Name of premises</p>
                <p eId="att_13__table_1__p_3">_____________________________________________________________</p>
              </td>
            </tr>
            <tr>
              <th>
                <p eId="att_13__table_1__p_9">Full name</p>
              </th>
              <th>
                <p eId="att_13__table_1__p_10">Surname</p>
              </th>
              <th>
                <p eId="att_13__table_1__p_11">I.D. Number</p>
              </th>
              <th>
                <p eId="att_13__table_1__p_12">Full address</p>
              </th>
              <th>
                <p eId="att_13__table_1__p_13">Signature</p>
              </th>
            </tr>
            <tr>
              <td rowspan="2">
                <p eId="att_13__table_1__p_29"/>
              </td>
              <td rowspan="2">
                <p eId="att_13__table_1__p_30"/>
              </td>
              <td rowspan="2">
                <p eId="att_13__table_1__p_31"/>
              </td>
              <td rowspan="3">
                <p eId="att_13__table_1__p_32"/>
              </td>
              <td rowspan="3">
                <p eId="att_13__table_1__p_33"/>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_13__table_1__p_34"/>
              </td>
            </tr>
            <tr>
              <td colspan="5">
                <p eId="att_13__table_1__p_35"/>
              </td>
            </tr>
          </table>
        </content>
      </part>
    </body>
  </act>
</akomaNtoso>`;
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    try {
      fixTables([doc.documentElement]);
    } catch (e) {
      expect(e).to.equal("Cannot parse overlapping spans in table with eId att_13__table_1");
    }
  });
});
