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
 * Converts an HTML table element into an Akoma Ntoso XML table element.
 */
export function tableToAkn (table) {
  function cleanTable(table) {
    // strip out namespaced tags - we don't want MS Office's tags
    const elems = table.getElementsByTagName("*");
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
    for (let i = styleObj.length; i--;) {
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

  cleanTable(table);

  // html -> xhtml
  let xml = htmlNodeToXmlNode(table);

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
