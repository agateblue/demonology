import { computed } from 'vue'

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

export function getArithmeticNCost ({n, base, increaseFactor}) {
  return base + ((n - 1) * increaseFactor)
}
export function getArithmeticCumulativeCost ({start, quantity, base, increaseFactor}) {
  let maxCost = getArithmeticNCost({n: start + quantity, base, increaseFactor})
  if (start === 0) {
    return (quantity * (base + maxCost)) / 2
  }
  let previousCost = getArithmeticNCost({
    n: start + 1,
    base,
    increaseFactor
  }) 
  return ((quantity) * (previousCost + maxCost)) / 2
}

export function getGeometricNCost ({n, base, increaseFactor}) {
  return base * (increaseFactor ** (n - 1))
}

export function getGeometricCumulativeCost ({start, quantity, base, increaseFactor}) {
  if (start === 0) {
    return base * (increaseFactor ** (start + quantity) - 1) / (increaseFactor - 1)
  }
  let previousCost = getGeometricNCost({n: start, base, increaseFactor})
  return getGeometricCumulativeCost({
    start: 0,
    base: previousCost * increaseFactor,
    quantity: quantity,
    increaseFactor
  })
}

export function* getBuyableUpgrades(availableUpgrades, availableSouls) {
  let remaining = availableSouls
  for (const upgrade of availableUpgrades) {
    if (upgrade.cost <= remaining) {
      yield upgrade
      remaining -= upgrade.cost
    }
  }
}


export const DEFAULT_VALUES = {
  hunts: 0,
  souls: 0,
  minions: 0,
  occultists: 0,
  upgrades: [],
}

function has(value, prefix, unit) {
  return ({state}) => { return state[prefix][unit] >= value}
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
  {
    text: [
      'A new ambition eats your core:',
      "Your nightmares need an open door"
    ],
    condition ({get, state}) {
      return state.lifetime.occultists === 0 && state.current.minions >= get("occultists.cost")
    }
  },
  {
    text: [
      'Two worlds flow into each other',
      'Hundreds of souls roam the ether'
    ],
    condition ({state}) {
      return state.lifetime.occultists > 0
    }
  },
  {
    text: [
      "Your plans shall bind a thousand slaves",
      "Your wrath shall fill a million graves",
    ],
    condition ({get}) {
      return get('hunt.power') >= 1e3 || get('occultists.perTick') >= 1e6
    }
  },

  // placeholder for endgame
  {
    text: [
      "The meaning fades, Subjugator",
      "Maybe you should come back later",
    ],
    condition ({state}) {
      return state.lifetime.souls >= 1e8
    }
  },
]


export const UPGRADES = sortBy([
  {
    id: "minions.power.1",
    name: "Fangs",
    description: "Increase minion power by ${value}",
    available: has(1, 'lifetime', 'minions'),
    affects: {
      'minions.basePower': additive,
    },
    cost: 100,
    value: 1,
  },
  {
    id: "minions.power.2",
    name: "Horns",
    description: "Increase minion power by ${value}",
    available: has(5, 'lifetime', 'minions'),
    affects: {
      'minions.basePower': additive,
    },
    cost: 1000,
    value: 2,
  },
  {
    id: "minions.power.3",
    name: "Claws",
    description: "Increase minion power by ${value}",
    available: has(10, 'lifetime', 'minions'),
    affects: {
      'minions.basePower': additive,
    },
    cost: 5000,
    value: 3,
  },
  {
    id: "minions.power.4",
    name: "Tails",
    description: "Increase minion power by ${value}",
    available: has(20, 'lifetime', 'minions'),
    affects: {
      'minions.basePower': additive,
    },
    cost: 25000,
    value: 5,
  },
  {
    id: "minions.power.5",
    name: "Wings",
    description: "Increase minion power by ${value}",
    available: has(50, 'lifetime', 'minions'),
    affects: {
      'minions.basePower': additive,
    },
    cost: 125000,
    value: 10,
  },
  {
    id: "hunt.power.1",
    name: "Hounds",
    description: "Increase hunt power by ${value}",
    available: has(20, 'lifetime', 'hunts'),
    affects: {
      'hunt.power': multiplier,
    },
    cost: 200,
    value: 1.25,
    valueFormat: '%',
  },
  {
    id: "hunt.power.2",
    name: "Demonic olfaction",
    description: "Increase hunt power by ${value}",
    available: has(50, 'lifetime', 'hunts'),
    affects: {
      'hunt.power': multiplier,
    },
    cost: 1000,
    value: 1.50,
    valueFormat: '%',
  },
  {
    id: "hunt.power.3",
    name: "Silent orders",
    description: "Increase hunt power by ${value}",
    available: has(100, 'lifetime', 'hunts'),
    affects: {
      'hunt.power': multiplier,
    },
    cost: 10000,
    value: 2,
    valueFormat: '%',
  },
  {
    id: "occultists.power.1",
    name: "Hidden signs",
    description: "Increase occultists power by ${value}",
    available: has(1, 'lifetime', 'occultists'),
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 7500,
    value: 1.25,
    valueFormat: '%'
  },
  {
    id: "occultists.power.2",
    name: "Dark rituals",
    description: "Increase occultists power by ${value}",
    available: has(2, 'lifetime', 'occultists'),
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 50000,
    value: 1.25,
    valueFormat: '%'
  },
  {
    id: "occultists.power.3",
    name: "Secret gathering",
    description: "Increase occultists power by ${value}",
    available: has(3, 'lifetime', 'occultists'),
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 3e5,
    value: 2,
    valueFormat: '%'
  },
  {
    id: "occultists.synergy.1",
    name: "Moral support",
    description: "Each one of your occultists multiply your minions power by ${value}",
    available: has(4, 'lifetime', 'occultists'),
    affects: {
      'minions.basePower': ({state, value, modifierValue}) => {
        return value * (modifierValue ** state.current.occultists)
      }
    },
    cost: 5e5,
    value: 'occultists.synergyPower',
    valueFormat: '%'
  },
  {
    id: "occultists.power.4",
    name: "Demonic lore",
    description: "Increase occultists power by ${value}",
    available: has(5, 'lifetime', 'occultists'),
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 2e6,
    value: 1.5,
    valueFormat: '%'
  },
], ['cost'])


