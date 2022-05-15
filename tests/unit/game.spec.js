import {
  getBuyableUpgrades,
} from '@/game'

describe('game', () => {
  it('getBuyableUpgrades', () => {
    const upgrades = [
      {id: 'noop1', cost: 10},
      {id: 'noop2', cost: 20},
      {id: 'noop3', cost: 50},
      {id: 'noop4', cost: 30},
    ]
    let buyable = [...getBuyableUpgrades(upgrades, 100)]
    expect(buyable).toEqual(upgrades.slice(0, 3))
  })
})
