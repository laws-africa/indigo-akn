import { HTML_TO_AKN_XSL } from "./xsl";
import { decode } from 'he';

export const htmlToAknXslt = new XSLTProcessor();
htmlToAknXslt.importStylesheet(new DOMParser().parseFromString(HTML_TO_AKN_XSL, 'text/xml'));

/**
 * Serialize an HTML node to an XML string.
 *
 * This ensures that entity references that are defined in HTML but not in XML (eg. &nbsp;) are substituted
 * for their unicode equivalents.
 */
export function htmlNodeToXmlString (node) {
  // html -> string
  let xml = new XMLSerializer().serializeToString(node);

  // translate HTML entities that XML doesn't understand
  // 1. escape away valid XML entities
  //    https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML
  xml = xml.replace(/&(quot|amp|apos|lt|gt);/g, '&la_$1;');
  // 2. decode named entities
  xml = decode(xml);
  // 3. put the valid XML entities back
  xml = xml.replace(/&la_(quot|amp|apos|lt|gt);/g, '&$1;');

  return xml;
}

/**
 * Transform an HTML node into an XML node.
 *
 * This transforms from html -> string -> xhtml so that the XML is well formed.
 */
export function htmlNodeToXmlNode (node) {
  let str = htmlNodeToXmlString(node);
  // replace tabs and multiple whitespace with a single space
  str = str.replace(/[\t\n]/g, ' ').replace(/\s{2,}/g, ' ');
  const xml = new DOMParser().parseFromString(str, "text/xml");

  if (!xml) throw "Invalid XML: " + str;

  const errors = xml.getElementsByTagName('parsererror');
  if (errors.length) {
    const err = Array.from(errors).map(e => e.textContent).join('; ');
    throw "Invalid XML: " + str + ": " + err;
  }

  return xml;
}

/**
 * Converts an HTML element into an Akoma Ntoso XML element.
 */
export function htmlToAkn (html) {
  function clean(html) {
    // strip out namespaced tags - we don't want MS Office's tags
    const elems = html.getElementsByTagName("*");
    for (let i = 0; i < elems.length; i++) {
      const elem = elems[i];

      if (elem.tagName.indexOf(':') > -1) {
        elem.remove();
        // the element collection is live, so keep i the same
        i--;
      } else {
        // strip style and namespaced attributes, too
        cleanAttributes(elem);
      }
    }
  }

  function keepOnlyWidth(elem) {
    let styleObj = elem.style;
    for (let i = styleObj.length; i >= 0; i--) {
      let nameString = styleObj[i];
      if (nameString !== 'width') {
        styleObj.removeProperty(nameString);
      }
    }
  }

  function cleanAttributes(elem) {
    elem.getAttributeNames().forEach(name => {
      if (name === 'style' && (elem.localName === 'td' || elem.localName === 'th')) {
        keepOnlyWidth(elem);
      } else if (name === 'style' || name.indexOf(':') > -1) {
        elem.removeAttribute(name);
      }
    });
  }

  clean(html);

  // html -> xhtml
  let xml = htmlNodeToXmlNode(html);

  // xhtml -> akn
  xml = htmlToAknXslt.transformToFragment(xml.firstChild, xml);
  if (!xml) {
    console.log("htmlTransform.transformToFragment returned null, input was: ", table.outerHTML);
    return null;
  }

  // strip whitespace at start of first p tag in table cells
  xml.querySelectorAll('table td > p:first-child, table th > p:first-child').forEach(p => {
    const text = p.firstChild;

    if (text && text.nodeType === text.TEXT_NODE) {
      text.textContent = text.textContent.replace(/^\s+/, '');
    }
  });

  // strip whitespace at end of last p tag in table cells
  xml.querySelectorAll('table td > p:last-child, table th > p:last-child').forEach(p => {
    const text = p.lastChild;

    if (text && text.nodeType === text.TEXT_NODE) {
      text.textContent = text.textContent.replace(/\s+$/, '');
    }
  });

  return xml;
}

/**
 * Fixes all tables in a list of Akoma Ntoso XML elements.
 */
export function fixTables (elementList) {
  function fixTable(table) {
    let xmlns = table.namespaceURI,
        tableMap = mapTable(table),
        nMappedRows = Object.keys(tableMap).length;

    // add missing rows
    let nMissingRows = nMappedRows - table.childNodes.length;
    for (let y = 0; y < nMissingRows; y++) {
      console.log("adding a missing row to table ", table.getAttribute('eId'));
      table.appendChild(document.createElementNS(xmlns, 'tr'));
    }

    // add missing cells
    let nMaxMappedColumns = Math.max(...Object.values(tableMap).map(r => Object.keys(r).length));
    for (let r = 0; r < table.children.length; r++) {
      let nMissingCells = nMaxMappedColumns - Object.keys(tableMap[r]).length,
          row = table.children[r];
      for (let m = 0; m < nMissingCells; m++) {
        console.log("adding a missing cell to table ", table.getAttribute('eId'), " row ", r);
        let cell = document.createElementNS(xmlns, 'td');
        cell.appendChild(document.createElementNS(xmlns, 'p'));
        row.appendChild(cell);
      }
    }
  }

  function mapTable(table) {
    let matrix = {},
        rows = table.children;

    for (let y = 0; y < rows.length; y++) {
      // set default
      if (!matrix[y]) {
        matrix[y] = {};
      }
      let row = rows[y];
      let cells = row.children;
      for (let x = 0; x < cells.length; x++) {
        // stash 'x' so we don't end the loop prematurely if it's incremented below
        let xPos = x;
        let cell = cells[x];
        // set default; increment xPos if needed (skip already occupied cells in current row)
        while (matrix[y][xPos]) {
          xPos += 1;
        }
        matrix[y][xPos] = {};
        // mark matrix elements occupied by current cell with true
        let colSpanTotal = xPos + Number(cell.getAttribute('colspan') || 1);
        let rowSpanTotal = y + Number(cell.getAttribute('rowspan') || 1);

        for (let xx = xPos; xx < colSpanTotal; xx++) {
          for (let yy = y; yy < rowSpanTotal; yy++) {
            if (!matrix[yy]) {
              matrix[yy] = {};
            }
            matrix[yy][xx] = true;
          }
        }
      }
    }
    return matrix;
  }

  for (let i = 0; i < elementList.length; i++) {
    let tableList = elementList[i].querySelectorAll("table");
    for (let t = 0; t < tableList.length; t++) {
      fixTable(tableList[t]);
    }
  }
}
