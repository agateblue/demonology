import {
  getArithmeticNCost,
  getArithmeticCumulativeCost,
} from '@/game'

describe('game', () => {
  it('getArithmeticNCost', () => {
    expect(getArithmeticNCost({n: 1, base: 10, increaseFactor: 5})).toEqual(10)
    expect(getArithmeticNCost({n: 2, base: 10, increaseFactor: 5})).toEqual(15)
    expect(getArithmeticNCost({n: 3, base: 10, increaseFactor: 5})).toEqual(20)
    expect(getArithmeticNCost({n: 4, base: 10, increaseFactor: 5})).toEqual(25)
    expect(getArithmeticNCost({n: 5, base: 10, increaseFactor: 5})).toEqual(30)
    expect(getArithmeticNCost({n: 6, base: 10, increaseFactor: 5})).toEqual(35)
    expect(getArithmeticNCost({n: 10, base: 10, increaseFactor: 5})).toEqual(55)
  })
  it('getArithmeticCumulativeCost', () => {
    expect(getArithmeticCumulativeCost({start: 0, quantity: 1, base: 10, increaseFactor: 5})).toEqual(10)
    expect(getArithmeticCumulativeCost({start: 0, quantity: 2, base: 10, increaseFactor: 5})).toEqual(25)
    expect(getArithmeticCumulativeCost({start: 0, quantity: 3, base: 10, increaseFactor: 5})).toEqual(45)
    expect(getArithmeticCumulativeCost({start: 0, quantity: 4, base: 10, increaseFactor: 5})).toEqual(70)
  })
  it('getArithmeticCumulativeCost start offset', () => {
    expect(getArithmeticCumulativeCost({start: 3, quantity: 1, base: 10, increaseFactor: 5})).toEqual(25)
    expect(getArithmeticCumulativeCost({start: 3, quantity: 2, base: 10, increaseFactor: 5})).toEqual(55)
    expect(getArithmeticCumulativeCost({start: 3, quantity: 3, base: 10, increaseFactor: 5})).toEqual(90)
  })
})
