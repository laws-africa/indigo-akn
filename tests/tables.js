import { expect } from 'chai';
import { tableToAkn } from "../src/html";

describe('tableToAkn', () => {
  describe('#cleanTable()', () => {
    it('should preserve column widths', () => {
      const table_xml = `<xml/>`;
      expect(cleanTable(table_xml)).to.eql("idk");
    });

    it('should discard unwanted Word styles', () => {
      const table_xml = `<xml/>`;
      expect(cleanTable(table_xml)).to.eql("idk");
    });

  });
});
