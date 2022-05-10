import { reactive, computed } from 'vue'

import sortBy from 'lodash/sortBy'




export function additiveUpgrade (initialValue, upgradeValue) {
  return initialValue + upgradeValue
}

export function applyUpgrades (initialValue, state, upgrades) {
  let v = initialValue
  upgrades.forEach(upgrade => {
    v = upgrade.modifier(v, upgrade.value, state)
  })
  return v
}

export function filterUpgrades (upgrades, match) {
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

export const UPGRADES = sortBy([
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


export function getValues (state) {
  let values = {}
  let computed = computedValues({
    state: reactive(state)
  })
  for (const [key, value] of Object.entries(computed)) {
    values[key] = value.value
  }
  return values
}

export function computedValues({state}) {
  let values = {}

  function get(key) {
    return values[key].value
  }

  let config = {

    'minions.baseCost': () => {return 15},
    'minions.basePower': () => {return 1},
    'minions.enabled': () => {
      return state.total.souls >= CONSTANTS['minions.baseCost']
    },
    'minions.power.total': () => {
      return get('minions.basePower') * state.current.minions
    },
    'minions.cost': () => {
      return (state.lifetime.minions + 1) * get('minions.baseCost')
    },
    'minions.power': () => {
      return applyUpgrades(
        get('minions.basePower'),
        state,
        filterUpgrades(get('upgrades.active'), 'minions.power.'),
      )
    },

    'occultists.baseCost': () => {return 10},
    'occultists.basePower': () => {return 1},
    'occultists.enabled': () => {
      return state.total.minions >= get('occultists.baseCost')
    },
    'occultists.cost': () => {
      return (state.lifetime.occultists + 1) * get('occultists.baseCost')
    },
  
    'souls.perClick': () => {
      return 1 + applyUpgrades(
        0,
        state,
        filterUpgrades(get('upgrades.active'), 'clicks.lifetime.'),
      ) + (state.current.minions * get('minions.power'))
    },
    'souls.perTick': () => {
      let buff = applyUpgrades(
        state.current.occultists,
        state,
        filterUpgrades(get('upgrades.active'), 'noop.'),
      )
      return get('souls.perClick') * buff
    },
  
    // in milliseconds
    'tick.duration': () => {return 1000}, 
  
    'upgrades.active': () => {
      return UPGRADES.filter((u) => {
        return state.current.upgrades.indexOf(u.id) > -1
      }) 
    },
    'upgrades.enabled': () => {
      return state.total.souls >= UPGRADES[0].cost
    },
    'upgrades.available': () => {
      return UPGRADES.filter((u) => {
        return state.current.upgrades.indexOf(u.id) < 0 && state.total.souls >= u.cost
      })
    },
  }

  for (const [key, value] of Object.entries(config)) {
    values[key] = computed(value)
  }

  return values
}