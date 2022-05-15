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
    state.lifetime.souls = 3
    state.total.souls = 4

    mutations.increment(state, {name: 'souls', value: 12})
    expect(state.current.souls).toEqual(14)
    expect(state.lifetime.souls).toEqual(15)
    expect(state.total.souls).toEqual(16)
  })
  it('mutation lastTick', () => {
    let state = getDefaultState()
    state.time.lastTick = 1

    mutations.lastTick(state, 4)
    expect(state.time.lastTick).toEqual(4)
  })
  it('mutation reset', () => {
    let state = getDefaultState()
    state.settings.notation = 'noop' 
    state.current.souls = 2
    state.lifetime.souls = 3
    state.total.souls = 4

    mutations.reset(state)
    expect(state.current).toEqual(getDefaultState().current)
    expect(state.lifetime).toEqual(getDefaultState().lifetime)
    expect(state.total).toEqual(getDefaultState().total)
    expect(state.settings.notation).toEqual('noop')
  })
  it('mutation hardReset', () => {
    let state = getDefaultState()
    state.settings.notation = 'noop' 
    state.current.souls = 2
    state.lifetime.souls = 3
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
    state.lifetime.minions = 2
    state.total.minions = 4
    let cost = {unit: 'souls', value: 14}

    mutations.purchase(state, {cost, quantity: 2, name: 'minions'})

    expect(state.current.minions).toEqual(2)
    expect(state.lifetime.minions).toEqual(4)
    expect(state.total.minions).toEqual(6)

    expect(state.current.souls).toEqual(18)
  })
  it('mutation purchase too expensive', () => {
    let state = getDefaultState()
    state.current.minions = 0
    state.current.souls = 32
    state.lifetime.minions = 2
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
    state.lifetime.upgrades = ['noop1', 'noop2']
    state.total.upgrades = ['noop1', 'noop2', 'noop3']

    mutations.purchaseUpgrade(state, {cost: 44, id: 'noop4'})

    expect(state.current.souls).toEqual(6)
    expect(state.current.upgrades).toEqual(['noop1', 'noop4'])
    expect(state.lifetime.upgrades).toEqual(['noop1', 'noop2', 'noop4'])
    expect(state.total.upgrades).toEqual(['noop1', 'noop2', 'noop3', 'noop4'])
  })
  it('mutation purchaseUpgrade too expensive', () => {
    let state = getDefaultState()
    state.current.souls = 10
    state.current.upgrades = ['noop1']
    state.lifetime.upgrades = ['noop1', 'noop2']
    state.total.upgrades = ['noop1', 'noop2', 'noop3']

    mutations.purchaseUpgrade(state, {cost: 44, id: 'noop4'})

    expect(state.current.souls).toEqual(10)
    expect(state.current.upgrades).toEqual(['noop1'])
    expect(state.lifetime.upgrades).toEqual(['noop1', 'noop2'])
    expect(state.total.upgrades).toEqual(['noop1', 'noop2', 'noop3'])
  })
  it('mutation purchaseUpgrade skips already purchased', () => {
    let state = getDefaultState()
    state.current.souls = 50
    state.current.upgrades = ['noop1']
    state.lifetime.upgrades = ['noop1', 'noop2']
    state.total.upgrades = ['noop1', 'noop2', 'noop3']

    mutations.purchaseUpgrade(state, {cost: 44, id: 'noop1'})

    expect(state.current.souls).toEqual(50)
    expect(state.current.upgrades).toEqual(['noop1'])
    expect(state.lifetime.upgrades).toEqual(['noop1', 'noop2'])
    expect(state.total.upgrades).toEqual(['noop1', 'noop2', 'noop3'])
  })
  it('mutation setFromDebug', () => {
    let state = getDefaultState()
    state.lifetime.souls = 50

    mutations.setFromDebug(state, {namespace: 'lifetime', name: 'souls', value: 2})

    expect(state.lifetime.souls).toEqual(2)
  })
  it('actions tick no occultists', () => {
    let commit = jest.fn()
    let state = getDefaultState()
    let values = {
      'occultists.perTick': 12,
      'tick.duration': 1000,
    }
    let getters = {values: fakeValues(values)}
    state.time.lastTick = 0
    let to = state.time.lastTick + 5000
    actions.tick({commit, getters, state}, to)

    expect(commit.mock.calls[0]).toEqual(
      ['increment', {name: 'souls', value: 5 * values['occultists.perTick']}]
    )
    expect(commit.mock.calls[1]).toEqual(['lastTick', to])
  })
})
