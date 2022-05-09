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
  upgrades: [],
}

export const CONSTANTS = {
  'minions.baseCost': 15,
  'minions.basePower': 1,
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
    id: "minions.hunt.1",
    name: "Hounds",
    description: "Send your minions hunting, giving you ${value}% of your souls extraction value every second",
    modifier: additiveUpgrade,
    cost: 100,
    value: 0.3,
    valueFormatter: (v) => {return v * 100}
  },
  {
    id: "minions.hunt.2",
    name: "Nets",
    description: "Hunting improved by ${value}% (additive)",
    modifier: additiveUpgrade,
    cost: 150,
    value: 0.2,
    valueFormatter: (v) => {return v * 100}
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
  ) + (state.current.minions * applyUpgrades(
    CONSTANTS['minions.basePower'],
    state,
    filterUpgrades(activeUpgrades, 'minions.power.'),
  ))
}

const VALUES_COMPUTER = {
  'souls.perClick': (state, activeUpgrades) => {
    return getSoulsPerClick(state, activeUpgrades)
  },
  'souls.perTick': (state, activeUpgrades) => {
    let buff = applyUpgrades(
      0,
      state,
      filterUpgrades(activeUpgrades, 'minions.hunt.'),
    )
    return getSoulsPerClick(state, activeUpgrades) * (0 + buff)
  },
  'minions.enabled': (state) => {
    return state.total.souls >= CONSTANTS['minions.baseCost']
  },
  'minions.cost': (state) => {
    return (state.lifetime.minions + 1) * CONSTANTS['minions.baseCost']
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
export default createStore({
  state: {
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
    }
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
        settings: state.total,
        time: state.time,
      }),
    }).plugin
  ]
})
