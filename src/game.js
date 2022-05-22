import { computed } from 'vue'

import sortBy from 'lodash/sortBy'



export function additive ({value, modifierValue}) {
  return value + modifierValue
}

export function multiplier ({value, modifierValue}) {
  return value * modifierValue
}

export function getBaseLog(x, y) {
  return Math.log(x) / Math.log(y);
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
export function getGeometricMaxBuyable ({start, available, base, increaseFactor}) {
  // from https://blog.kongregate.com/the-math-of-idle-games-part-i/
  let basePrice = base
  let expo = increaseFactor
  let unitsOwned = start
  let topHalf = available * (expo - 1)
  let bottomHalf = (expo ** unitsOwned) * basePrice
  let step = topHalf / bottomHalf + 1
  let logged = Math.log(step) / Math.log(expo)
  let maxBuys = Math.floor(logged)

  return maxBuys
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
  prey: 7.8e9,
  hunted: 0,
  awakenings: 0,
  harvests: 0,
  pain: 0,
  evil: 0,
  upgrades: [],
  name: null,
}

export function getDefaultValues({evilPower, currentPrey = 0}) {
  let v = {...DEFAULT_VALUES}
  v.prey = Math.max(v.prey * evilPower, currentPrey)
  return v
}

function has(value, prefix, unit) {
  return ({state}) => { return state[prefix][unit] >= value}
}
function all (...conditions) {
  return ({state}) => {
    for (const condition of conditions) {
      if (!condition({state})) {
        return false
      }
    }
    return true
  }
}

function is (name) {
  return ({state}) => { return state.current.name === name}
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
      return state.awakening.minions === 0 && state.current.souls >= get("minions.cost")
    }
  },
  {
    text: [
      "Your armies advance, relentless",
      "Gathering souls in the process",
    ],
    condition ({state}) {
      return state.awakening.minions > 0
    }
  },
  {
    text: [
      'A new ambition eats your core:',
      "Your nightmares need an open door"
    ],
    condition ({get, state}) {
      return state.awakening.occultists === 0 && state.current.minions >= get("occultists.cost")
    }
  },
  {
    text: [
      'Two worlds flow into each other',
      'Hundreds of souls roam the ether'
    ],
    condition ({state}) {
      return state.awakening.occultists > 0
    }
  },
  {
    text: [
      "Your plans shall bind a thousand slaves",
      "Your wrath shall fill a million graves",
    ],
    condition ({state}) {
      return state.total.souls >= 1e6
    }
  },
  {
    text: [
      "Maybe you are going to fast?",
      "Very soon, you will kill the last",
    ],
    condition ({state}) {
      return state.total.souls >= 1.5e7
    }
  },
  {
    text: [
      "Here you are, all alone",
      "Something needs to be done",
    ],
    condition ({state}) {
      return state.current.prey === 0
    }
  },
  {
    text: [
      "You wake up stronger than ever",
      "The world is ripe to start over",
    ],
    condition ({state}) {
      return state.total.awakenings > 0
    }
  },
  {
    text: [
      "Far from this world, beyond this realm",
      "Another place to overwhelm",
    ],
    condition ({get}) {
      return get('evil.buyMaxGetter')() > 0
    }
  },
  {
    text: [
      "You have found a new dimension",
      "You can engulf in dementia",
    ],
    condition ({state}) {
      return state.total.harvests > 0
    }
  },

  // placeholder for endgame
  {
    text: [
      "The meaning fades, Subjugator",
      "Maybe you should come back later",
    ],
    condition ({state}) {
      return state.awakening.souls >= 1e10
    }
  },
]


