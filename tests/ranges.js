import { expect } from 'chai';
import { rangeToTarget, targetToRange } from '../src/ranges';

describe('ranges', () => {
  describe('rangeToTarget()', () => {
    it('should anchor ranges to the closest data-eid attribute', () => {
      const root = document.createElement('div');
      root.innerHTML = '<section><p data-eid="sec_1__p_1">Some selected text.</p></section>';
      document.body.appendChild(root);

      try {
        const text = root.querySelector('[data-eid]').firstChild;
        const range = document.createRange();
        range.setStart(text, 5);
        range.setEnd(text, 13);

        const target = rangeToTarget(range, root);

        expect(target.anchor_id).to.equal('sec_1__p_1');
        expect(target.selectors[0]).to.include({
          type: 'TextPositionSelector',
          start: 5,
          end: 13
        });
        expect(target.selectors[1]).to.include({
          type: 'TextQuoteSelector',
          exact: 'selected'
        });
      } finally {
        document.body.removeChild(root);
      }
    });
  });

  describe('targetToRange()', () => {
    it('should resolve targets anchored to a data-eid attribute', () => {
      const root = document.createElement('div');
      root.innerHTML = '<section><p data-eid="sec_1__p_1">Some selected text.</p></section>';
      document.body.appendChild(root);

      try {
        const range = targetToRange({
          anchor_id: 'sec_1__p_1',
          selectors: [{
            type: 'TextPositionSelector',
            start: 5,
            end: 13
          }]
        }, root);

        expect(range.toString()).to.equal('selected');
      } finally {
        document.body.removeChild(root);
      }
    });
  });
});
