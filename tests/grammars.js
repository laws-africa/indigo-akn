import { expect } from 'chai';
import { GrammarModel } from '../src/grammars';

describe('GrammarModel', () => {
  describe('#setup()', () => {
    let originalFetch;
    let originalProcessor;

    beforeEach(() => {
      originalFetch = window.fetch;
      originalProcessor = window.XSLTProcessor;
    });

    afterEach(() => {
      window.fetch = originalFetch;
      window.XSLTProcessor = originalProcessor;
    });

    it('should reject when stylesheet initialization fails', async () => {
      window.fetch = async () => ({ ok: true, text: async () => '<stylesheet/>' });
      window.XSLTProcessor = class {
        importStylesheet() { throw new Error('Invalid stylesheet'); }
      };
      const grammar = new GrammarModel(null, '/grammar.xsl');
      try {
        await grammar.setup();
        throw new Error('Expected setup to reject');
      } catch (error) {
        expect(error.message).to.equal('Invalid stylesheet');
        expect(grammar.textTransform).to.equal(undefined);
      }
    });

    it('should reject a failed stylesheet request', async () => {
      window.fetch = async () => ({ ok: false, status: 404 });
      try {
        await new GrammarModel(null, '/grammar.xsl').setup();
        throw new Error('Expected setup to reject');
      } catch (error) {
        expect(error.message).to.equal('Failed to load XSL: 404');
      }
    });
  });
  describe('#onPaste()', () => {
    it('should handle bad html', () => {
      const grammar = new GrammarModel();
      const clipboardData = {
        types: ['text/html'],
        getData: () => '<--! escape <p><p>bad html',
      };
      grammar.onPaste(null, { clipboardData });
    });
  });
});
