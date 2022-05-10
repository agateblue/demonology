import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import sortBy from 'lodash/sortBy'


function additiveUpgrade (initialValue, upgradeValue, state) {
  return initialValue + upgradeValue
}

function applyUpgrades (initialValue, state, upgrades) {
  let v = initialValue
  upgrades.forEach(upgrade => {
    v = upgrade.modifier(v, upgrade.value, state)
  })
  return v
}

function filterUpgrades (upgrades, match) {
  return upgrades.filter(u => {
    return u.id.startsWith(match)
  })
}

export const DEFAULT_VALUES = {
  clicks: 0,
  souls: 0,
  minions: 0,
  occultists: 0,
  upgrades: [],
}

export const CONSTANTS = {
  'minions.baseCost': 15,
  'minions.basePower': 1,
  'occultists.baseCost': 10,
  'occultists.basePower': 1,
  'tick.duration': 1000,  // in milliseconds
}

const UPGRADES = sortBy([
  {
    id: "minions.power.1",
    name: "Fangs",
    description: "Increase minion bonus to souls extraction by ${value}",
    modifier: additiveUpgrade,
    cost: 50,
    value: 1,
  },
  {
    id: "minions.power.2",
    name: "Horns",
    description: "Increase minion bonus to souls extraction by ${value}",
    modifier: additiveUpgrade,
    cost: 75,
    value: 2,
  },
  {
    id: "clicks.lifetime.1",
    name: "Disturbing presence",
    description: "Increase souls extraction based on manual soul extractions during this lifetime",
    modifier: (initialValue, upgradeValue, state) => {
      if (state.lifetime.clicks > 0) {
        return initialValue + Math.log(state.lifetime.clicks)
      }
      return initialValue
    },
    cost: 250,
    value: null,
  },
], ['cost'])

function getSoulsPerClick(state, activeUpgrades) {
  return 1 + applyUpgrades(
    0,
    state,
    filterUpgrades(activeUpgrades, 'clicks.lifetime.'),
  ) + (state.current.minions * getMinionPower(state, activeUpgrades))
}

function getMinionPower(state, activeUpgrades) {
  return applyUpgrades(
    CONSTANTS['minions.basePower'],
    state,
    filterUpgrades(activeUpgrades, 'minions.power.'),
  )
}

const VALUES_COMPUTER = {
  'souls.perClick': (state, activeUpgrades) => {
    return getSoulsPerClick(state, activeUpgrades)
  },
  'souls.perTick': (state, activeUpgrades) => {
    let buff = applyUpgrades(
      state.current.occultists,
      state,
      filterUpgrades(activeUpgrades, 'noop.'),
    )
    return getSoulsPerClick(state, activeUpgrades) * buff
  },
  'minions.enabled': (state) => {
    return state.total.souls >= CONSTANTS['minions.baseCost']
  },
  'minions.power': (state, activeUpgrades) => {
    return getMinionPower(state, activeUpgrades)
  },
  'minions.cost': (state) => {
    return (state.lifetime.minions + 1) * CONSTANTS['minions.baseCost']
  },
  'occultists.enabled': (state) => {
    return state.total.minions >= CONSTANTS['occultists.baseCost']
  },
  'occultists.cost': (state) => {
    return (state.lifetime.occultists + 1) * CONSTANTS['occultists.baseCost']
  },
  'upgrades.enabled': (state) => {
    return state.total.souls >= UPGRADES[0].cost
  },
  'upgrades.available': (state) => {
    return UPGRADES.filter((u) => {
      return state.current.upgrades.indexOf(u.id) < 0 && state.total.souls >= u.cost
    })
  },
}

function inc (state, {name, value}) {
  state.current[name] += value
  state.lifetime[name] += value
  state.total[name] += value
}

function getDefaultState () {
  return {
    time: {
      gameStart: (new Date()).getTime(),
      lifetimeStart: (new Date()).getTime(),
      lastTick: (new Date()).getTime(),
    },
    current: {
      ...DEFAULT_VALUES
    },
    lifetime: {
      ...DEFAULT_VALUES
    },
    total: {
      ...DEFAULT_VALUES
    },
    settings: {
      notation: "standard",
      debug: process.env.NODE_ENV === 'development',
    }
  }
}

export default createStore({
  state: {
    ...getDefaultState()
  },
  mutations: {
    increment (state, {name, value}) {
      inc(state, {name, value})
    },
    lastTick (state, time) {
      state.time.lastTick = time
    },
    reset (state) {
      state.current = {...DEFAULT_VALUES}
      state.lifetime = {...DEFAULT_VALUES}
      state.total = {...DEFAULT_VALUES}
    },
    hardReset (state) {
      Object.assign(state, getDefaultState())
    },
    setting (state, {name, value}) {
      state.settings[name] = value
    },
    purchase (state, {name, value, cost}) {
      let available = state.current.souls
      if (available < value * cost) {
        console.warn(`Cannot purchase ${value} ${name} for ${cost}: only ${available} available`);
        return
      }
      state.current.souls -= value * cost 
      inc(state, {name, value})
    },
    purchaseUpgrade (state, {id, cost}) {
      let available = state.current.souls
      if (available < cost) {
        console.warn(`Cannot purchase upgrade ${id} for ${cost}: only ${available} available`);
        return
      }
      state.current.souls -= cost 
      state.current.upgrades.push(id)
    },
    recruitOccultist (state, {value, cost}) {
      let available = state.current.minions
      if (available < cost) {
        console.warn(`Cannot recruit occultists for ${cost}: only ${available} available`);
        return
      }
      state.current.minions -= cost 
      inc(state, {name: 'occultists', value})
    },

  },
  getters: {
    activeUpgrades (state, {id, cost}) {
      return UPGRADES.filter((u) => {
        return state.current.upgrades.indexOf(u.id) > -1
      })
    },
    values (state, getters) {
      let v = {}
      for (const [key, value] of Object.entries(VALUES_COMPUTER)) {
        v[key] = value(state, getters.activeUpgrades)
      }
      return v
    },
  },
  actions: {
    tick ({state, commit, getters}) {
      let now = (new Date()).getTime()
      let elapsed = now - state.time.lastTick
      let ticks = elapsed / CONSTANTS['tick.duration']
      if (ticks > 0) {
        if (getters.values['souls.perTick'] > 0) {
          let soulsIncome = getters.values['souls.perTick'] * ticks
          commit('increment', {name: 'souls', value: soulsIncome})
        }
      }
      commit('lastTick', now)
    }
  },
  plugins: [
    new VuexPersistence({
      reducer: (state) => ({
        current: state.current,
        lifetime: state.lifetime,
        total: state.total,
        settings: state.settings,
        time: state.time,
      }),
    }).plugin
  ]
})
