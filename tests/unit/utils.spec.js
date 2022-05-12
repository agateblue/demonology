import {
  getArithmeticNCost,
  getArithmeticCumulativeCost,
  getGeometricNCost,
  getGeometricCumulativeCost,
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
  it('getGeometricNCost', () => {
    expect(getGeometricNCost({n: 1, base: 10, increaseFactor: 2})).toEqual(10)
    expect(getGeometricNCost({n: 2, base: 10, increaseFactor: 2})).toEqual(20)
    expect(getGeometricNCost({n: 3, base: 10, increaseFactor: 2})).toEqual(40)
    expect(getGeometricNCost({n: 4, base: 10, increaseFactor: 2})).toEqual(80)
    expect(getGeometricNCost({n: 5, base: 10, increaseFactor: 2})).toEqual(160)
    expect(getGeometricNCost({n: 6, base: 10, increaseFactor: 2})).toEqual(320)
    expect(getGeometricNCost({n: 10, base: 10, increaseFactor: 2})).toEqual(5120)
  })
  it('getGeometricCumulativeCost', () => {
    expect(getGeometricCumulativeCost({start: 0, quantity: 1, base: 10, increaseFactor: 2})).toEqual(10)
    expect(getGeometricCumulativeCost({start: 0, quantity: 2, base: 10, increaseFactor: 2})).toEqual(30)
    expect(getGeometricCumulativeCost({start: 0, quantity: 3, base: 10, increaseFactor: 2})).toEqual(70)
    expect(getGeometricCumulativeCost({start: 0, quantity: 4, base: 10, increaseFactor: 2})).toEqual(150)
  })
  it('getGeometricCumulativeCost start offset', () => {
    expect(getGeometricCumulativeCost({start: 3, quantity: 1, base: 10, increaseFactor: 2})).toEqual(80)
    expect(getGeometricCumulativeCost({start: 3, quantity: 2, base: 10, increaseFactor: 2})).toEqual(240)
    expect(getGeometricCumulativeCost({start: 3, quantity: 3, base: 10, increaseFactor: 2})).toEqual(560)
  })
})
