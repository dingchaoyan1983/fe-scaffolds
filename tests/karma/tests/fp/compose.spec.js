import {expect} from 'chai';
import compose  from '../../src/fp/compose'

describe('Utils', () => {
  describe('compose', () => {
    it('composes from right to left', () => {
      const double = x => x * 2
      const square = x => x * x
      expect(compose(square)(5)).to.eq(25)
      expect(compose(square, double)(5)).to.eq(100)
      expect(compose(double, square, double)(5)).to.eq(200)
    })

    it('composes functions from right to left', () => {
      const a = next => x => next(x + 'a')
      const b = next => x => next(x + 'b')
      const c = next => x => next(x + 'c')
      const final = x => x

      expect(compose(a, b, c)(final)('')).to.eq('abc')
      expect(compose(b, c, a)(final)('')).to.eq('bca')
      expect(compose(c, a, b)(final)('')).to.eq('cab');
      expect(a(b(c(final)))('')).to.eq('abc');
    })

    it('can be seeded with multiple arguments', () => {
      const square = x => x * x
      const add = (x, y) => x + y
      expect(compose(square, add)(1, 2)).to.eq(9)
    })

    it('returns the first given argument if given no functions', () => {
      expect(compose()(1, 2)).to.eq(1)
      expect(compose()(3)).to.eq(3)
      expect(compose()()).to.eq(undefined)
    })

    it('returns the first function if given only one', () => {
      const fn = () => {}

      expect(compose(fn)).to.eq(fn)
    })
  })
})