export const UPGRADES = sortBy([
  {
    id: "minions.power.1",
    name: "Fangs",
    description: "Increase minion power by ${value}",
    available: has(1, 'awakening', 'minions'),
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
    available: has(5, 'awakening', 'minions'),
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
    available: has(10, 'awakening', 'minions'),
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
    available: has(20, 'awakening', 'minions'),
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
    available: has(50, 'awakening', 'minions'),
    affects: {
      'minions.basePower': additive,
    },
    cost: 125000,
    value: 10,
  },
  {
    id: "minions.power.6",
    name: "Tentacles",
    description: "Increase minion power by ${value}",
    available: has(500, 'awakening', 'minions'),
    affects: {
      'minions.basePower': multiplier,
    },
    cost: 3e7,
    value: 2,
    valueFormat: '%'
  },
  {
    id: "minions.power.7",
    name: "Critical mess",
    description: "Each minion increase your minions power by ${value} (multiplicative)",
    available: has(666, 'awakening', 'minions'),
    affects: {
      'minions.basePower': ({state, value, modifierValue}) => {
        return value * (modifierValue ** state.current.minions)
      }
    },
    cost: 3e8,
    value: 1.015,
    valueFormat: '%'
  },
  {
    id: "hunt.power.1",
    name: "Hounds",
    description: "Increase hunt power by ${value}",
    available: has(20, 'total', 'hunts'),
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
    available: has(50, 'total', 'hunts'),
    affects: {
      'hunt.power': multiplier,
    },
    cost: 1000,
    value: 1.50,
    valueFormat: '%',
  },
  {
    id: "occultists.power.1",
    name: "Hidden signs",
    description: "Increase occultists power by ${value}",
    available: has(1, 'awakening', 'occultists'),
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
    available: has(2, 'awakening', 'occultists'),
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
    available: has(3, 'awakening', 'occultists'),
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 3e5,
    value: 2,
    valueFormat: '%'
  },
  {
    id: "occultists.power.4",
    name: "Demonic lore",
    description: "Increase occultists power by ${value}",
    available: has(5, 'awakening', 'occultists'),
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 2e6,
    value: 1.5,
    valueFormat: '%'
  },
  {
    id: "occultists.power.5",
    name: "Blood runes",
    description: "Increase occultists power by ${value}",
    available: has(7, 'awakening', 'occultists'),
    affects: {
      'occultists.basePower': multiplier
    },
    cost: 1e8,
    value: 2,
    valueFormat: '%'
  },
  {
    id: "occultists.synergy.1",
    name: "Immoral support",
    description: "Each one of your occultists multiply your minions power by ${value}",
    available: has(4, 'awakening', 'occultists'),
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
    id: "occultists.synergy.2",
    name: "Demonic gates",
    description: "Increase Immoral support power by ${value}",
    available: has(6, 'awakening', 'occultists'),
    affects: {
      'occultists.synergyPower': multiplier
    },
    cost: 5e6,
    value: 1.5,
    valueFormat: '%'
  },
  //  upgrades related to names
  {
    id: "predator.power.1",
    name: "Venom",
    description: "Increase hunt power by ${value}",
    available: all(
      is('predator'),
      has(1e5, 'awakening', 'hunted'),
    ),
    affects: {
      'hunt.power': multiplier,
    },
    cost: 1e5,
    value: 3,
    valueFormat: '%',
  },
  {
    id: "predator.power.2",
    name: "Mind traps",
    description: "Increase hunt power by ${value}",
    available: all(
      is('predator'),
      has(1e6, 'awakening', 'hunted'),
    ),
    affects: {
      'hunt.power': multiplier,
    },
    cost: 1e6,
    value: 3,
    valueFormat: '%',
  },
  {
    id: "predator.power.3",
    name: "Frenzy",
    description: "Increase hunt power based on your total hunted prey",
    available: all(
      is('predator'),
      has(1e6, 'total', 'hunted'),
    ),
    affects: {
      'hunt.power': ({value, modifierValue, state}) => {
        let multiplier = getBaseLog(state.total.hunted, modifierValue)
        return value * multiplier
      }
    },
    cost: 1e7,
    value: 100,
    valueFormat: '%',
  },
  {
    id: "controller.society.1",
    name: "Fear",
    description: "Increase occultists power by ${value}",
    available: all(
      is('controller'),
      has(3, 'awakening', 'occultists'),
    ),
    affects: {
      'occultists.power': multiplier,
    },
    cost: 1e5,
    value: 2,
    valueFormat: '%',
  },
  {
    id: "controller.society.2",
    name: "Faith",
    description: "Increase occultists power by ${value}",
    available: all(
      is('controller'),
      has(4, 'awakening', 'occultists'),
    ),
    affects: {
      'occultists.power': multiplier,
    },
    cost: 1e6,
    value: 2,
    valueFormat: '%',
  },
  {
    id: "controller.society.3",
    name: "Sacrifices",
    description: "Increase occultists power by ${value}",
    available: all(
      is('controller'),
      has(5, 'awakening', 'occultists'),
    ),
    affects: {
      'occultists.power': multiplier,
    },
    cost: 5e6,
    value: 3,
    valueFormat: '%',
  },
  {
    id: "controller.society.4",
    name: "Breeding",
    description: "Encourage breeding among your prey, increasing their number by ${value} per second",
    available: all(
      is('controller'),
    ),
    affects: {
      'prey.breedingRate': additive,
    },
    cost: 5e7,
    value: 0.001,
    valueFormat: 'raw%',
  },
  {
    id: "controller.society.5",
    name: "Gender",
    description: "Increased the amount of pain generated by your occultists by ${value} per second",
    available: all(
      is('controller'),
    ),
    affects: {
      'occultists.painRatio': additive,
    },
    cost: 1e8,
    value: 0.005,
    valueFormat: 'raw%',
  },
], ['cost'])



