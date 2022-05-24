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
    condition () {
      return true
    }
  },
  {
    text: [
      'In a motion, you kill your first',
      'A soul remains, so does your thirst',
    ],
    condition ({state}) {
      return state.total.souls > 0
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
      return state.total.minions > 0 || state.current.souls >= get("minions.cost")
    }
  },
  {
    text: [
      "Your armies advance, relentless",
      "Gathering souls in the process",
    ],
    condition ({state}) {
      return state.total.minions > 0
    }
  },
  {
    text: [
      'A new ambition eats your core:',
      "Your nightmares need an open door"
    ],
    condition ({get, state}) {
      return state.current.minions >= get("occultists.cost") || state.total.occultists > 0
    }
  },
  {
    text: [
      'Two worlds flow into each other',
      'Hundreds of souls roam the ether'
    ],
    condition ({state}) {
      return state.total.occultists > 0
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
      "Maybe you are going too fast?",
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
      return state.current.prey === 0 || state.total.awakenings > 0
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
    group: "Minions",
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
    group: "Minions",
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
    group: "Minions",
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
    group: "Minions",
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
    group: "Minions",
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
    group: "Minions",
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
    group: "Legion",
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
    group: "Hunt",
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
    group: "Avatar",
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
    group: "Occultists",
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
    group: "Occultists",
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
    group: "Occultists",
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
    group: "Occultists",
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
    group: "Occultists",
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
    group: "Legion",
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
    group: "Legion",
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
  {
    id: "minions.autoBuy",
    group: "Legion",
    name: "Tormentoring",
    description: "Automatically recruit new minions",
    available: all(
      has(1, 'total', 'awakenings'),
    ),
    cost: 1,
  },
  //  upgrades related to names
  {
    id: "predator.power.1",
    group: "Avatar",
    name: "Venom",
    description: "Increase hunt power by ${value}",
    available: all(
      is('predator'),
      has(10, 'awakening', 'hunted'),
    ),
    affects: {
      'hunt.power': multiplier,
    },
    cost: 1e2,
    value: 3,
    valueFormat: '%',
  },
  {
    id: "predator.power.2",
    group: "Avatar",
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
    group: "Avatar",
    name: "Avatar · Frenzy",
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
    id: "occultists.autoBuy",
    group: "Legion",
    name: "Crash curse",
    description: "Automatically raise new occultists",
    available: all(
      is('controller'),
    ),
    cost: 1e3,
  },
  {
    id: "controller.society.1",
    group: "Flock civilivization",
    name: "Fear",
    description: "Increase occultists power over your flock by ${value}",
    available: all(
      is('controller'),
      has(1, 'awakening', 'occultists'),
    ),
    affects: {
      'occultists.basePower': multiplier,
    },
    cost: 1e4,
    value: 2,
    valueFormat: '%',
  },
  {
    id: "controller.society.2",
    group: "Flock civilivization",
    name: "Faith",
    description: "Increase occultists power over your flock by ${value}",
    available: all(
      is('controller'),
      has(4, 'awakening', 'occultists'),
    ),
    affects: {
      'occultists.basePower': multiplier,
    },
    cost: 1e6,
    value: 2,
    valueFormat: '%',
  },
  {
    id: "controller.society.3",
    group: "Flock civilivization",
    name: "Sacrifices",
    description: "Increase occultists power over your flock by ${value}",
    available: all(
      is('controller'),
      has(5, 'awakening', 'occultists'),
    ),
    affects: {
      'occultists.basePower': multiplier,
    },
    cost: 5e6,
    value: 3,
    valueFormat: '%',
  },
  {
    id: "controller.society.4",
    group: "Flock civilivization",
    name: "Breeding",
    description: "Encourage breeding among your flock, increasing its size by ${value} per second",
    available: all(
      is('controller'),
    ),
    affects: {
      'prey.breedingRate': additive,
    },
    cost: 5e7,
    value: 0.005,
    valueFormat: 'raw%',
  },
  {
    id: "controller.society.5",
    group: "Flock civilivization",
    name: "Gender",
    description: "Increased the amount of pain generated from your flock by ${value} per second",
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
      'Govern the flock',
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
    let v
    try {
      v = values[key].value
    } catch (e) {
      throw `${key} does not exist: ${e}`
    }
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
    'evil.power.detail': () => {
      return [
        {label: "Evil base power", value: get('evil.basePower') + 1, notation: '%'},
        {prefix: "×", label: "Evil points", value: state.total.evil},
        {prefix: "=", label: "Evil power", value: get('evil.power'), notation: '%'},
      ]
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
      return get("hunt.basePower") + get('minions.power')
    },
    'hunt.power.detail': () => {
      let total = get('hunt.power', true)
      let ownPower = get('hunt.basePower')
      if (ownPower === total) {
        return []
      }
      let withoutUpgrades = get('hunt.power', false)
      let minionPower = get('minions.power')
      let parts = [
        {label: 'Your power', value: ownPower},
      ]
      if (minionPower > 0) {
        parts.push({prefix: '+', label: 'Minions power', value: minionPower})
      }
      if (total > withoutUpgrades) {
        parts.push({prefix: '+', label: 'Upgrades', value: total - withoutUpgrades})
      }
      parts.push({prefix: '=', label: 'Hunt power', value: total})
      return parts
    },
    'hunt.powerToPainRatio': () => {
      return 0.01
    },
    'hunt.pain': () => {
      return get("hunt.power") * get('hunt.powerToPainRatio')
    },
    'hunt.pain.detail': () => {
      let power = get('hunt.power', true)
      return [
        {label: "Hunt power", value: power},
        {prefix: "×", label: "Pain ratio", value: get('hunt.powerToPainRatio')},
        {prefix: "=", label: "Pain/hunt", value: get('hunt.pain')},
      ]
    },
    'minions.autoBuy': () => {
      return state.settings.autoBuyMinions && get('upgrades.has')('minions.autoBuy') 
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
      return get('minions.basePower') * state.current.minions
    },
    'minions.power.detail': () => {
      let basePower = get('minions.basePower', true)
      return [
        {label: 'Minion power', value: basePower},
        {prefix: '×', label: 'Minions', value: state.current.minions},
        {prefix: '=', label: 'Legion power', value: get('minions.power')},
      ]
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
    'occultists.autoBuy': () => {
      return state.settings.autoBuyOccultists && get('upgrades.has')('occultists.autoBuy') 
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
      return (keepMinions = 0) => {

        let buyable = getGeometricMaxBuyable({
          start: state.current.occultists,
          base: get('occultists.baseCost'),
          increaseFactor: get('occultists.costIncreaseFactor'),
          available: parseInt(state.current.minions) - keepMinions
        })
        return buyable
      }
    },
    'occultists.soulsPerTick': () => {
      return get('minions.power') * state.current.occultists * get('occultists.basePower')
    },
    'occultists.soulsPerTick.detail': () => {
      let perTick = get('occultists.soulsPerTick')
      if (perTick === 0) {
        return []
      }
      let basePower = get('occultists.basePower', true)
      return [
        {label: 'Minions power', value: get('minions.power')},
        {prefix: '×', label: 'Occultists', value: state.current.occultists},
        {prefix: '×', label: 'Occultist power', value: basePower},
        {prefix: '=', label: 'Souls/second', value: perTick},
      ]
    },
    'occultists.painRatio': () => {
      return 0.0005
    },
    'occultists.painPerTick': () => {
      return get('occultists.soulsPerTick') * get('occultists.painRatio')
    },
    'occultists.painPerTick.detail': () => {
      return [
        {label: "Souls/second", value: get('occultists.soulsPerTick')},
        {prefix: "×", label: "Pain ratio", value: get('occultists.painRatio')},
        {prefix: "=", label: "Pain/second", value: get('occultists.painPerTick')},
      ]
    },
    'prey.enabled': () => {
      return state.total.awakenings > 0 || state.total.souls >= 1.5e7
    },
    'prey.breedingRate': () => {
      return 0
    },
    'prey.breedingRate.detail': () => {
      let rate = get('prey.breedingRate', true)
      if (rate === 0) {
        return []
      }
      return [
        {label: 'Current prey', value: state.current.prey},
        {label: 'Breeding rate', value: rate, notation: 'raw%'},
        {label: 'New prey/second', value: rate * state.current.prey},
      ]
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
    'upgrades.has': () => {
      return (name) => {
        return state.current.upgrades.indexOf(name) > -1
      }
    }
  }

  for (const [key, value] of Object.entries(config)) {
    values[key] = computed(value)
  }

  return {get, values}
}