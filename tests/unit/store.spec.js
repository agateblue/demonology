import {
  mutations,
  actions,
  getDefaultState,
} from '@/store'

function fakeValues(v) {
  return (key) => {
    return v[key]
  }
}

describe('store', () => {
  it('mutation increment', () => {
    let state = getDefaultState()
    state.current.souls = 2
    state.awakening.souls = 3
    state.harvest.souls = 4
    state.total.souls = 5

    mutations.increment(state, {name: 'souls', value: 12})
    expect(state.current.souls).toEqual(14)
    expect(state.awakening.souls).toEqual(15)
    expect(state.harvest.souls).toEqual(16)
    expect(state.total.souls).toEqual(17)
  })
  it('mutation gatherSouls', () => {
    let state = getDefaultState()
    state.current.prey = 21
    state.current.souls = 0
    state.current.hunted = 2
    state.current.pain = 20
    state.awakening.souls = 3
    state.awakening.hunted = 6
    state.awakening.pain = 24
    state.harvest.souls = 1
    state.harvest.hunted = 3
    state.harvest.pain = 22
    state.total.souls = 4
    state.total.hunted = 9
    state.total.pain = 30

    mutations.gatherSouls(state, {hunts: 1, power: 10, pain: 5})
    expect(state.current.prey).toEqual(11)
    expect(state.current.souls).toEqual(10)
    expect(state.current.hunted).toEqual(12)
    expect(state.current.pain).toEqual(25)
    expect(state.awakening.souls).toEqual(13)
    expect(state.awakening.hunted).toEqual(16)
    expect(state.awakening.pain).toEqual(29)
    expect(state.harvest.souls).toEqual(11)
    expect(state.harvest.hunted).toEqual(13)
    expect(state.harvest.pain).toEqual(27)
    expect(state.total.souls).toEqual(14)
    expect(state.total.hunted).toEqual(19)
    expect(state.total.pain).toEqual(35)
  })
  it('mutation gatherSouls not hunt', () => {
    let state = getDefaultState()
    state.current.prey = 21
    state.current.souls = 0
    state.current.hunted = 2
    state.awakening.souls = 3
    state.awakening.hunted = 6
    state.harvest.souls = 1
    state.harvest.hunted = 3
    state.total.souls = 4
    state.total.hunted = 9


    mutations.gatherSouls(state, {power: 10})
    expect(state.current.prey).toEqual(11)
    expect(state.current.souls).toEqual(10)
    expect(state.current.hunted).toEqual(2)
    expect(state.awakening.souls).toEqual(13)
    expect(state.awakening.hunted).toEqual(6)
    expect(state.awakening.souls).toEqual(13)
    expect(state.awakening.hunted).toEqual(6)
    expect(state.harvest.souls).toEqual(11)
    expect(state.harvest.hunted).toEqual(3)
    expect(state.total.souls).toEqual(14)
    expect(state.total.hunted).toEqual(9)
  })
  it('mutation gatherSouls does nothing if no more prey', () => {
    let state = getDefaultState()
    state.current.prey = 0
    state.current.souls = 0
    state.current.hunted = 2
    state.awakening.souls = 3
    state.awakening.hunted = 6
    state.harvest.souls = 1
    state.harvest.hunted = 3
    state.total.souls = 4
    state.total.hunted = 9

    mutations.gatherSouls(state, {hunts: 1, power: 10})
    expect(state.current.prey).toEqual(0)
    expect(state.current.souls).toEqual(0)
    expect(state.current.hunted).toEqual(2)
    expect(state.awakening.souls).toEqual(3)
    expect(state.awakening.hunted).toEqual(6)
    expect(state.harvest.souls).toEqual(1)
    expect(state.harvest.hunted).toEqual(3)
    expect(state.total.souls).toEqual(4)
    expect(state.total.hunted).toEqual(9)
  })
  it('mutation gatherSouls as much as available', () => {
    let state = getDefaultState()
    state.current.prey = 10
    state.current.souls = 0
    state.current.pain = 20
    state.current.hunted = 2
    state.awakening.souls = 3
    state.awakening.hunted = 6
    state.awakening.pain = 24
    state.total.souls = 4
    state.harvest.souls = 1
    state.harvest.hunted = 3
    state.harvest.pain = 22
    state.total.hunted = 9
    state.total.pain = 30

    mutations.gatherSouls(state, {hunts: 1, power: 20, pain: 2})
    expect(state.current.prey).toEqual(0)
    expect(state.current.souls).toEqual(10)
    expect(state.current.hunted).toEqual(12)
    expect(state.current.pain).toEqual(21)
    expect(state.awakening.souls).toEqual(13)
    expect(state.awakening.hunted).toEqual(16)
    expect(state.awakening.pain).toEqual(25)
    expect(state.harvest.souls).toEqual(11)
    expect(state.harvest.hunted).toEqual(13)
    expect(state.harvest.pain).toEqual(23)
    expect(state.total.souls).toEqual(14)
    expect(state.total.hunted).toEqual(19)
    expect(state.total.pain).toEqual(31)
  })
  it('mutation lastTick', () => {
    let state = getDefaultState()
    state.time.lastTick = 1

    mutations.lastTick(state, 4)
    expect(state.time.lastTick).toEqual(4)
  })
  it('mutation hardReset', () => {
    let state = getDefaultState()
    state.settings.notation = 'noop' 
    state.current.souls = 2
    state.awakening.souls = 3
    state.harvest.souls = 3
    state.total.souls = 4

    mutations.hardReset(state)
    expect(state).toEqual(getDefaultState())
  })
  it('mutation setting', () => {
    let state = getDefaultState()

    mutations.setting(state, {name: 'notation', value: 'noop'})
    expect(state.settings.notation).toEqual('noop')
  })
  it('mutation purchase affordable', () => {
    let state = getDefaultState()
    state.current.minions = 0
    state.current.souls = 32
    state.awakening.minions = 2
    state.harvest.minions = 3
    state.total.minions = 4
    let cost = {unit: 'souls', value: 14}

    mutations.purchase(state, {cost, quantity: 2, name: 'minions'})

    expect(state.current.minions).toEqual(2)
    expect(state.awakening.minions).toEqual(4)
    expect(state.harvest.minions).toEqual(5)
    expect(state.total.minions).toEqual(6)

    expect(state.current.souls).toEqual(18)
  })
  it('mutation purchase too expensive', () => {
    let state = getDefaultState()
    state.current.minions = 0
    state.current.souls = 32
    state.awakening.minions = 2
    state.harvest.minions = 3
    state.total.minions = 4
    let cost = {unit: 'souls', value: 44}

    mutations.purchase(state, {cost, quantity: 2, name: 'minions'})

    expect(state.current.minions).toEqual(0)
    expect(state.current.souls).toEqual(32)
  })
  it('mutation purchaseUpgrade affordable', () => {
    let state = getDefaultState()
    state.current.souls = 50
    state.current.upgrades = ['noop1']
    state.awakening.upgrades = ['noop1', 'noop2']
    state.harvest.upgrades = ['noop1', 'noop2', 'noop3']
    state.total.upgrades = ['noop1', 'noop2', 'noop3', 'noop4']

    mutations.purchaseUpgrade(state, {cost: 44, id: 'noop5'})

    expect(state.current.souls).toEqual(6)
    expect(state.current.upgrades).toEqual(['noop1', 'noop5'])
    expect(state.awakening.upgrades).toEqual(['noop1', 'noop2', 'noop5'])
    expect(state.harvest.upgrades).toEqual(['noop1', 'noop2', 'noop3', 'noop5'])
    expect(state.total.upgrades).toEqual(['noop1', 'noop2', 'noop3', 'noop4', 'noop5'])
  })
  it('mutation purchaseUpgrade too expensive', () => {
    let state = getDefaultState()
    state.current.souls = 10
    state.current.upgrades = ['noop1']
    state.awakening.upgrades = ['noop1', 'noop2']
    state.harvest.upgrades = ['noop1', 'noop2', 'noop3']
    state.total.upgrades = ['noop1', 'noop2', 'noop3', 'noop4']

    mutations.purchaseUpgrade(state, {cost: 44, id: 'noop5'})

    expect(state.current.souls).toEqual(10)
    expect(state.current.upgrades).toEqual(['noop1'])
    expect(state.awakening.upgrades).toEqual(['noop1', 'noop2'])
    expect(state.harvest.upgrades).toEqual(['noop1', 'noop2', 'noop3'])
    expect(state.total.upgrades).toEqual(['noop1', 'noop2', 'noop3', 'noop4'])
  })
  it('mutation purchaseUpgrade skips already purchased', () => {
    let state = getDefaultState()
    state.current.souls = 50
    state.current.upgrades = ['noop1']
    state.awakening.upgrades = ['noop1', 'noop2']
    state.harvest.upgrades = ['noop1', 'noop2', 'noop3']
    state.total.upgrades = ['noop1', 'noop2', 'noop3', 'noop4']

    mutations.purchaseUpgrade(state, {cost: 44, id: 'noop1'})

    expect(state.current.souls).toEqual(50)
    expect(state.current.upgrades).toEqual(['noop1'])
    expect(state.awakening.upgrades).toEqual(['noop1', 'noop2'])
    expect(state.harvest.upgrades).toEqual(['noop1', 'noop2', 'noop3'])
    expect(state.total.upgrades).toEqual(['noop1', 'noop2', 'noop3', 'noop4'])
  })
  it('mutation setFromDebug', () => {
    let state = getDefaultState()
    state.awakening.souls = 50

    mutations.setFromDebug(state, {namespace: 'awakening', name: 'souls', value: 2})

    expect(state.awakening.souls).toEqual(2)
  })
  it('mutation setFromDebug increase affects higher namespaces', () => {
    let state = getDefaultState()
    state.current.souls = 50
    state.awakening.souls = 70
    state.harvest.souls = 80
    state.total.souls = 90

    mutations.setFromDebug(state, {namespace: 'current', name: 'souls', value: 52})

    expect(state.current.souls).toEqual(52)
    expect(state.awakening.souls).toEqual(72)
    expect(state.harvest.souls).toEqual(82)
    expect(state.total.souls).toEqual(92)

    mutations.setFromDebug(state, {namespace: 'awakening', name: 'souls', value: 74})

    expect(state.current.souls).toEqual(52)
    expect(state.awakening.souls).toEqual(74)
    expect(state.harvest.souls).toEqual(84)
    expect(state.total.souls).toEqual(94)
    
    mutations.setFromDebug(state, {namespace: 'harvest', name: 'souls', value: 86})

    expect(state.current.souls).toEqual(52)
    expect(state.awakening.souls).toEqual(74)
    expect(state.harvest.souls).toEqual(86)
    expect(state.total.souls).toEqual(96)
    
    mutations.setFromDebug(state, {namespace: 'total', name: 'souls', value: 98})

    expect(state.current.souls).toEqual(52)
    expect(state.awakening.souls).toEqual(74)
    expect(state.harvest.souls).toEqual(86)
    expect(state.total.souls).toEqual(98)
  })
  it('mutation setFromDebug lower does not affect higher namespaces', () => {
    let state = getDefaultState()
    state.current.souls = 50
    state.awakening.souls = 70
    state.harvest.souls = 80
    state.total.souls = 90

    mutations.setFromDebug(state, {namespace: 'current', name: 'souls', value: 40})

    expect(state.current.souls).toEqual(40)
    expect(state.awakening.souls).toEqual(70)
    expect(state.harvest.souls).toEqual(80)
    expect(state.total.souls).toEqual(90)
  })
  it('mutation setUpgradeFromDebug', () => {
    let state = getDefaultState()
    state.current.upgrades = []
    state.awakening.upgrades = ['noop1']
    state.harvest.upgrades = ['noop2']
    state.total.upgrades = ['noop3']

    mutations.setUpgradeFromDebug(state, {id: 'noop0', value: true})

    expect(state.current.upgrades).toEqual(['noop0'])
    expect(state.awakening.upgrades).toEqual(['noop1', 'noop0'])
    expect(state.harvest.upgrades).toEqual(['noop2', 'noop0'])
    expect(state.total.upgrades).toEqual(['noop3', 'noop0'])

    mutations.setUpgradeFromDebug(state, {id: 'noop0', value: false})

    expect(state.current.upgrades).toEqual([])
    expect(state.awakening.upgrades).toEqual(['noop1'])
    expect(state.harvest.upgrades).toEqual(['noop2'])
    expect(state.total.upgrades).toEqual(['noop3'])

  })
  it('mutation breed', () => {
    let state = getDefaultState()
    state.current.prey = 10

    mutations.breed(state, {rate: 0.1})

    expect(state.current.prey).toEqual(11)
  })
  it('actions tick with occultists', () => {
    let commit = jest.fn()
    let state = getDefaultState()
    state.current.prey = 10
    let values = {
      'occultists.soulsPerTick': 12,
      'occultists.painPerTick': 3,
      'tick.duration': 1000,
      'pain.enabled': true,
      'prey.breedingRate': 0.1,
    }
    let getters = {values: fakeValues(values)}
    state.time.lastTick = 0
    let to = state.time.lastTick + 5000
    actions.tick({commit, getters, state}, to)

    expect(commit.mock.calls[0]).toEqual(
      ['breed', {
        rate: 0.1 * 5
      }]
    )
    expect(commit.mock.calls[1]).toEqual(
      ['gatherSouls', {
        power: 5 * values['occultists.soulsPerTick'],
        pain: 5 * values['occultists.painPerTick'],
      }]
    )
    expect(commit.mock.calls[2]).toEqual(['lastTick', to])
  })
  it('actions tick autobuy minions', () => {
    let commit = jest.fn()
    let state = getDefaultState()
    state.current.souls = 12
    let values = {
      'minions.autoBuy': true,
      'minions.costGetter': () => {return {value: 11, unit: 'souls'}},
      'minions.buyMaxGetter': () => {return 3},
      'tick.duration': 1000,
    }
    let getters = {values: fakeValues(values)}
    state.time.lastTick = 0
    let to = state.time.lastTick + 1000
    actions.tick({commit, getters, state}, to)
    expect(commit.mock.calls[0]).toEqual(
      ['purchase', {
        name: 'minions',
        quantity: 3,
        cost: {value: 11, unit: 'souls'},
      }]
    )
  })
  it('actions tick autobuy occultists and keeps a single minion', () => {
    let commit = jest.fn()
    let state = getDefaultState()
    state.settings.autoBuyoccultists = true
    state.current.minions = 12
    let values = {
      'occultists.autoBuy': true,
      'occultists.costGetter': () => {return {value: 11, unit: 'minions'}},
      'occultists.buyMaxGetter': () => {return 3},
      'tick.duration': 1000,
    }
    let getters = {values: fakeValues(values)}
    state.time.lastTick = 0
    let to = state.time.lastTick + 1000
    actions.tick({commit, getters, state}, to)
    expect(commit.mock.calls[0]).toEqual(
      ['purchase', {
        name: 'occultists',
        quantity: 3,
        cost: {value: 11, unit: 'minions'},
      }]
    )
  })
  it('mutation sleep', () => {
    let state = getDefaultState()
    state.current.souls = 5
    state.awakening.souls = 10
    state.harvest.souls = 3
    state.total.awakenings = 0
    state.total.souls = 50

    mutations.sleep(state)

    expect(state.current.souls).toEqual(0)
    expect(state.harvest.souls).toEqual(3)
    expect(state.awakening.souls).toEqual(0)
    expect(state.total.souls).toEqual(50)
    expect(state.total.awakenings).toEqual(1)
  })
  it('mutation sleep existing prey', () => {
    let state = getDefaultState()
    state.current.prey = 1e19

    mutations.sleep(state)

    expect(state.current.prey).toEqual(1e19)
  })
  it('mutation name', () => {
    let state = getDefaultState()

    mutations.name(state, 'noop1')

    expect(state.current.name).toEqual('noop1')
  })
  it('mutation harvest', () => {
    let state = getDefaultState()
    state.current.souls = 5
    state.current.name = 'noop'
    state.awakening.souls = 10
    state.harvest.souls = 3
    state.total.awakenings = 1
    state.total.evil = 12
    state.total.souls = 50
    state.total.harvests = 2

    mutations.harvest(state, {evil: 12})

    expect(state.current.souls).toEqual(0)
    expect(state.harvest.souls).toEqual(0)
    expect(state.awakening.souls).toEqual(0)
    expect(state.current.awakenings).toEqual(0)
    expect(state.harvest.awakenings).toEqual(0)
    expect(state.awakening.awakenings).toEqual(0)
    expect(state.total.souls).toEqual(50)
    expect(state.total.evil).toEqual(24)
    expect(state.total.harvests).toEqual(3)
    expect(state.current.name).toEqual(null)
  })
})
