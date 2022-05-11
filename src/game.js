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
function hasMinions ({state}) {
  return state.current.minions > 0
}
function hasOccultists ({state}) {
  return state.current.occultists > 0
}

export const PROMPTS = [
  {
    text: [
      'The sky is void, the earth is grey',
      'You crave the body of a prey',
    ],
    condition ({state}) {
      return state.total.souls === 0
    }
  },
  {
    text: [
      'In a motion, you kill your first',
      'A soul remains, so does your thirst',
    ],
    condition ({state}) {
      return state.total.souls === 1
    }
  },
  {
    text: [
      'You move around, spreading your doom',
      'You find a whole world to consume',
    ],
    condition ({state}) {
      return state.total.souls > 1
    }
  },
  {
    text: [
      'A prey stays still, soon a minion',
      'Witness the birth of your legion',
    ],
    condition ({get, state}) {
      return state.lifetime.minions === 0 && state.current.souls >= get("minions.cost")
    }
  },
  {
    text: [
      "Your armies advance, relentless",
      "Gathering souls in the process",
    ],
    condition ({state}) {
      return state.lifetime.minions > 0
    }
  },
]


export const UPGRADES = sortBy([
  {
    id: "minions.power.1",
    name: "Fangs",
    description: "Increase minion power by ${value}",
    available: hasMinions,
    affects: {
      'minions.basePower': additive,
    },
    cost: 50,
    value: 1,
  },
  {
    id: "minions.power.2",
    name: "Horns",
    description: "Increase minion power by ${value}",
    available: hasMinions,
    affects: {
      'minions.basePower': additive,
    },
    cost: 75,
    value: 2,
  },
  {
    id: "minions.power.3",
    name: "Claws",
    description: "Increase minion power by ${value}",
    available: hasMinions,
    affects: {
      'minions.basePower': additive,
    },
    cost: 150,
    value: 3,
  },
  {
    id: "clicks.lifetime.1",
    name: "Disturbing presence",
    description: "Improve power based on the number of hunts during this lifetime",
    affects: {
      'hunt.power': ({value, state}) => {
        if (state.lifetime.clicks > 0) {
          return value + Math.log(state.lifetime.clicks)
        }
        return value
      },
    },
    cost: 250,
    value: null,
  },
  {
    id: "occultists.power.1",
    name: "Hidden signs",
    description: "Increase occultists power by ${value}",
    available: hasOccultists,
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 500,
    value: 1.25,
    valueFormat: '%'
  },
  {
    id: "occultists.power.2",
    name: "Dark rituals",
    description: "Increase occultists power by ${value}",
    available: hasOccultists,
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 1000,
    value: 1.25,
    valueFormat: '%'
  },
  {
    id: "occultists.power.3",
    name: "Secret gathering",
    description: "Increase occultists power by ${value}",
    available: hasOccultists,
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 2000,
    value: 2,
    valueFormat: '%'
  },
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
    'hunt.basePower': () => {return 1},
    'hunt.power': () => {
      return get("hunt.basePower") + get('minions.power.total')
    },

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
    'occultists.perTick': () => {
      return get('minions.power.total') * state.current.occultists * get('occultists.basePower')
    },
    'prompts.available': () => {
      return PROMPTS.filter(p => {
        return p.condition({state, get})
      })
    },
    'prompts.current': () => {
      let a = get('prompts.available')
      return a[a.length - 1]
    },
    // in milliseconds
    'tick.duration': () => {return 1000}, 
  
    'upgrades.active': () => {
      return activeUpgrades
    },
    'upgrades.enabled': () => {
      if (state.current.upgrades.length > 0) {
        return true
      }
      let available = get('upgrades.available')
      if (available.length === 0) {
        return false
      }
      return state.total.souls >= available[0].cost
    },
    'upgrades.available': () => {
      let upgrades = UPGRADES.filter((u) => {
        return state.current.upgrades.indexOf(u.id) < 0 && state.total.souls >= u.cost
      })
      return upgrades.filter((u) => {
        if (!u.available) {
          return u
        }
        return u.available({state, get})
      })
    },
  }

  for (const [key, value] of Object.entries(config)) {
    values[key] = computed(value)
  }

  return {values, get}
}