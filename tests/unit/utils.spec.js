import {
  getArithmeticNCost,
  getArithmeticCumulativeCost,
  getGeometricNCost,
  getGeometricCumulativeCost,
  getGeometricMaxBuyable,
} from '@/game'
import {
  formatNumber,
} from '@/utils'

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
  it('getGeometricMaxBuyable', () => {
    expect(getGeometricMaxBuyable({start: 0, available: 9, base: 10, increaseFactor: 2})).toEqual(0)
    expect(getGeometricMaxBuyable({start: 0, available: 10, base: 10, increaseFactor: 2})).toEqual(1)
    expect(getGeometricMaxBuyable({start: 0, available: 30, base: 10, increaseFactor: 2})).toEqual(2)
    expect(getGeometricMaxBuyable({start: 0, available: 70, base: 10, increaseFactor: 2})).toEqual(3)
  })
  it('getGeometricMaxBuyable start offset', () => {
    expect(getGeometricMaxBuyable({start: 1, available: 10, base: 10, increaseFactor: 2})).toEqual(0)
    expect(getGeometricMaxBuyable({start: 1, available: 30, base: 10, increaseFactor: 2})).toEqual(1)
    expect(getGeometricMaxBuyable({start: 1, available: 70, base: 10, increaseFactor: 2})).toEqual(2)
    expect(getGeometricMaxBuyable({start: 2, available: 120, base: 10, increaseFactor: 2})).toEqual(2)
  })
  it('formatNumber short', () => {
    expect(formatNumber(12)).toEqual("12")
    expect(formatNumber(12.1)).toEqual("12")
    expect(formatNumber(1200)).toEqual("1,200")
  })
  it('formatNumber small number with lot of decimals', () => {
    expect(formatNumber(0.1)).toEqual("0.1000")
    expect(formatNumber(0.0001)).toEqual("0.0001")
  })
  it('formatNumber big', () => {
    expect(formatNumber(12000)).toEqual("1.20e4")
    expect(formatNumber(10000)).toEqual("1.00e4")
    expect(formatNumber(12001)).toEqual("1.20e4")
    expect(formatNumber(1e63)).toEqual("1.00e63")
  })
  it('formatNumber %', () => {
    expect(formatNumber(1.25, '%')).toEqual("25 %")
    expect(formatNumber(3, '%')).toEqual("200 %")
  })
  it('formatNumber raw%', () => {
    expect(formatNumber(0.005, 'raw%')).toEqual("0.005 %")
    expect(formatNumber(5, 'raw%')).toEqual("5 %")
  })
})
