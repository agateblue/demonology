import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const DEFAULT_VALUES = {
  souls: 0
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
      state.current[name] += value
      state.lifetime[name] += value
      state.total[name] += value
    }
  },
  getters: {
    soulsPerClick (state) {
      return 1
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
