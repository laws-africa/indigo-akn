 import { GrammarModel } from '../src/grammars';

describe('GrammarModel', () => {
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
