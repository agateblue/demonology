import { reactive, computed } from 'vue'

import sortBy from 'lodash/sortBy'



export function additive ({value, modifierValue}) {
  return value + modifierValue
}

export function multiplier ({value, modifierValue}) {
  return value * modifierValue
}

export function filterUpgrades (upgrades, match) {
  return upgrades.filter(u => {
    return u.id.startsWith(match)
  })
}

export function multiplierFormat (value) {
  return (value - 1) * 100
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
    affects: {
      'minions.basePower': additive,
    },
    cost: 50,
    value: 1,
  },
  {
    id: "minions.power.2",
    name: "Horns",
    description: "Increase minion bonus to souls extraction by ${value}",
    affects: {
      'minions.basePower': additive,
    },
    cost: 75,
    value: 2,
  },
  {
    id: "clicks.lifetime.1",
    name: "Disturbing presence",
    description: "Increase souls extraction based on manual soul extractions during this lifetime",
    affects: {
      'souls.perClick': ({value, state}) => {
        if (state.lifetime.clicks > 0) {
          return value + Math.log(state.lifetime.clicks)
        }
        return value
      },
    },
    cost: 250,
    value: null,
  },
  // {
  //   id: "occultists.power.2",
  //   name: "Gathering",
  //   description: "Increase minion bonus to souls extraction by ${value}",
  //   modifier: additiveUpgrade,
  //   affects: {
  //     'occultists.basePower': multiplyUpgrade
  //   },
  //   cost: 500,
  //   value: 1.25,
  //   valueFormat: '%'
  // },
], ['cost'])


export function getValues (state) {
  let finalValues = {}
  let {values, get} = computedValues({
    state: reactive(state)
  })
  for (const [key] of Object.entries(values)) {
    finalValues[key] = get(key)
  }
  return finalValues
}

function groupByAffectedValue (el) {
  let u = {}
  el.forEach(e => {
    for (const [key, value] of Object.entries(e.affects || {})) {
      let existing = u[key] || []
      existing.push({modifier: value, modifierValue: e.value})
      u[key] = existing
    }
  })
  return u
}
export function computedValues({state}) {
  let activeUpgrades = UPGRADES.filter((u) => {
    return state.current.upgrades.indexOf(u.id) > -1
  }) 

  let affectedValues = groupByAffectedValue(activeUpgrades)

  let values = {}

  function get(key, applyModifiers = true) {
    let v = values[key].value
    if (!applyModifiers) {
      return v
    }
    for (const {modifier, modifierValue} of affectedValues[key] || []) {
      v = modifier({value: v, modifierValue, state})
    }
    return v
  }

  let config = {

    'minions.baseCost': () => {return 15},
    'minions.basePower': () => {return 1},
    'minions.enabled': () => {
      return state.total.souls >= get('minions.baseCost')
    },
    'minions.cost': () => {
      return (state.lifetime.minions + 1) * get('minions.baseCost')
    },
    'minions.power': () => {
      return get('minions.basePower')
    },
    'minions.power.total': () => {
      return get('minions.power') * state.current.minions
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
      return 1 + get('minions.power.total')
    },
    'souls.perTick': () => {
      return get('souls.perClick') * state.current.occultists * get('occultists.basePower')
    },
  
    // in milliseconds
    'tick.duration': () => {return 1000}, 
  
    'upgrades.active': () => {
      return activeUpgrades
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

  return {values, get}
}