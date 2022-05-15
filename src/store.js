import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import throttle from 'lodash/throttle'
import uniq from 'lodash/uniq'

import {DEFAULT_VALUES, getValueGetter} from './game'

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
      notation: "default",
      debug: process.env.NODE_ENV === 'development',
    }
  }
}

const STORE = createStore({
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
    purchase (state, {name, quantity, cost}) {
      let available = state.current[cost.unit]
      if (available < cost.value) {
        console.warn(`Cannot purchase ${quantity} ${name} for ${cost}: only ${available} available`);
        return
      }
      state.current[cost.unit] -= cost.value
      inc(state, {name, value: quantity})
    },
    purchaseUpgrade (state, {id, cost}) {
      let available = state.current.souls
      if (available < cost) {
        console.warn(`Cannot purchase upgrade ${id} for ${cost}: only ${available} available`);
        return
      }
      state.current.souls -= cost 
      state.current.upgrades = uniq([...state.current.upgrades, id])
      state.lifetime.upgrades = uniq([...state.lifetime.upgrades, id])
    },
    setFromDebug (state, {namespace, name, value}) {
      state[namespace][name] = value
    }
  },
  getters: {
    values () {
      return (key) => {return GET(key)}
    },
  },
  actions: {
    tick ({state, commit, getters}) {
      let now = (new Date()).getTime()
      let elapsed = now - state.time.lastTick
      let ticks = elapsed / getters.values('tick.duration')
      if (ticks > 0) {
        if (getters.values('occultists.perTick') > 0) {
          let soulsIncome = getters.values('occultists.perTick') * ticks
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
      saveState: throttle(
        (key, state, storage) => {
          storage[key] = JSON.stringify(state)
        }, 3000)
    }).plugin
  ]
})

const GET = getValueGetter(STORE.state)

export default STORE