export const NAMES = [
  {
    id: "predator",
    name: "Tröm",
    title: "the Predator",
    perks: [
      'Unlocks pain',
      'Boost your hunt power',
      'Active gameplay',
    ]
  },
  // {
  //   id: "commander",
  //   name: "Marud",
  //   title: "the Commander",
  //   perks: [
  //     'Unlocks pain',
  //     'Unlocks options to improve your legion',
  //     'Mixed gameplay',
  //   ]
  // },
  {
    id: "controller",
    name: "Likron",
    title: "the Controller",
    perks: [
      'Unlocks pain',
      'Govern your prey',
      'Idle gameplay',
    ]
  },
]

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
    'evil.baseCost': () => {return 1e6},
    'evil.costIncreaseFactor': () => {return 1.2},
    'evil.basePower': () => {return 1},
    'evil.power': () => {
      return (1 + state.total.evil) * get('evil.basePower')
    },
    'evil.buyMaxGetter': () => {
      return () => {
        let buyable = getGeometricMaxBuyable({
          start: state.total.evil,
          base: get('evil.baseCost'),
          increaseFactor: get('evil.costIncreaseFactor'),
          available: parseInt(state.harvest.pain)
        })
        return buyable
      }
    },
    'evil.enabled': () => {
      return state.total.evil > 0 || get('evil.buyMaxGetter')() > 0
    },
    'hunt.basePower': () => {return 1 * get('evil.power')},
    'hunt.power': () => {
      return get("hunt.basePower") + get('minions.power.total')
    },
    'hunt.powerToPainRatio': () => {
      return 0.01
    },
    'hunt.pain': () => {
      return get("hunt.power") * get('hunt.powerToPainRatio')
    },
    'minions.baseCost': () => {return 10},
    'minions.costIncreaseFactor': () => {return 1.1},
    'minions.basePower': () => {return 1 * get('evil.power')},
    'minions.enabled': () => {
      return state.total.awakenings > 0 || state.total.souls >= get('minions.baseCost')
    },
    'minions.cost': () => {
      return (state.awakening.minions + 1) * get('minions.baseCost')
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
    'minions.buyMaxGetter': () => {
      return () => {

        let buyable = getGeometricMaxBuyable({
          start: state.current.minions,
          base: get('minions.baseCost'),
          increaseFactor: get('minions.costIncreaseFactor'),
          available: parseInt(state.current.souls)
        })
        return buyable
      }
    },
    'minions.power': () => {
      return get('minions.basePower')
    },
    'minions.power.total': () => {
      return get('minions.power') * state.current.minions
    },

    'names.available': () => {
      if (state.harvest.awakenings > 0) {
        return NAMES
      }
      return []
    },
    'names.current': () => {
      return NAMES.filter((n) => {
        return n.id === state.current.name
      })[0]
    },

    'occultists.baseCost': () => {return 30},
    'occultists.costIncreaseFactor': () => {return 1.3},
    'occultists.basePower': () => {return 0.5},
    'occultists.synergyPower': () => {return 1.1},
    'occultists.enabled': () => {
      return state.total.awakenings > 0 || state.total.minions >= get('occultists.baseCost')
    },
    'occultists.cost': () => {
      return (state.awakening.occultists + 1) * get('occultists.baseCost')
    },
    'occultists.costGetter': () => {
      return (quantity) => {
        let cost = getGeometricCumulativeCost({
          start: state.awakening.occultists,
          base: get('occultists.baseCost'),
          increaseFactor: get('occultists.costIncreaseFactor'),
          quantity,
        })
        return {value: parseInt(cost), unit: 'minions'}
      }
    },
    'occultists.buyMaxGetter': () => {
      return () => {

        let buyable = getGeometricMaxBuyable({
          start: state.current.occultists,
          base: get('occultists.baseCost'),
          increaseFactor: get('occultists.costIncreaseFactor'),
          available: parseInt(state.current.minions)
        })
        return buyable
      }
    },
    'occultists.soulsPerTick': () => {
      return get('minions.power.total') * state.current.occultists * get('occultists.basePower')
    },
    'occultists.painRatio': () => {
      return 0.0005
    },
    'occultists.painPerTick': () => {
      return get('occultists.soulsPerTick') * get('occultists.painRatio')
    },
    'prey.enabled': () => {
      return state.total.awakenings > 0 || state.total.souls >= 1.5e7
    },
    'prey.breedingRate': () => {
      return 0
    },
    'pain.enabled': () => {
      return state.harvest.awakenings > 0
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
      if (state.total.awakenings > 0) {
        return true
      }
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
        return state.current.upgrades.indexOf(u.id) < 0 && state.awakening.souls >= u.cost
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