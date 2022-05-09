import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const DEFAULT_VALUES = {
  souls: 0,
  minions: 0,
}

const CONSTANTS = {
  'minions.baseCost': 25
}
const VALUES_COMPUTER = {
  'souls.perClick': (state) => {
    return 1 + state.current.minions
  },
  'minions.enabled': (state) => {
    return state.total.souls >= CONSTANTS['minions.baseCost']
  },
  'minions.cost': (state) => {
    return (state.lifetime.minions + 1) * CONSTANTS['minions.baseCost']
  },
}

function inc (state, {name, value}) {
  state.current[name] += value
  state.lifetime[name] += value
  state.total[name] += value
}
export default createStore({
  state: {
    current: {
      ...DEFAULT_VALUES
    },
    lifetime: {
      ...DEFAULT_VALUES
    },
    total: {
      ...DEFAULT_VALUES
    }
  },
  mutations: {
    increment (state, {name, value}) {
      inc(state, {name, value})
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

  },
  getters: {
    values (state) {
      let v = {}
      for (const [key, value] of Object.entries(VALUES_COMPUTER)) {
        v[key] = value(state)
      }
      return v
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    new VuexPersistence({
      reducer: (state) => ({
        current: state.current,
        lifetime: state.lifetime,
        total: state.total,
      }),
    }).plugin
  ]
})
