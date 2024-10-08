import { EidRewriter } from '../src/eids.js';
import { WorkComponentRewriter } from '../src/eids.js';
import { expect } from 'chai';

describe('eIdRewriter', () => {
  describe('#rewriteAllEids()', () => {
    it('should not change a document with correct eids', () => {
      const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <statement>
    <mainBody>
      <p eId="p_1"><i>The Conference of Parties,</i></p>
      <division eId="dvs_A">
        <num>A.</num>
        <heading>Cooperation with other conventions</heading>
        <intro>
          <p eId="dvs_A__intro__p_1"><i>Noting</i> the report of the Executive Secretary on progress,<sup><authorialNote marker="1" placement="bottom" eId="dvs_A__intro__p_1__authorialNote_1"><p eId="dvs_A__intro__p_1__authorialNote_1__p_1">UNEP/CBD/COP/12/24.</p></authorialNote></sup></p>
          <p eId="dvs_A__intro__p_2"><i>Recalling</i> decision XI/6, including paragraph 3, in which it urged Parties to pursue efforts to enhance synergies among the biodiversity-related conventions to promote policy coherence, improve efficiency and enhance coordination and cooperation at all levels, and with a view to strengthening Parties’ ownership of the process,</p>
        </intro>
        <paragraph eId="dvs_A__para_1">
          <num>"1.</num>
          <content>
            <p eId="dvs_A__para_1__p_1"><i>Welcomes</i> the International Plant Protection Convention as a member of the Liaison Group of the Biodiversity-related Conventions and <i>notes</i> with appreciation the role of the International Plant Protection Convention in helping to achieve Aichi Biodiversity Target 9;</p>
          </content>
        </paragraph>
        <paragraph eId="dvs_A__para_4">
          <num>4.</num>
          <content>
            <p eId="dvs_A__para_4__p_1"><i>Reaffirming</i> <ref href="/akn/un/statement/decision/unep-cbd-cop/2010-10-18/10-20" eId="dvs_A__para_4__p_1__ref_1">decision X/20</ref>, <i>invites</i> the members of the Liaison Group of the Biodiversity-related Conventions:</p>
            <blockList eId="dvs_A__para_4__list_1">
              <item eId="dvs_A__para_4__list_1__item_a">
                <num>(a)</num>
                <p eId="dvs_A__para_4__list_1__item_a__p_1">To increase their cooperation, coordination and attention to synergies in the development of their respective reporting systems, including future online reporting systems, as a means to increase synergies in national reporting under the biodiversity-related conventions;</p>
              </item>
              <item eId="dvs_A__para_4__list_1__item_b">
                <num>(b)</num>
                <p eId="dvs_A__para_4__list_1__item_b__p_1">To consider ways and means to increase cooperation on outreach and communication strategies;</p>
              </item>
            </blockList>
          </content>
        </paragraph>
        <wrapUp>
          <p eId="dvs_A__wrapup__p_1">First wrap-up paragraph;</p>
          <p eId="dvs_A__wrapup__p_2">Second wrap-up paragraph.</p>
        </wrapUp>
      </division>
      <division eId="dvs_B">
        <num>B.</num>
        <heading>Cooperation with international organizations and initiatives</heading>
        <intro>
          <p eId="dvs_B__intro__p_1"><i>Recognizing</i> the need for an all-encompassing effort by all relevant processes to achieve the Aichi Biodiversity Targets, taking into account different views and approaches to achieve the conservation and sustainable use of biodiversity and sustainable development,</p>
        </intro>
        <paragraph eId="dvs_B__para_13">
          <num>13.</num>
          <content>
            <p eId="dvs_B__para_13__p_1"><i>Reiterates</i> the importance of a United Nations system‑wide approach to the implementation of the Strategic Plan for Biodiversity 2011-2020 and the achievement of the Aichi Biodiversity Targets in the framework of the United Nations Decade for Biodiversity,<sup><authorialNote marker="3" placement="bottom" eId="dvs_B__para_13__p_1__authorialNote_1"><p eId="dvs_B__para_13__p_1__authorialNote_1__p_1">See General Assembly resolution 65/161.</p></authorialNote></sup> and <i>welcomes</i> the report of the Environment Management Group on relevant activities of the Issue Management Group on Biodiversity;<sup><authorialNote marker="4" placement="bottom" eId="dvs_B__para_13__p_1__authorialNote_2"><p eId="dvs_B__para_13__p_1__authorialNote_2__p_1">UNEP/CBD/COP/12/INF/48. See also: United Nations Environment Programme, Advancing the Biodiversity Agenda: A UN System-wide Contribution. A report by the Environment Management Group (EMG/1320/GEN) (UNEP, 2010). Available from <ref href="http://unemg.org" eId="dvs_B__para_13__p_1__authorialNote_2__p_1__ref_1">http://unemg.org</ref>;</p></authorialNote></sup></p>
          </content>
        </paragraph>
        <paragraph eId="dvs_B__para_14">
          <num>14.</num>
          <content>
            <p eId="dvs_B__para_14__p_1"><i>Invites</i> the United Nations and other organizations to continue their efforts in furthering the integration of the Aichi Biodiversity Targets throughout the United Nations system, in particular through the Environment Management Group and other relevant initiatives;</p>
          </content>
        </paragraph>
      </division>
    </mainBody>
  </statement>
</akomaNtoso>`;
      const doc = new DOMParser().parseFromString(xml, "text/xml");
      new EidRewriter().rewriteAllEids(doc.documentElement);
      expect(new XMLSerializer().serializeToString(doc)).to.equal(xml);
    });

    it('should not change a document with correct eids', () => {
      const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <statement name="statement">
    <preface>
      <p eId="preface__p_1">Here is a document:</p>
      <block name="quote" eId="preface__block_1">
        <embeddedStructure startQuote="“" eId="preface__block_1__embeddedStructure_1">
          <paragraph eId="preface__block_1__embeddedStructure_1__para_A">
            <num>A</num>
            <heading>Heading</heading>
            <subparagraph eId="preface__block_1__embeddedStructure_1__para_A__subpara_i">
              <num>i</num>
              <content>
                <p eId="preface__block_1__embeddedStructure_1__para_A__subpara_i__p_1">Content</p>
              </content>
            </subparagraph>
            <subparagraph eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii">
              <num>ii</num>
              <content>
                <p eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1">Content<authorialNote marker="x" placement="bottom" eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1"><p eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__p_1">Here's a footnote, and it Also includes a quote:</p><block name="quote" eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__block_1"><embeddedStructure startQuote="“" eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__block_1__embeddedStructure_1"><paragraph eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__block_1__embeddedStructure_1__para_A"><num>A</num><heading>Heading</heading><subparagraph eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__block_1__embeddedStructure_1__para_A__subpara_i"><num>i</num><content><p eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__block_1__embeddedStructure_1__para_A__subpara_i__p_1">Content</p></content></subparagraph><subparagraph eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__block_1__embeddedStructure_1__para_A__subpara_ii"><num>ii</num><content><p eId="preface__block_1__embeddedStructure_1__para_A__subpara_ii__p_1__authorialNote_1__block_1__embeddedStructure_1__para_A__subpara_ii__p_1">Content”.</p></content></subparagraph></paragraph></embeddedStructure></block></authorialNote>”.</p>
              </content>
            </subparagraph>
          </paragraph>
        </embeddedStructure>
      </block>
    </preface>
    <preamble>
      <p eId="preamble__p_1">
        <i>The Conference of the Parties</i>
      </p>
      <p eId="preamble__p_2">Preamble 1</p>
      <p eId="preamble__p_3">Preamble 2</p>
      <p eId="preamble__p_4">Preamble 3</p>
    </preamble>
    <mainBody>
      <table eId="table_1">
        <tr>
          <th>
            <p eId="table_1__p_1">Head 1</p>
          </th>
          <th>
            <p eId="table_1__p_2">Head 2</p>
          </th>
        </tr>
        <tr>
          <td>
            <p eId="table_1__p_3">Intro text:</p>
            <block name="quote" eId="table_1__block_1">
              <embeddedStructure eId="table_1__block_1__embeddedStructure_1">
                <p eId="table_1__block_1__embeddedStructure_1__p_1">Text of quote.</p>
              </embeddedStructure>
            </block>
          </td>
          <td>
            <block name="quote" eId="table_1__block_2">
              <embeddedStructure eId="table_1__block_2__embeddedStructure_1">
                <p eId="table_1__block_2__embeddedStructure_1__p_1">Text of quote.</p>
              </embeddedStructure>
            </block>
          </td>
        </tr>
      </table>
      <block name="quote" eId="block_1">
        <embeddedStructure eId="block_1__embeddedStructure_1">
          <p eId="block_1__embeddedStructure_1__p_1">Text of quote, introducing this table:</p>
          <table eId="block_1__embeddedStructure_1__table_1">
            <tr>
              <th>
                <p eId="block_1__embeddedStructure_1__table_1__p_1">Head</p>
              </th>
            </tr>
            <tr>
              <td>
                <p eId="block_1__embeddedStructure_1__table_1__p_2">Content</p>
              </td>
            </tr>
          </table>
        </embeddedStructure>
      </block>
      <division eId="dvs_1">
        <num>1</num>
        <heading>Strategy for implementing the programme of work on technology transfer and technological and scientific cooperation</heading>
        <paragraph eId="dvs_1__para_1">
          <num>1.</num>
          <intro>
            <p eId="dvs_1__para_1__intro__p_1"><i>Notes with appreciation</i> the work of the Ad Hoc Technical Expert Group on Technology Transfer and Scientific and Technological Cooperation, which met in Geneva, from 10 to 12 September 2007, as well as the cooperation of the United Nations Conference on Trade and Development and of the United Nations Environment Programme, and the financial support provided by the Government of Spain, for the organization of the meeting of the Expert Group;</p>
          </intro>
          <subdivision eId="dvs_1__para_1__subdvs_A">
            <num>A.</num>
            <heading>Subdiv</heading>
            <paragraph eId="dvs_1__para_1__subdvs_A__para_1-1">
              <num>1.1</num>
              <heading>Heading</heading>
              <intro>
                <p eId="dvs_1__para_1__subdvs_A__para_1-1__intro__p_1">Content:</p>
              </intro>
              <subparagraph eId="dvs_1__para_1__subdvs_A__para_1-1__subpara_a">
                <num>a</num>
                <content>
                  <p eId="dvs_1__para_1__subdvs_A__para_1-1__subpara_a__p_1">Content</p>
                </content>
              </subparagraph>
              <subparagraph eId="dvs_1__para_1__subdvs_A__para_1-1__subpara_b">
                <num>b</num>
                <content>
                  <p eId="dvs_1__para_1__subdvs_A__para_1-1__subpara_b__p_1">Content</p>
                </content>
              </subparagraph>
              <wrapUp>
                <p eId="dvs_1__para_1__subdvs_A__para_1-1__wrapup__p_1">Wrap</p>
              </wrapUp>
            </paragraph>
            <paragraph eId="dvs_1__para_1__subdvs_A__para_1-2">
              <num>1.2</num>
              <subparagraph eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a">
                <num>a</num>
                <subparagraph eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_i">
                  <num>i</num>
                  <content>
                    <p eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_i__p_1">Content</p>
                  </content>
                </subparagraph>
                <subparagraph eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii">
                  <num>ii</num>
                  <list eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii__list_nn_1">
                    <point eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii__list_nn_1__point_1">
                      <num>1</num>
                      <content>
                        <p eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii__list_nn_1__point_1__p_1">Content</p>
                      </content>
                    </point>
                    <point eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii__list_nn_1__point_2">
                      <num>2</num>
                      <content>
                        <p eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii__list_nn_1__point_2__p_1">Content</p>
                      </content>
                    </point>
                    <wrapUp>
                      <p eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii__list_nn_1__wrapup__p_1">Wrap</p>
                    </wrapUp>
                  </list>
                  <wrapUp>
                    <p eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__subpara_ii__wrapup__p_1">Rando text in subpara ii</p>
                  </wrapUp>
                </subparagraph>
                <wrapUp>
                  <p eId="dvs_1__para_1__subdvs_A__para_1-2__subpara_a__wrapup__p_1">Rando text in subpara a</p>
                </wrapUp>
              </subparagraph>
              <wrapUp>
                <p eId="dvs_1__para_1__subdvs_A__para_1-2__wrapup__p_1">Rando text in para 1.2</p>
              </wrapUp>
            </paragraph>
            <wrapUp>
              <p eId="dvs_1__para_1__subdvs_A__wrapup__p_1">Rando text in Subdiv A</p>
            </wrapUp>
          </subdivision>
          <wrapUp>
            <p eId="dvs_1__para_1__wrapup__p_1">Rando text in para 1</p>
          </wrapUp>
        </paragraph>
        <wrapUp>
          <p eId="dvs_1__wrapup__p_1">Rando text in Div 1</p>
        </wrapUp>
      </division>
      <p eId="p_1">Rando standalone text.</p>
      <paragraph eId="para_2">
        <num>2.</num>
        <content>
          <p eId="para_2__p_1"><i>Takes note of</i> the strategy for the practical implementation of the programme of work on technology transfer and scientific and technological cooperation developed by the Expert Group as annexed to the present decision, as a preliminary basis for concrete activities by Parties and international organizations;</p>
        </content>
      </paragraph>
      <paragraph eId="para_3">
        <num>3.</num>
        <content>
          <p eId="para_3__p_1"><i>Reiterates</i> the need for immediate implementation of the programme of work on technology transfer and scientific and technological cooperation;</p>
        </content>
      </paragraph>
      <paragraph eId="para_4">
        <num>4.</num>
        <content>
          <p eId="para_4__p_1"><i>Requests</i> the Executive Secretary to compile and analyse, in cooperation with relevant organizations and initiatives, information and good practices on the process of identifying modes of cooperation on science, technology and innovation, technologies, technology needs assessments and existing technology transfer agreements, and to make this information available through the clearing-house mechanism of the Convention;</p>
        </content>
      </paragraph>
      <division eId="dvs_nn_1">
        <heading>Biodiversity Technology Initiative</heading>
        <intro>
          <p eId="dvs_nn_1__intro__p_1">Intro text</p>
        </intro>
        <paragraph eId="dvs_nn_1__para_5">
          <num>5.</num>
          <content>
            <p eId="dvs_nn_1__para_5__p_1"><i>Takes note</i> of the exploration contained in the note by the Executive Secretary of possibilities of developing a Biodiversity Technology Initiative (BTI), taking into account the Climate Technology Initiative (CTI) (UNEP/CBD/COP/9/18/Add.1), bearing in mind that the Biodiversity Technology Initiative would facilitate enhanced interaction with Parties with identified capacity/technology building needs and international organizations, Parties, or other relevant organizations, which could assist in capacity‑building and technology transfer;</p>
          </content>
        </paragraph>
        <hcontainer name="hcontainer" eId="dvs_nn_1__hcontainer_1">
          <content>
            <p eId="dvs_nn_1__hcontainer_1__p_1">Rando text between paragraphs</p>
          </content>
        </hcontainer>
        <paragraph eId="dvs_nn_1__para_6">
          <num>6.</num>
          <content>
            <p eId="dvs_nn_1__para_6__p_1"><i>Requests</i> the Executive Secretary, in cooperation with relevant partner organizations, to:</p>
            <blockList eId="dvs_nn_1__para_6__list_1">
              <item eId="dvs_nn_1__para_6__list_1__item_a">
                <num>(a)</num>
                <p eId="dvs_nn_1__para_6__list_1__item_a__p_1">Identify options for activities to be included in a prospective Biodiversity Technology Initiative as well as for the structure, functioning and governance of a Biodiversity Technology Initiative;</p>
              </item>
              <item eId="dvs_nn_1__para_6__list_1__item_b">
                <num>(b)</num>
                <p eId="dvs_nn_1__para_6__list_1__item_b__p_1">Complete, as necessary, the list of criteria for selecting the host institution of the Biodiversity Technology Initiative, bearing in mind the possibility of the Initiative being hosted by the Secretariat of the Convention;</p>
              </item>
            </blockList>
            <p eId="dvs_nn_1__para_6__p_2">and to submit the options and the list of criteria to the Ad Hoc Open-ended Working Group on Review of Implementation of the Convention at its third meeting for its consideration;</p>
          </content>
        </paragraph>
        <hcontainer name="hcontainer" eId="dvs_nn_1__hcontainer_2">
          <content>
            <p eId="dvs_nn_1__hcontainer_2__p_1">Rando text between paragraphs</p>
          </content>
        </hcontainer>
        <paragraph eId="dvs_nn_1__para_7">
          <num>7.</num>
          <content>
            <p eId="dvs_nn_1__para_7__p_1"><i>Requests</i> the Ad Hoc Open-ended Working Group on Review of Implementation of the Convention at its third meeting to review the options and the list of criteria referred to above with a view to finalize them for consideration by the Conference of the Parties at its tenth meeting;</p>
          </content>
        </paragraph>
        <wrapUp>
          <p eId="dvs_nn_1__wrapup__p_1">Rando text after paragraphs</p>
        </wrapUp>
      </division>
      <division eId="dvs_nn_2">
        <heading>Technical study on the role of intellectual property rights in technology transfer in the context of the Convention</heading>
        <intro>
          <p eId="dvs_nn_2__intro__p_1">Intro</p>
        </intro>
        <paragraph eId="dvs_nn_2__para_8">
          <num>8.</num>
          <content>
            <p eId="dvs_nn_2__para_8__p_1"><i>Takes note</i> of the technical study on the role of intellectual property rights in technology transfer in the context of the Convention (UNEP/CBD/COP/9/INF/7);</p>
          </content>
        </paragraph>
        <paragraph eId="dvs_nn_2__para_9">
          <num>9.</num>
          <content>
            <p eId="dvs_nn_2__para_9__p_1"><i>Requests</i> the Executive Secretary to explore options for fast-tracking to allow for quicker financing and access by developing countries to relevant technologies in the public domain, the transfer and application of which does not involve intellectual property rights issues; </p>
          </content>
        </paragraph>
        <paragraph eId="dvs_nn_2__para_10">
          <num>10.</num>
          <content>
            <p eId="dvs_nn_2__para_10__p_1"><i>Notes with appreciation</i> the cooperation of the United Nations Conference on Trade and Development and the World Intellectual Property Organization in the preparation of the study referred to in para 8 above;</p>
          </content>
        </paragraph>
        <paragraph eId="dvs_nn_2__para_11">
          <num>11.</num>
          <content>
            <p eId="dvs_nn_2__para_11__p_1"><i>Recalling</i> Article 16 paragraphs 2, 3 and 5 of the Convention, <i>invites</i> relevant international organizations and initiatives, research institutions at all levels, and non-governmental organizations, to undertake further research on the role of intellectual property rights in technology transfer in the context of the Convention, such as:</p>
            <blockList eId="dvs_nn_2__para_11__list_1">
              <item eId="dvs_nn_2__para_11__list_1__item_a">
                <num>(a)</num>
                <p eId="dvs_nn_2__para_11__list_1__item_a__p_1">More in-depth analysis of new open-source-based modes of innovation, as well as other additional options to intellectual property rights;</p>
              </item>
              <item eId="dvs_nn_2__para_11__list_1__item_b">
                <num>(b)</num>
                <p eId="dvs_nn_2__para_11__list_1__item_b__p_1">More empirical studies on the extent of use of patent data information in research and development in different sectors;</p>
              </item>
              <item eId="dvs_nn_2__para_11__list_1__item_c">
                <num>(c)</num>
                <p eId="dvs_nn_2__para_11__list_1__item_c__p_1">Further empirical analysis on the scope and extent of patent clustering on technologies and other associated biological materials that are necessary inputs to desired technology development processes and on how prospective technology users in developing countries cope with patent clustering;</p>
              </item>
              <item eId="dvs_nn_2__para_11__list_1__item_d">
                <num>(d)</num>
                <p eId="dvs_nn_2__para_11__list_1__item_d__p_1">Further examination by relevant international organizations of the overall trends in the application of the flexibilities provided by the Agreement on Trade-related Aspects of Intellectual Property Rights (TRIPs);</p>
              </item>
            </blockList>
          </content>
        </paragraph>
        <wrapUp>
          <p eId="dvs_nn_2__wrapup__p_1">Wrap-up</p>
        </wrapUp>
      </division>
      <division eId="dvs_nn_3">
        <heading>Information systems</heading>
        <paragraph eId="dvs_nn_3__para_12">
          <num>12.</num>
          <content>
            <p eId="dvs_nn_3__para_12__p_1"><i>Takes note</i> of the progress made in enhancing the clearing-house mechanism as a key mechanism in technology transfer and technological and scientific cooperation, including provision of information on patent registry systems, and <i>requests</i> the Executive Secretary to continue the work, including by preparing offline tools for information dissemination, such as brochures and CD-Roms;</p>
          </content>
        </paragraph>
      </division>
      <division eId="dvs_nn_4">
        <heading>Cooperation</heading>
        <paragraph eId="dvs_nn_4__para_13">
          <num>13.</num>
          <content>
            <p eId="dvs_nn_4__para_13__p_1"><i>Encourages</i> Parties to engage in South-South technology transfer and cooperation on science, technology and innovation, as well as explore alternative models for triangular, regional or multilateral cooperation, as complementary mechanisms to North-South activities;</p>
          </content>
        </paragraph>
        <paragraph eId="dvs_nn_4__para_14">
          <num>14.</num>
          <content>
            <p eId="dvs_nn_4__para_14__p_1"><i>Underlining</i> the importance of establishing or strengthening cooperation with relevant processes in other conventions and international organizations, with a view to ensure consistency and mutual supportiveness, maximize possible synergy, and avoid duplication of work, <i>requests</i> the Executive Secretary to:</p>
            <blockList eId="dvs_nn_4__para_14__list_1">
              <item eId="dvs_nn_4__para_14__list_1__item_a">
                <num>(a)</num>
                <p eId="dvs_nn_4__para_14__list_1__item_a__p_1">Facilitate national, regional and international information exchange through to the clearing-house mechanism, including, as appropriate, through interoperability mechanisms;</p>
              </item>
              <item eId="dvs_nn_4__para_14__list_1__item_b">
                <num>(b)</num>
                <p eId="dvs_nn_4__para_14__list_1__item_b__p_1">Continue to exchange information on activities with other relevant expert bodies, such as the Expert Group on Technology Transfer under the United Nations Framework Convention on Climate Change, as well as through the joint liaison groups of the three Rio conventions and the biodiversity‑related conventions;</p>
              </item>
              <item eId="dvs_nn_4__para_14__list_1__item_c">
                <num>(c)</num>
                <p eId="dvs_nn_4__para_14__list_1__item_c__p_1">Explore options for joint workshops with other conventions on, for instance, technologies of joint interest and relevance;</p>
              </item>
              <item eId="dvs_nn_4__para_14__list_1__item_d">
                <num>(d)</num>
                <p eId="dvs_nn_4__para_14__list_1__item_d__p_1">Cooperate with the United Nations Environment Programme (UNEP) and the Bali Strategic Plan for Technology Support and Capacity-Building with a view to identify why possible collaborative activities and options for synergies;</p>
              </item>
            </blockList>
          </content>
        </paragraph>
      </division>
      <division eId="dvs_nn_5">
        <heading>Funding mechanisms</heading>
        <paragraph eId="dvs_nn_5__para_15">
          <num>15.</num>
          <content>
            <p eId="dvs_nn_5__para_15__p_1"><i>Decides</i> that the strategy for resource mobilization shall fully reflect the needs of developing country Parties for access to and transfer of technology and their innovation needs, and related scientific and institutional capacity-building needs, for effective implementation of the Convention;</p>
          </content>
        </paragraph>
        <paragraph eId="dvs_nn_5__para_16">
          <num>16.</num>
          <content>
            <p eId="dvs_nn_5__para_16__p_1"><i>Urges</i> Parties and other Governments to honour their commitments related to finance and technology transfer under Agenda 21, and reiterated at the World Summit, by intensifying their contribution to technology transfer and cooperation on science, technology and innovation, and <i>urges</i> Parties to fully implement their obligations under Articles 16 to 19 of the Convention;</p>
          </content>
        </paragraph>
        <paragraph eId="dvs_nn_5__para_17">
          <num>17.</num>
          <content>
            <p eId="dvs_nn_5__para_17__p_1"><i>Requests</i> the Global Environment Facility to:</p>
            <blockList eId="dvs_nn_5__para_17__list_1">
              <item eId="dvs_nn_5__para_17__list_1__item_a">
                <num>(a)</num>
                <p eId="dvs_nn_5__para_17__list_1__item_a__p_1">Provide support to developing country Parties in the preparation of national assessments of technology needs for implementation of the Convention;</p>
              </item>
              <item eId="dvs_nn_5__para_17__list_1__item_b">
                <num>(b)</num>
                <p eId="dvs_nn_5__para_17__list_1__item_b__p_1">Continue to support ongoing national programmes for the conservation and sustainable use of biodiversity through improved access to and transfer of technology and innovation;</p>
              </item>
              <item eId="dvs_nn_5__para_17__list_1__item_c">
                <num>(c)</num>
                <p eId="dvs_nn_5__para_17__list_1__item_c__p_1">Consider possibilities to provide funding under enabling activities for the provision of capacity-building, where needed, on, <i>inter alia</i>:</p>
                <blockList eId="dvs_nn_5__para_17__list_1__item_c__list_1">
                  <item eId="dvs_nn_5__para_17__list_1__item_c__list_1__item_i">
                    <num>(i)</num>
                    <p eId="dvs_nn_5__para_17__list_1__item_c__list_1__item_i__p_1">Technologies for conservation and sustainable use;</p>
                  </item>
                  <item eId="dvs_nn_5__para_17__list_1__item_c__list_1__item_ii">
                    <num>(ii)</num>
                    <p eId="dvs_nn_5__para_17__list_1__item_c__list_1__item_ii__p_1">Governance and regulatory frameworks associated with access and transfer of technology and innovation.</p>
                  </item>
                </blockList>
              </item>
            </blockList>
          </content>
        </paragraph>
      </division>
    </mainBody>
    <attachments>
      <attachment eId="att_1">
        <heading>Annex</heading>
        <subheading>Strategy for the practical implementation of the programme of work on technology transfer and scientific and technological cooperation</subheading>
        <doc contains="originalVersion" name="annexure">
          <meta>
            <identification source="#cobalt">
              <FRBRWork>
                <FRBRthis value="/akn/za/act/2009/10/!annexure_1"/>
                <FRBRuri value="/akn/za/act/2009/10"/>
                <FRBRalias value="Untitled" name="title"/>
                <FRBRdate date="2009" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za"/>
                <FRBRnumber value="10"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za/act/2009/10/eng/!annexure_1"/>
                <FRBRuri value="/akn/za/act/2009/10/eng"/>
                <FRBRdate date="2020-11-17" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za/act/2009/10/eng/!annexure_1"/>
                <FRBRuri value="/akn/za/act/2009/10/eng"/>
                <FRBRdate date="2020-11-17" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
            <references source="#cobalt">
              <TLCOrganization eId="cobalt" href="https://github.com/laws-africa/cobalt" showAs="cobalt"/>
            </references>
          </meta>
          <mainBody>
            <division eId="att_1__dvs_I">
              <num>I.</num>
              <heading>Objectives and background</heading>
              <paragraph eId="att_1__dvs_I__para_1">
                <num>1.</num>
                <content>
                  <p eId="att_1__dvs_I__para_1__p_1">The strategy for practical implementation of the programme of work has been developed to assist and facilitate efforts to further implement Articles 16 to 19 of the Convention on Biological Diversity. The Strategy explores a number of voluntary ways and means that are aimed at creating a coherent and sustainable approach to technology transfer and scientific and technological cooperation, in accordance with the provisions of the Convention, and relevant international and domestic obligations.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_I__para_2">
                <num>2.</num>
                <content>
                  <p eId="att_1__dvs_I__para_2__p_1">The present framework identifies strategic activities for the practical implementation of the programme of work on technology transfer and scientific and technological cooperation. The programme of work was adopted by the Conference of the Parties at its seventh meeting held in Kuala Lumpur in February 2004, in order to develop meaningful and effective action to enhance the implementation of Articles 16 to 19 as well as related provisions of the Convention, by promoting and facilitating the transfer of and access to technologies from developed to developing countries as well as among developing countries and other Parties. According to Article 16 paragraph 1, of the Convention, relevant technologies under the Convention are those that contribute to meeting the three objectives of the Convention, that is, technologies that are relevant to the conservation and sustainable use of biodiversity or make use of genetic resources and do not cause significant damage to the environment.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_I__para_3">
                <num>3.</num>
                <content>
                  <p eId="att_1__dvs_I__para_3__p_1">Biodiversity is under massive and increasing pressure as a result of global changes such as population growth, poverty alleviation, reduction of available arable land and water, environmental stress, climate change, and the need for renewable resources, and this requires that the full range of technologies, ranging from traditional to modern technologies, is made widely available in order to address the challenges associated with the implementation of the three objectives of the Convention. Much scientific and technological cooperation, including the transfer of technologies, is already being undertaken, in particular on a smaller scale. The present strategy aims to increase the visibility of such cooperation, and to enhance the efficiency and effectiveness of technology transfer and scientific and technological cooperation under the Convention.</p>
                </content>
              </paragraph>
            </division>
            <division eId="att_1__dvs_II">
              <num>II.</num>
              <heading>Conceptualizing and defining technology transfer and scientific and technological cooperation</heading>
              <paragraph eId="att_1__dvs_II__para_4">
                <num>4.</num>
                <content>
                  <p eId="att_1__dvs_II__para_4__p_1">It is important to recognize the crucial <b>links between technology transfer and scientific and technological cooperation</b> – the two elements addressed by the programme of work. Technology transfer, in particular in the context of the third objective of the Convention, will not be effective as an on-off and one-way activity, but needs to be <b>embedded in a participatory decision-making process</b> as well as in <b>integrated, long-term scientific and technological cooperation,</b> which may involve the joint development of new technologies and, as based on reciprocity, would also provide a key mechanism for the effective building or enhancement of capacity in developing countries and countries with economies in transition.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_II__para_5">
                <num>5.</num>
                <content>
                  <p eId="att_1__dvs_II__para_5__p_1">The concrete process leading to technology transfer, as well as the cooperative mechanisms applied, will necessarily differ in accordance with the largely varying socio-economic and cultural conditions among countries, as well as the type of technologies transferred. Hence, this process needs to be <b>flexible, participatory, and demand-driven,</b> moving along different cells of matrices of potential types of technologies and cooperative mechanisms.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_II__para_6">
                <num>6.</num>
                <content>
                  <p eId="att_1__dvs_II__para_6__p_1">The concept of technology as generally understood under the Convention includes both <b>“hard” and “soft” technology</b>. The notion of hard technology refers to the actual machinery and other physical hardware that is transferred, while the category of soft technology refers to technological information or know-how. Such “soft” technology is often transferred within long-term scientific and technological cooperation including though joint research and innovation which move ideas from invention to new products, processes and services.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_II__para_7">
                <num>7.</num>
                <content>
                  <p eId="att_1__dvs_II__para_7__p_1">Consistent with the programme of work, <b>local solutions to local issues</b> should be identified and their transfer and use facilitated, as the most innovative solutions are often developed locally, but remain unknown to the a wider community of potential users even though they could be transferred comparatively easily.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_II__para_8">
                <num>8.</num>
                <content>
                  <p eId="att_1__dvs_II__para_8__p_1">Strategic activities can be distinguished according to whether they focus on fostering the <i>provision</i> of technologies or on the <i>reception, adaptation and diffusion</i> of technologies. While many countries may be mainly providing or mainly receiving technologies, it has to be borne in mind that individual countries may sometimes simultaneously provide and receive technologies from abroad. The programme of work recognizes that <b>enabling environments are necessary in both developed and developing countries</b> as a tool to promote and facilitate the successful and sustainable transfer of technologies for the purpose of the Convention on Biological Diversity. Consequently, the strategic elements identified below cover measures to be taken both on the providing as well as on the receiving end.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_II__para_9">
                <num>9.</num>
                <content>
                  <p eId="att_1__dvs_II__para_9__p_1">Development of a strategy for implementing the programme of work on technology transfer and scientific and technological cooperation suggests applying a rational, structured approach. However, the reality of effective technology transfer is to take advantage of opportunities as they arise, implying that the <b>implementation of the strategy should not delay the immediate transfer of relevant technologies</b> in those cases where technology needs and opportunities are identified and the institutional, administrative, policy and legal environment does not prevent their successful transfer and adaptation.</p>
                </content>
              </paragraph>
            </division>
            <division eId="att_1__dvs_III">
              <num>III.</num>
              <heading>Enabling environment on the receiving end</heading>
              <paragraph eId="att_1__dvs_III__para_10">
                <num>10.</num>
                <content>
                  <p eId="att_1__dvs_III__para_10__p_1">Based on knowledge of the range of available technologies, <b>assess priority technology needs through consultative multi-stakeholder processes</b> on the local, national or regional level, possibly in collaboration with regional or international organizations.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_III__para_11">
                <num>11.</num>
                <content>
                  <p eId="att_1__dvs_III__para_11__p_1">Design and implement <b>policies and regulations</b> of relevance to the transfer and application of technology that are <b>consistent, clear to all relevant actors, and conducive</b> to the transfer of technology.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_III__para_12">
                <num>12.</num>
                <content>
                  <p eId="att_1__dvs_III__para_12__p_1">Design and implement an <b>institutional and administrative framework and governance system</b> which is <b>conducive to technology transfer</b> by ensuring, <i>inter alia,</i> through effective <b>internal coordination</b>, that administrative processes do not put an onerous administrative burden on prospective technology users and providers.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_III__para_13">
                <num>13.</num>
                <content>
                  <p eId="att_1__dvs_III__para_13__p_1">Consider the designation of appropriate existing institutions that could act, in close cooperation with National Focal Points to the Convention and to its clearing-house mechanism, as a <b>central consulting point on technology access and transfer</b> for other national or international actors to turn to. This function could also be assumed, as appropriate, by the national focal points to the clearing house mechanism.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_III__para_14">
                <num>14.</num>
                <content>
                  <p eId="att_1__dvs_III__para_14__p_1">Consider the use of <b>incentives</b> to encourage foreign actors to provide access to and transfer of technology to domestic public or private institutions.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_III__para_15">
                <num>15.</num>
                <content>
                  <p eId="att_1__dvs_III__para_15__p_1">Generate an <b>environment conducive to the application of a participatory approach</b>, including by establishing mechanisms for effective public information and public participation.</p>
                </content>
              </paragraph>
            </division>
            <division eId="att_1__dvs_IV">
              <num>IV.</num>
              <heading>Enabling environment on the providing end</heading>
              <paragraph eId="att_1__dvs_IV__para_16">
                <num>16.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_16__p_1">Provide, through multiple channels, <b>information on available technologies</b>, including on projected costs, risks, benefits, constraints; necessary infrastructure, personnel, capacity; sustainability, etc., in particular those which are available on a short-term basis (see also section V below).</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_17">
                <num>17.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_17__p_1"><b>Pre-assess the adaptability of prospective technologies</b> to be transferred.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_18">
                <num>18.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_18__p_1"><b>Be aware, foster understanding of, and comply with relevant regulations</b> of recipient countries – build trust.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_19">
                <num>19.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_19__p_1"><b>Recognize, and act on, any capacity-building needs</b> of recipients and ensure sustainability of the transferred technology.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_20">
                <num>20.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_20__p_1">Consider the designation of appropriate existing institutions that could act, in close cooperation with National Focal Points to the Convention and to its clearing-house mechanism, as a <b>central consulting point on technology access and transfer</b> for other national or international actors to turn to, and which could also monitor and follow-up on the activities enumerated in this strategy. These functions could also be assumed, as appropriate, by the National Focal Points to the clearing-house mechanism.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_21">
                <num>21.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_21__p_1">Establish or strengthen programmes that <b>enhance access to capital markets</b>, in particular for small and medium enterprises in recipient countries, for instance through the establishment of small-scale loan facilities that provide seed capital, the bundling of projects, or the provision of collateral and/or performance guarantees.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_22">
                <num>22.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_22__p_1">Bearing in mind the important role of the private sector in technology transfer, consider the use of measures and mechanisms that <b>provide incentives</b> to the private sector to enhance the transfer of pertinent technology, in accordance with international law, for instance:</p>
                  <blockList eId="att_1__dvs_IV__para_22__list_1">
                    <item eId="att_1__dvs_IV__para_22__list_1__item_a">
                      <num>(a)</num>
                      <p eId="att_1__dvs_IV__para_22__list_1__item_a__p_1">The use or adaptation of existing provisions in domestic tax systems on <b>tax breaks or deferrals for charitable activities</b>, with a view to provide adequate incentives for private companies to engage in the transfer of relevant technologies and related capacity-building activities;</p>
                    </item>
                    <item eId="att_1__dvs_IV__para_22__list_1__item_b">
                      <num>(b)</num>
                      <p eId="att_1__dvs_IV__para_22__list_1__item_b__p_1">The adaptation of existing guidelines for eligibility to <b>research-oriented tax breaks or deferrals</b> with a view to generate incentives for private‑sector actors that engage in research making use of genetic resources, to implement adequate mechanisms for the promotion and advancement of priority access to the results and benefits arising from the biotechnologies that result from such research, in accordance with Article 19, paragraph 2, of the Convention;</p>
                    </item>
                    <item eId="att_1__dvs_IV__para_22__list_1__item_c">
                      <num>(c)</num>
                      <p eId="att_1__dvs_IV__para_22__list_1__item_c__p_1">The application of <b>subsidized export credits or loan guarantees</b> that act as insurance against risks in international transactions with a view to provide incentives to private sector actors to engage in technology transfer for the purpose of the Convention.</p>
                    </item>
                  </blockList>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_23">
                <num>23.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_23__p_1">Review the <b>principles and guidelines that govern the funding of public research institutions</b> and develop them further with a view to provide adequate incentives to follow the pertinent provisions and guidance of the Convention on technology transfer. In particular, the guidelines could foresee the implementation of adequate mechanisms for the promotion and advancement of priority access to the results and benefits arising from the biotechnologies that result from such research, in accordance with Article 19 (2) of the Convention.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_IV__para_24">
                <num>24.</num>
                <content>
                  <p eId="att_1__dvs_IV__para_24__p_1">Incite relevant institutions to <b>provide funds</b> (see also section VII below).</p>
                </content>
              </paragraph>
            </division>
            <division eId="att_1__dvs_V">
              <num>V.</num>
              <heading>Facilitating mechanisms</heading>
              <paragraph eId="att_1__dvs_V__para_25">
                <num>25.</num>
                <content>
                  <p eId="att_1__dvs_V__para_25__p_1">Generate and disseminate <b>information on available relevant technologies,</b> including small-scale technologies that were developed locally, by, <i>inter alia</i>:</p>
                  <blockList eId="att_1__dvs_V__para_25__list_1">
                    <item eId="att_1__dvs_V__para_25__list_1__item_a">
                      <num>(a)</num>
                      <p eId="att_1__dvs_V__para_25__list_1__item_a__p_1">Establishing or strengthening relevant <b>databases;</b></p>
                    </item>
                    <item eId="att_1__dvs_V__para_25__list_1__item_b">
                      <num>(b)</num>
                      <p eId="att_1__dvs_V__para_25__list_1__item_b__p_1"><b>Strengthening the clearing-house mechanism</b> of the Convention as a central gateway for technology transfer and scientific and technological cooperation, in accordance with element 2 of the programme of work, by <b>linking relevant databases</b> to the clearing-house mechanism, <b>establishing interoperability</b> as appropriate, and by the more active use of the clearing-house mechanism as a <b>communication platform;</b></p>
                    </item>
                    <item eId="att_1__dvs_V__para_25__list_1__item_c">
                      <num>(c)</num>
                      <p eId="att_1__dvs_V__para_25__list_1__item_c__p_1">Using <b>offline tools for information dissemination,</b> such as print material as well as CD‑Roms;</p>
                    </item>
                    <item eId="att_1__dvs_V__para_25__list_1__item_d">
                      <num>(d)</num>
                      <p eId="att_1__dvs_V__para_25__list_1__item_d__p_1">Convening <b>technology fairs</b> and <b>workshops.</b></p>
                    </item>
                  </blockList>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_V__para_26">
                <num>26.</num>
                <content>
                  <p eId="att_1__dvs_V__para_26__p_1">Encourage the work of <b>intermediate institutions</b> and <b>networks</b> with pertinent experience in different areas, such as CGIAR, which can assist in the establishment of partnerships by, <i>inter alia</i>: translating priority needs of countries into clearly formulated requests for technology transfer, facilitating fact-based negotiations of transfer agreements, and facilitating access to financing facilities.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_V__para_27">
                <num>27.</num>
                <content>
                  <p eId="att_1__dvs_V__para_27__p_1">Compile and analyse, in cooperation with relevant organizations and initiatives and with assistance by the expert group on technology transfer, existing <b>technology transfer agreements</b> or <b>technology transfer provisions/clauses</b> in other agreements, including regional or bilateral trade agreements, such as for instance contractual agreements relating to access to genetic resources and associated traditional knowledge and the fair and equitable sharing of benefits arising out of their utilization. This compilation and analysis could also include existing templates for standard technology transfer agreements/provisions/clauses, and could be used to develop <b>international guidance</b> that could act as reference for good/best practice on the application of technology transfer agreements/provisions/clauses.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_V__para_28">
                <num>28.</num>
                <content>
                  <p eId="att_1__dvs_V__para_28__p_1">Encourage the development of <b>cooperative partnershipsand/or networks</b> involving governmental agencies, public and private research institutions, the private sector, non-governmental organizations, indigenous and local communities and national and local stakeholders, including south‑south cooperation and alternative models for triangular, regional or multilateral cooperation, through, among others:</p>
                  <blockList eId="att_1__dvs_V__para_28__list_1">
                    <item eId="att_1__dvs_V__para_28__list_1__item_a">
                      <num>(a)</num>
                      <p eId="att_1__dvs_V__para_28__list_1__item_a__p_1">Support the establishment of <b>research consortia</b> among research institutions in developing countries, including through for instance the establishment and work of patent pools or intellectual property commercialization agents;</p>
                    </item>
                    <item eId="att_1__dvs_V__para_28__list_1__item_b">
                      <num>(b)</num>
                      <p eId="att_1__dvs_V__para_28__list_1__item_b__p_1">Foster scientific and technological cooperation between universities and other research institutions of developed and developing countries, including the establishment of academic exchange programmes in particular at postgraduate and postdoctoral levels as well as other programmes which enhance the mobility of researchers, the establishment of doctorate programmes in developing countries, and the access to, and building of, research and innovation infrastructure, through for instance the establishment and financing of <b>twinning arrangements;</b></p>
                    </item>
                    <item eId="att_1__dvs_V__para_28__list_1__item_c">
                      <num>(c)</num>
                      <p eId="att_1__dvs_V__para_28__list_1__item_c__p_1">Promote the interaction between universities and other institutions of education and training as well as of research and development on the one side and the private sector on the other side, through <b>alliances, joint ventures</b> or <b>public-private partnerships;</b></p>
                    </item>
                    <item eId="att_1__dvs_V__para_28__list_1__item_d">
                      <num>(d)</num>
                      <p eId="att_1__dvs_V__para_28__list_1__item_d__p_1">Support the set-up of long-term technological cooperation between private firms in developed and developing countries, including the co-financing of local businesses with little or no access to long-term investment capital, through for instance the establishment and strengthening of so-called <b>matchmaking programmes;</b></p>
                    </item>
                  </blockList>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_V__para_29">
                <num>29.</num>
                <content>
                  <p eId="att_1__dvs_V__para_29__p_1">Establish or strengthen <b>cooperation with relevant processes</b> in other conventions and international organizations, with a view to ensure consistency and mutual supportiveness, maximize possible synergy, and avoid duplication of work, by:</p>
                  <blockList eId="att_1__dvs_V__para_29__list_1">
                    <item eId="att_1__dvs_V__para_29__list_1__item_i">
                      <num>(i)</num>
                      <p eId="att_1__dvs_V__para_29__list_1__item_i__p_1"><b>Linking relevant existing systems</b> of national, regional and international information exchange to the clearing-house mechanism, including, as appropriate, through interoperability mechanisms;</p>
                    </item>
                    <item eId="att_1__dvs_V__para_29__list_1__item_ii">
                      <num>(ii)</num>
                      <p eId="att_1__dvs_V__para_29__list_1__item_ii__p_1">Continuing to <b>exchange information</b> on activities with other relevant expert bodies, such as the Expert Group on Technology Transfer under the United Nations Framework Convention on Climate Change, as well as through the joint liaison groups of the three Rio conventions and the biodiversity-related conventions;</p>
                    </item>
                    <item eId="att_1__dvs_V__para_29__list_1__item_iii">
                      <num>(iii)</num>
                      <p eId="att_1__dvs_V__para_29__list_1__item_iii__p_1">Exploring options for <b>joint workshops</b> with other conventions, for instance on technologies of joint interest and relevance;</p>
                    </item>
                    <item eId="att_1__dvs_V__para_29__list_1__item_iv">
                      <num>(iv)</num>
                      <p eId="att_1__dvs_V__para_29__list_1__item_iv__p_1">Cooperating with the United Nations Environment Programme (UNEP) to explore the nature and scope of the <b>Bali Strategic Plan for Technology Support and Capacity‑Building</b> with a view to identify possible collaborative activities and options to synergize.</p>
                    </item>
                  </blockList>
                </content>
              </paragraph>
            </division>
            <division eId="att_1__dvs_VI">
              <num>VI.</num>
              <heading>The role of champions and the possible establishment of a Biodiversity Technology Initiative</heading>
              <paragraph eId="att_1__dvs_VI__para_30">
                <num>30.</num>
                <content>
                  <p eId="att_1__dvs_VI__para_30__p_1">Committed Parties and organizations that act as <b>champions of technology transfer</b> can play an important role in promoting and supporting the effective implementation of Articles 16 to 19 and the programme of work on technology transfer and scientific and technological cooperation, in particular if competitive mechanisms are put in place. For example, the Climate Technology Initiative (CTI), which was launched in 1995 by 23 OECD/International Energy Agency member countries and the European Commission to support the technology-related objectives of the United Nations Framework Convention on Climate Change, indicates the useful role of such an international network of champions for the effective implementation of provisions on technology transfer. The establishment of a similar <b>‘Biodiversity Technology Initiative’</b> would be useful and welcome if effectively contributing to the implementation of the present strategy. Several open questions remain, including on the funding needs, the potential portfolio of activities, and other questions as identified in the report prepared by the Executive Secretary for consideration by the ninth meeting of the Conference of the Parties. <sup><authorialNote marker="1" placement="bottom" eId="att_1__dvs_VI__para_30__p_1__authorialNote_1"><p eId="att_1__dvs_VI__para_30__p_1__authorialNote_1__p_1">UNEP/CBD/COP/9/18/Add. 1.</p></authorialNote></sup></p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_VI__para_31">
                <num>31.</num>
                <content>
                  <p eId="att_1__dvs_VI__para_31__p_1">A <b>Biodiversity Award</b> could be established for the best contribution made by projects, individuals, non-governmental organizations, Governments (including local governments) etc, to attaining the 2010 biodiversity target, including best practices on technology transfer and scientific and technological cooperation. The international award would highlight and recognize relevant good practices that could be replicated (with modifications as appropriate) by others in the future.</p>
                </content>
              </paragraph>
            </division>
            <division eId="att_1__dvs_VII">
              <num>VII.</num>
              <heading>Funding mechanisms</heading>
              <paragraph eId="att_1__dvs_VII__para_32">
                <num>32.</num>
                <content>
                  <p eId="att_1__dvs_VII__para_32__p_1">After a decade of continuous recognition of the continual need for the effective transfer of technologies of relevance for conservation and sustainable use of biodiversity or make use of genetic resources and do not cause significant damage to the environment, including biotechnology and traditional technologies, the Ad Hoc Technical Expert Group on Technology Transfer and Scientific and Technological Cooperation is amazed to note that:</p>
                  <blockList eId="att_1__dvs_VII__para_32__list_1">
                    <item eId="att_1__dvs_VII__para_32__list_1__item_i">
                      <num>(i)</num>
                      <p eId="att_1__dvs_VII__para_32__list_1__item_i__p_1">Implementing the objectives of the Convention has not been the aim of many existing technology transfer activities and mechanisms;</p>
                    </item>
                    <item eId="att_1__dvs_VII__para_32__list_1__item_ii">
                      <num>(ii)</num>
                      <p eId="att_1__dvs_VII__para_32__list_1__item_ii__p_1">There is a lack of synergy among existing funding mechanisms dedicated to technology transfer for the implementation of the objectives of the Convention; and</p>
                    </item>
                    <item eId="att_1__dvs_VII__para_32__list_1__item_iii">
                      <num>(iii)</num>
                      <p eId="att_1__dvs_VII__para_32__list_1__item_iii__p_1">The long-standing needs of many countries with regard to the implementation of the objectives of the Convention have not been well-addressed.</p>
                    </item>
                  </blockList>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_VII__para_33">
                <num>33.</num>
                <content>
                  <p eId="att_1__dvs_VII__para_33__p_1">Underlining the need for a <b>diversity of sustainable funding mechanisms</b> such as the Global Environmental Facility, bi- and multilateral funding organizations, private charitable foundations, and others, there is a need to:</p>
                  <blockList eId="att_1__dvs_VII__para_33__list_1">
                    <item eId="att_1__dvs_VII__para_33__list_1__item_i">
                      <num>(i)</num>
                      <p eId="att_1__dvs_VII__para_33__list_1__item_i__p_1"><b>Think creatively</b> about fund-raising, for instance by mobilizing <i>pro bono</i> activities; use technology fairs for mobilizing seed money, etc;</p>
                    </item>
                    <item eId="att_1__dvs_VII__para_33__list_1__item_ii">
                      <num>(ii)</num>
                      <p eId="att_1__dvs_VII__para_33__list_1__item_ii__p_1"><b>Cluster funding needs</b> with other Rio conventions and biodiversity-related conventions, at all levels;</p>
                    </item>
                    <item eId="att_1__dvs_VII__para_33__list_1__item_iii">
                      <num>(iii)</num>
                      <p eId="att_1__dvs_VII__para_33__list_1__item_iii__p_1"><b>Integrate technology transfer</b> modules into existing capacity‑building and training programmes;</p>
                    </item>
                    <item eId="att_1__dvs_VII__para_33__list_1__item_iv">
                      <num>(iv)</num>
                      <p eId="att_1__dvs_VII__para_33__list_1__item_iv__p_1"><b>Raise the biodiversity agenda,</b> and subsequent funding needs, within existing funding programmes;</p>
                    </item>
                  </blockList>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_VII__para_34">
                <num>34.</num>
                <content>
                  <p eId="att_1__dvs_VII__para_34__p_1">Generate <b>information on potential funding sources</b> for different sectors, thus creating awareness of available funding.</p>
                </content>
              </paragraph>
              <paragraph eId="att_1__dvs_VII__para_35">
                <num>35.</num>
                <content>
                  <p eId="att_1__dvs_VII__para_35__p_1">Sustainable funding <i>inter alia </i>needs to be provided:</p>
                  <blockList eId="att_1__dvs_VII__para_35__list_1">
                    <item eId="att_1__dvs_VII__para_35__list_1__item_i">
                      <num>(i)</num>
                      <p eId="att_1__dvs_VII__para_35__list_1__item_i__p_1">For <b>training of technology transfer personnel;</b></p>
                    </item>
                    <item eId="att_1__dvs_VII__para_35__list_1__item_ii">
                      <num>(ii)</num>
                      <p eId="att_1__dvs_VII__para_35__list_1__item_ii__p_1">For the <b>establishment and maintenance of databases</b> on available technologies as well as on transactional instruments;</p>
                    </item>
                    <item eId="att_1__dvs_VII__para_35__list_1__item_iii">
                      <num>(iii)</num>
                      <p eId="att_1__dvs_VII__para_35__list_1__item_iii__p_1">For the proposed <b>Biodiversity Technology Initiative.</b></p>
                    </item>
                  </blockList>
                </content>
              </paragraph>
            </division>
          </mainBody>
        </doc>
      </attachment>
    </attachments>
  </statement>
</akomaNtoso>`;
      const doc = new DOMParser().parseFromString(xml, "text/xml");
      new EidRewriter().rewriteAllEids(doc.documentElement);
      expect(new XMLSerializer().serializeToString(doc)).to.equal(xml);
    });

    it('should correctly assign eIds', () => {
      const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <statement>
    <mainBody>
      <p><i>The Conference of Parties,</i></p>
      <division>
        <num>A.</num>
        <heading>Cooperation with other conventions</heading>
        <intro>
          <p><i>Noting</i> the report of the Executive Secretary on progress,<sup><authorialNote marker="1" placement="bottom"><p>UNEP/CBD/COP/12/24.</p></authorialNote></sup></p>
          <p><i>Recalling</i> decision XI/6, including paragraph 3, in which it urged Parties to pursue efforts to enhance synergies among the biodiversity-related conventions to promote policy coherence, improve efficiency and enhance coordination and cooperation at all levels, and with a view to strengthening Parties’ ownership of the process,</p>
        </intro>
        <paragraph>
          <num>"1.</num>
          <content>
            <p><i>Welcomes</i> the International Plant Protection Convention as a member of the Liaison Group of the Biodiversity-related Conventions and <i>notes</i> with appreciation the role of the International Plant Protection Convention in helping to achieve Aichi Biodiversity Target 9;</p>
          </content>
        </paragraph>
        <paragraph>
          <num>4.</num>
          <content>
            <p><i>Reaffirming</i> <ref href="/akn/un/statement/decision/unep-cbd-cop/2010-10-18/10-20">decision X/20</ref>, <i>invites</i> the members of the Liaison Group of the Biodiversity-related Conventions:</p>
            <blockList>
              <item>
                <num>(a)</num>
                <p>To increase their cooperation, coordination and attention to synergies in the development of their respective reporting systems, including future online reporting systems, as a means to increase synergies in national reporting under the biodiversity-related conventions;</p>
              </item>
              <item>
                <num>(b)</num>
                <p>To consider ways and means to increase cooperation on outreach and communication strategies;</p>
              </item>
            </blockList>
          </content>
        </paragraph>
        <wrapUp>
          <p>First wrap-up paragraph;</p>
          <p>Second wrap-up paragraph.</p>
        </wrapUp>
      </division>
      <division>
        <num>B.</num>
        <heading>Cooperation with international organizations and initiatives</heading>
        <intro>
          <p><i>Recognizing</i> the need for an all-encompassing effort by all relevant processes to achieve the Aichi Biodiversity Targets, taking into account different views and approaches to achieve the conservation and sustainable use of biodiversity and sustainable development,</p>
        </intro>
        <paragraph>
          <num>13.</num>
          <content>
            <p><i>Reiterates</i> the importance of a United Nations system‑wide approach to the implementation of the Strategic Plan for Biodiversity 2011-2020 and the achievement of the Aichi Biodiversity Targets in the framework of the United Nations Decade for Biodiversity,<sup><authorialNote marker="3" placement="bottom"><p>See General Assembly resolution 65/161.</p></authorialNote></sup> and <i>welcomes</i> the report of the Environment Management Group on relevant activities of the Issue Management Group on Biodiversity;<sup><authorialNote marker="4" placement="bottom"><p>UNEP/CBD/COP/12/INF/48. See also: United Nations Environment Programme, Advancing the Biodiversity Agenda: A UN System-wide Contribution. A report by the Environment Management Group (EMG/1320/GEN) (UNEP, 2010). Available from <ref href="http://unemg.org">http://unemg.org</ref>;</p></authorialNote></sup></p>
          </content>
        </paragraph>
        <paragraph>
          <num>14.</num>
          <content>
            <p><i>Invites</i> the United Nations and other organizations to continue their efforts in furthering the integration of the Aichi Biodiversity Targets throughout the United Nations system, in particular through the Environment Management Group and other relevant initiatives;</p>
          </content>
        </paragraph>
      </division>
    </mainBody>
  </statement>
</akomaNtoso>`;
      const doc = new DOMParser().parseFromString(xml, "text/xml");
      new EidRewriter().rewriteAllEids(doc.documentElement);
      expect(new XMLSerializer().serializeToString(doc)).to.equal(`<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <statement>
    <mainBody>
      <p eId="p_1"><i>The Conference of Parties,</i></p>
      <division eId="dvs_A">
        <num>A.</num>
        <heading>Cooperation with other conventions</heading>
        <intro>
          <p eId="dvs_A__intro__p_1"><i>Noting</i> the report of the Executive Secretary on progress,<sup><authorialNote marker="1" placement="bottom" eId="dvs_A__intro__p_1__authorialNote_1"><p eId="dvs_A__intro__p_1__authorialNote_1__p_1">UNEP/CBD/COP/12/24.</p></authorialNote></sup></p>
          <p eId="dvs_A__intro__p_2"><i>Recalling</i> decision XI/6, including paragraph 3, in which it urged Parties to pursue efforts to enhance synergies among the biodiversity-related conventions to promote policy coherence, improve efficiency and enhance coordination and cooperation at all levels, and with a view to strengthening Parties’ ownership of the process,</p>
        </intro>
        <paragraph eId="dvs_A__para_1">
          <num>"1.</num>
          <content>
            <p eId="dvs_A__para_1__p_1"><i>Welcomes</i> the International Plant Protection Convention as a member of the Liaison Group of the Biodiversity-related Conventions and <i>notes</i> with appreciation the role of the International Plant Protection Convention in helping to achieve Aichi Biodiversity Target 9;</p>
          </content>
        </paragraph>
        <paragraph eId="dvs_A__para_4">
          <num>4.</num>
          <content>
            <p eId="dvs_A__para_4__p_1"><i>Reaffirming</i> <ref href="/akn/un/statement/decision/unep-cbd-cop/2010-10-18/10-20" eId="dvs_A__para_4__p_1__ref_1">decision X/20</ref>, <i>invites</i> the members of the Liaison Group of the Biodiversity-related Conventions:</p>
            <blockList eId="dvs_A__para_4__list_1">
              <item eId="dvs_A__para_4__list_1__item_a">
                <num>(a)</num>
                <p eId="dvs_A__para_4__list_1__item_a__p_1">To increase their cooperation, coordination and attention to synergies in the development of their respective reporting systems, including future online reporting systems, as a means to increase synergies in national reporting under the biodiversity-related conventions;</p>
              </item>
              <item eId="dvs_A__para_4__list_1__item_b">
                <num>(b)</num>
                <p eId="dvs_A__para_4__list_1__item_b__p_1">To consider ways and means to increase cooperation on outreach and communication strategies;</p>
              </item>
            </blockList>
          </content>
        </paragraph>
        <wrapUp>
          <p eId="dvs_A__wrapup__p_1">First wrap-up paragraph;</p>
          <p eId="dvs_A__wrapup__p_2">Second wrap-up paragraph.</p>
        </wrapUp>
      </division>
      <division eId="dvs_B">
        <num>B.</num>
        <heading>Cooperation with international organizations and initiatives</heading>
        <intro>
          <p eId="dvs_B__intro__p_1"><i>Recognizing</i> the need for an all-encompassing effort by all relevant processes to achieve the Aichi Biodiversity Targets, taking into account different views and approaches to achieve the conservation and sustainable use of biodiversity and sustainable development,</p>
        </intro>
        <paragraph eId="dvs_B__para_13">
          <num>13.</num>
          <content>
            <p eId="dvs_B__para_13__p_1"><i>Reiterates</i> the importance of a United Nations system‑wide approach to the implementation of the Strategic Plan for Biodiversity 2011-2020 and the achievement of the Aichi Biodiversity Targets in the framework of the United Nations Decade for Biodiversity,<sup><authorialNote marker="3" placement="bottom" eId="dvs_B__para_13__p_1__authorialNote_1"><p eId="dvs_B__para_13__p_1__authorialNote_1__p_1">See General Assembly resolution 65/161.</p></authorialNote></sup> and <i>welcomes</i> the report of the Environment Management Group on relevant activities of the Issue Management Group on Biodiversity;<sup><authorialNote marker="4" placement="bottom" eId="dvs_B__para_13__p_1__authorialNote_2"><p eId="dvs_B__para_13__p_1__authorialNote_2__p_1">UNEP/CBD/COP/12/INF/48. See also: United Nations Environment Programme, Advancing the Biodiversity Agenda: A UN System-wide Contribution. A report by the Environment Management Group (EMG/1320/GEN) (UNEP, 2010). Available from <ref href="http://unemg.org" eId="dvs_B__para_13__p_1__authorialNote_2__p_1__ref_1">http://unemg.org</ref>;</p></authorialNote></sup></p>
          </content>
        </paragraph>
        <paragraph eId="dvs_B__para_14">
          <num>14.</num>
          <content>
            <p eId="dvs_B__para_14__p_1"><i>Invites</i> the United Nations and other organizations to continue their efforts in furthering the integration of the Aichi Biodiversity Targets throughout the United Nations system, in particular through the Environment Management Group and other relevant initiatives;</p>
          </content>
        </paragraph>
      </division>
    </mainBody>
  </statement>
</akomaNtoso>`);
    });

    it('should not rewrite missing eIds', () => {
      const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <statement name="statement">
    <preface>
      <p eId="p_1">Here is a document with <i>italics</i> and <term>terms</term> and <remark>remarks</remark>.</p>
      <p>Here is a document with <i>italics</i> and <term>terms</term> and <remark>remarks</remark>.</p>
    </preface>
  </statement>
</akomaNtoso>`;
      const doc = new DOMParser().parseFromString(xml, "text/xml");
      new EidRewriter().rewriteAllEids(doc.documentElement);
      expect(new XMLSerializer().serializeToString(doc)).to.equal(`<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <statement name="statement">
    <preface>
      <p eId="preface__p_1">Here is a document with <i>italics</i> and <term eId="preface__p_1__term_1">terms</term> and <remark>remarks</remark>.</p>
      <p eId="preface__p_2">Here is a document with <i>italics</i> and <term eId="preface__p_2__term_1">terms</term> and <remark>remarks</remark>.</p>
    </preface>
  </statement>
</akomaNtoso>`);
    });
  });
  describe('#cleanNum()', () => {
    it('should clean nums correctly', () => {
      const r = new EidRewriter();

      expect(r.cleanNum("")).to.equal("");
      expect(r.cleanNum(" ")).to.equal("");
      expect(r.cleanNum("( )")).to.equal("");
      expect(r.cleanNum("(123.4-5)")).to.equal("123-4-5");
      expect(r.cleanNum("(312.32.7)")).to.equal("312-32-7");
      expect(r.cleanNum("(312_32_7)")).to.equal("312-32-7");
      expect(r.cleanNum("(6)")).to.equal("6");
      expect(r.cleanNum("[16]")).to.equal("16");
      expect(r.cleanNum("(i)")).to.equal("i");
      expect(r.cleanNum("[i]")).to.equal("i");
      expect(r.cleanNum("(2bis)")).to.equal("2bis");
      expect(r.cleanNum('"1.2.')).to.equal("1-2");
      expect(r.cleanNum("1.2.")).to.equal("1-2");
      expect(r.cleanNum("“2.3")).to.equal("2-3");
      expect(r.cleanNum("2,3")).to.equal("2-3");
      expect(r.cleanNum("2,3, 4,")).to.equal("2-3-4");
      expect(r.cleanNum("3a bis")).to.equal("3abis");
      expect(r.cleanNum("3é")).to.equal("3é");
      expect(r.cleanNum(" -3a--4,9")).to.equal("3a-4-9");
    });

    it('should handle non-arabic numerals', () => {
      const r = new EidRewriter();
      // hebrew aleph
      expect(r.cleanNum("(א)")).to.equal("א");
      // chinese 3
      expect(r.cleanNum("(三)")).to.equal("三");
    });
  });
});