export function getComputedValue (v, values) {
  if (typeof v === 'string') {
    if (typeof values === 'function') {
      return values(v)
    }
    return values[v]
  }
  return v
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
export function getValueGetter(state) {

  let values = {}

  function get(key, applyModifiers = true) {
    let v = values[key].value
    if (key === 'upgrades.active') {
      // performance optimization
      // we now this key doesn't need any modifier
      return v
    }
    let activeUpgrades = get('upgrades.active')

    let affectedValues = groupByAffectedValue(activeUpgrades)

    if (!applyModifiers) {
      return v
    }
    for (const {modifier, modifierValue} of affectedValues[key] || []) {
      v = modifier({value: v, modifierValue: getComputedValue(modifierValue, get), state})
    }
    return v
  }

  let config = {
    'hunt.basePower': () => {return 1},
    'hunt.power': () => {
      return get("hunt.basePower") + get('minions.power.total')
    },

    'minions.baseCost': () => {return 10},
    'minions.costIncreaseFactor': () => {return 1.1},
    'minions.basePower': () => {return 1},
    'minions.enabled': () => {
      return state.total.souls >= get('minions.baseCost')
    },
    'minions.cost': () => {
      return (state.lifetime.minions + 1) * get('minions.baseCost')
    },
    'minions.costGetter': () => {
      return (quantity) => {
        let cost = getGeometricCumulativeCost({
          start: state.current.minions,
          base: get('minions.baseCost'),
          increaseFactor: get('minions.costIncreaseFactor'),
          quantity,
        })
        return {value: parseInt(cost), unit: 'souls'}
      }
    },
    'minions.power': () => {
      return get('minions.basePower')
    },
    'minions.power.total': () => {
      return get('minions.power') * state.current.minions
    },

    'occultists.baseCost': () => {return 30},
    'occultists.costIncreaseFactor': () => {return 1.3},
    'occultists.basePower': () => {return 0.5},
    'occultists.synergyPower': () => {return 1.1},
    'occultists.enabled': () => {
      return state.total.minions >= get('occultists.baseCost')
    },
    'occultists.cost': () => {
      return (state.lifetime.occultists + 1) * get('occultists.baseCost')
    },
    'occultists.costGetter': () => {
      return (quantity) => {
        let cost = getGeometricCumulativeCost({
          start: state.lifetime.occultists,
          base: get('occultists.baseCost'),
          increaseFactor: get('occultists.costIncreaseFactor'),
          quantity,
        })
        return {value: parseInt(cost), unit: 'minions'}
      }
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
      return UPGRADES.filter((u) => {
        return state.current.upgrades.indexOf(u.id) > -1
      }) 
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

  return get
}