describe('WorkComponentRewriter', () => {
  describe('#rewriteAllAttachmentWorkComponents()', () => {
    it('should correctly assign work attachment components', () => {
      const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta>
      <identification source="#Laws-Africa">
        <FRBRWork>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
          <FRBRalias value="KwaZulu-Natal Liquor Licensing Regulations, 2013" name="title"/>
          <FRBRdate date="2014" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRcountry value="za-kzn"/>
          <FRBRsubtype value="pn"/>
          <FRBRnumber value="45"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
          <FRBRdate date="2014-02-13" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRlanguage language="eng"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
          <FRBRdate date="2024-08-05" name="Generation"/>
          <FRBRauthor href=""/>
        </FRBRManifestation>
      </identification>
      <publication showAs="KwaZulu-Natal Provincial Gazette" name="KwaZulu-Natal Provincial Gazette" date="2014-02-13" number="1081"/>
      <references source="#Laws-Africa">
        <TLCOrganization eId="Laws-Africa" href="https://edit.laws.africa" showAs="Laws.Africa"/>
      </references>
    </meta>
    <preface>
      <p eId="preface__p_1">I hereby make the Regulations contained in the Schedule hereto under section 99 of the KwaZulu-Natal Liquor Licensing Act, 2010 (<ref href="/akn/za-kzn/act/2010/6" eId="preface__p_1__ref_1">Act No. 6 of 2010</ref>), in order to regulate liquor licensing matters in the Province.</p>
    </preface>
    <body>
      <part eId="part_VIII">
        <num>VIII</num>
        <heading>General provisions</heading>
        <section eId="part_VIII__sec_55">
          <num>55.</num>
          <heading>Short title</heading>
          <content>
            <p eId="part_VIII__sec_55__p_1">These Regulations are called the KwaZulu-Natal Liquor Licensing Regulations, 2013.</p>
          </content>
        </section>
      </part>
    </body>
    <attachments>
      <attachment eId="att_1">
        <heading>Annexure A</heading>
        <subheading>Application form</subheading>
        <doc name="annexure">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure A" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_1__p_1">KZNLA 1</p>
          </mainBody>
        </doc>
      </attachment>
      <attachment eId="att_2">
        <heading>Annexure B</heading>
        <subheading>KwaZulu-Natal liquor licensing fees</subheading>
        <doc name="schedule">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure B" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRsubtype value="pn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2014-02-13" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-05" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_2__p_1">KZNLA 2</p>
          </mainBody>
        </doc>
      </attachment>
      <attachment eId="att_12">
        <heading>Annexure J</heading>
        <subheading>Notice of intention to apply for special events liquor permit</subheading>
        <doc name="schedule">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_11"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure J" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_12__p_1">KZNLA 10</p>
          </mainBody>
          <attachments>
            <attachment eId="att_12__att_1">
              <heading>1</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_11/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="1" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_1__p_1"/>
                </mainBody>
              </doc>
            </attachment>
            <attachment eId="att_12__att_2">
              <heading>2</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_11/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="2" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_2__p_1"/>
                </mainBody>
                <attachments>
                  <attachment eId="att_12__att_2__att_1">
                    <heading>A</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_11/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="A" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_1__p_1"/>
                      </mainBody>
                    </doc>
                  </attachment>
                  <attachment eId="att_12__att_2__att_2">
                    <heading>B</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_11/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="B" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_2__p_1"/>
                      </mainBody>
                    </doc>
                  </attachment>
                  <attachment eId="att_12__att_2__att_3">
                    <heading>C</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_11/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="C" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_3__p_1">new content &lt;3</p>
                      </mainBody>
                    </doc>
                  </attachment>
                </attachments>
              </doc>
            </attachment>
            <attachment eId="att_12__att_3">
              <heading>4</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_11/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="4" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_11/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_3__p_1"/>
                </mainBody>
              </doc>
            </attachment>
          </attachments>
        </doc>
      </attachment>
    </attachments>
  </act>
</akomaNtoso>`;
      const doc = new DOMParser().parseFromString(xml, "text/xml");
      new WorkComponentRewriter().rewriteAllAttachmentWorkComponents(doc.documentElement);
      expect(new XMLSerializer().serializeToString(doc)).to.equal(`<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta>
      <identification source="#Laws-Africa">
        <FRBRWork>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
          <FRBRalias value="KwaZulu-Natal Liquor Licensing Regulations, 2013" name="title"/>
          <FRBRdate date="2014" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRcountry value="za-kzn"/>
          <FRBRsubtype value="pn"/>
          <FRBRnumber value="45"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
          <FRBRdate date="2014-02-13" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRlanguage language="eng"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
          <FRBRdate date="2024-08-05" name="Generation"/>
          <FRBRauthor href=""/>
        </FRBRManifestation>
      </identification>
      <publication showAs="KwaZulu-Natal Provincial Gazette" name="KwaZulu-Natal Provincial Gazette" date="2014-02-13" number="1081"/>
      <references source="#Laws-Africa">
        <TLCOrganization eId="Laws-Africa" href="https://edit.laws.africa" showAs="Laws.Africa"/>
      </references>
    </meta>
    <preface>
      <p eId="preface__p_1">I hereby make the Regulations contained in the Schedule hereto under section 99 of the KwaZulu-Natal Liquor Licensing Act, 2010 (<ref href="/akn/za-kzn/act/2010/6" eId="preface__p_1__ref_1">Act No. 6 of 2010</ref>), in order to regulate liquor licensing matters in the Province.</p>
    </preface>
    <body>
      <part eId="part_VIII">
        <num>VIII</num>
        <heading>General provisions</heading>
        <section eId="part_VIII__sec_55">
          <num>55.</num>
          <heading>Short title</heading>
          <content>
            <p eId="part_VIII__sec_55__p_1">These Regulations are called the KwaZulu-Natal Liquor Licensing Regulations, 2013.</p>
          </content>
        </section>
      </part>
    </body>
    <attachments>
      <attachment eId="att_1">
        <heading>Annexure A</heading>
        <subheading>Application form</subheading>
        <doc name="annexure">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure A" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_1__p_1">KZNLA 1</p>
          </mainBody>
        </doc>
      </attachment>
      <attachment eId="att_2">
        <heading>Annexure B</heading>
        <subheading>KwaZulu-Natal liquor licensing fees</subheading>
        <doc name="schedule">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure B" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRsubtype value="pn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2014-02-13" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-05" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_2__p_1">KZNLA 2</p>
          </mainBody>
        </doc>
      </attachment>
      <attachment eId="att_12">
        <heading>Annexure J</heading>
        <subheading>Notice of intention to apply for special events liquor permit</subheading>
        <doc name="schedule">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure J" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_12__p_1">KZNLA 10</p>
          </mainBody>
          <attachments>
            <attachment eId="att_12__att_1">
              <heading>1</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="1" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_1__p_1"/>
                </mainBody>
              </doc>
            </attachment>
            <attachment eId="att_12__att_2">
              <heading>2</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="2" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_2__p_1"/>
                </mainBody>
                <attachments>
                  <attachment eId="att_12__att_2__att_1">
                    <heading>A</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="A" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_1__p_1"/>
                      </mainBody>
                    </doc>
                  </attachment>
                  <attachment eId="att_12__att_2__att_2">
                    <heading>B</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="B" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_2__p_1"/>
                      </mainBody>
                    </doc>
                  </attachment>
                  <attachment eId="att_12__att_2__att_3">
                    <heading>C</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="C" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_3__p_1">new content &lt;3</p>
                      </mainBody>
                    </doc>
                  </attachment>
                </attachments>
              </doc>
            </attachment>
            <attachment eId="att_12__att_3">
              <heading>4</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="4" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_3__p_1"/>
                </mainBody>
              </doc>
            </attachment>
          </attachments>
        </doc>
      </attachment>
    </attachments>
  </act>
</akomaNtoso>`);
    });

    it('should not change a document with correct attachment components', () => {
      const xml = `<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <act name="act">
    <meta>
      <identification source="#Laws-Africa">
        <FRBRWork>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
          <FRBRalias value="KwaZulu-Natal Liquor Licensing Regulations, 2013" name="title"/>
          <FRBRdate date="2014" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRcountry value="za-kzn"/>
          <FRBRsubtype value="pn"/>
          <FRBRnumber value="45"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
          <FRBRdate date="2014-02-13" name="Generation"/>
          <FRBRauthor href=""/>
          <FRBRlanguage language="eng"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!main"/>
          <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
          <FRBRdate date="2024-08-05" name="Generation"/>
          <FRBRauthor href=""/>
        </FRBRManifestation>
      </identification>
      <publication showAs="KwaZulu-Natal Provincial Gazette" name="KwaZulu-Natal Provincial Gazette" date="2014-02-13" number="1081"/>
      <references source="#Laws-Africa">
        <TLCOrganization eId="Laws-Africa" href="https://edit.laws.africa" showAs="Laws.Africa"/>
      </references>
    </meta>
    <preface>
      <p eId="preface__p_1">I hereby make the Regulations contained in the Schedule hereto under section 99 of the KwaZulu-Natal Liquor Licensing Act, 2010 (<ref href="/akn/za-kzn/act/2010/6" eId="preface__p_1__ref_1">Act No. 6 of 2010</ref>), in order to regulate liquor licensing matters in the Province.</p>
    </preface>
    <body>
      <part eId="part_VIII">
        <num>VIII</num>
        <heading>General provisions</heading>
        <section eId="part_VIII__sec_55">
          <num>55.</num>
          <heading>Short title</heading>
          <content>
            <p eId="part_VIII__sec_55__p_1">These Regulations are called the KwaZulu-Natal Liquor Licensing Regulations, 2013.</p>
          </content>
        </section>
      </part>
    </body>
    <attachments>
      <attachment eId="att_1">
        <heading>Annexure A</heading>
        <subheading>Application form</subheading>
        <doc name="annexure">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure A" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!annexure_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_1__p_1">KZNLA 1</p>
          </mainBody>
        </doc>
      </attachment>
      <attachment eId="att_2">
        <heading>Annexure B</heading>
        <subheading>KwaZulu-Natal liquor licensing fees</subheading>
        <doc name="schedule">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure B" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRsubtype value="pn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2014-02-13" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_1"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-05" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_2__p_1">KZNLA 2</p>
          </mainBody>
        </doc>
      </attachment>
      <attachment eId="att_12">
        <heading>Annexure J</heading>
        <subheading>Notice of intention to apply for special events liquor permit</subheading>
        <doc name="schedule">
          <meta>
            <identification source="#Laws-Africa">
              <FRBRWork>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                <FRBRalias value="Annexure J" name="title"/>
                <FRBRdate date="2014" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRcountry value="za-kzn"/>
                <FRBRnumber value="45"/>
              </FRBRWork>
              <FRBRExpression>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
                <FRBRlanguage language="eng"/>
              </FRBRExpression>
              <FRBRManifestation>
                <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2"/>
                <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                <FRBRdate date="2024-08-07" name="Generation"/>
                <FRBRauthor href=""/>
              </FRBRManifestation>
            </identification>
          </meta>
          <mainBody>
            <p eId="att_12__p_1">KZNLA 10</p>
          </mainBody>
          <attachments>
            <attachment eId="att_12__att_1">
              <heading>1</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="1" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_1"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_1__p_1"/>
                </mainBody>
              </doc>
            </attachment>
            <attachment eId="att_12__att_2">
              <heading>2</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="2" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_2__p_1"/>
                </mainBody>
                <attachments>
                  <attachment eId="att_12__att_2__att_1">
                    <heading>A</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="A" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_1"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_1__p_1"/>
                      </mainBody>
                    </doc>
                  </attachment>
                  <attachment eId="att_12__att_2__att_2">
                    <heading>B</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="B" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_2"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_2__p_1"/>
                      </mainBody>
                    </doc>
                  </attachment>
                  <attachment eId="att_12__att_2__att_3">
                    <heading>C</heading>
                    <doc name="schedule">
                      <meta>
                        <identification source="#Laws-Africa">
                          <FRBRWork>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                            <FRBRalias value="C" name="title"/>
                            <FRBRdate date="2014" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRcountry value="za-kzn"/>
                            <FRBRnumber value="45"/>
                          </FRBRWork>
                          <FRBRExpression>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                            <FRBRlanguage language="eng"/>
                          </FRBRExpression>
                          <FRBRManifestation>
                            <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_2/schedule_3"/>
                            <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                            <FRBRdate date="2024-08-07" name="Generation"/>
                            <FRBRauthor href=""/>
                          </FRBRManifestation>
                        </identification>
                      </meta>
                      <mainBody>
                        <p eId="att_12__att_2__att_3__p_1">new content &lt;3</p>
                      </mainBody>
                    </doc>
                  </attachment>
                </attachments>
              </doc>
            </attachment>
            <attachment eId="att_12__att_3">
              <heading>4</heading>
              <doc name="annexure">
                <meta>
                  <identification source="#Laws-Africa">
                    <FRBRWork>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/!schedule_2/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45"/>
                      <FRBRalias value="4" name="title"/>
                      <FRBRdate date="2014" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRcountry value="za-kzn"/>
                      <FRBRnumber value="45"/>
                    </FRBRWork>
                    <FRBRExpression>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                      <FRBRlanguage language="eng"/>
                    </FRBRExpression>
                    <FRBRManifestation>
                      <FRBRthis value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13/!schedule_2/annexure_3"/>
                      <FRBRuri value="/akn/za-kzn/act/pn/2014/45/eng@2014-02-13"/>
                      <FRBRdate date="2024-08-07" name="Generation"/>
                      <FRBRauthor href=""/>
                    </FRBRManifestation>
                  </identification>
                </meta>
                <mainBody>
                  <p eId="att_12__att_3__p_1"/>
                </mainBody>
              </doc>
            </attachment>
          </attachments>
        </doc>
      </attachment>
    </attachments>
  </act>
</akomaNtoso>`;
      const doc = new DOMParser().parseFromString(xml, "text/xml");
      new WorkComponentRewriter().rewriteAllAttachmentWorkComponents(doc.documentElement);
      expect(new XMLSerializer().serializeToString(doc)).to.equal(xml);
    });
  });
});
