<template>
  <section>
    <h1>Statistics</h1>
    <table class="simple">
      <thead>
        <th></th>
        <th
          :colspan="$store.state.settings.debug ? 2 : 1"
          v-if="$store.state.settings.debug"
        >Current</th>
        <th 
          :colspan="$store.state.settings.debug ? 2 : 1"
        >Awakening</th>
        <th 
          :colspan="$store.state.settings.debug ? 2 : 1"
          v-if="$store.state.settings.debug"
        >Harvest</th>
        <th
          :colspan="$store.state.settings.debug ? 2 : 1"
          v-if="$store.state.settings.debug"
        >Total</th>
      </thead>
      <tbody>
        <tr
          v-for="stat in stats"
          :key="stat.label"
          v-memo="[stat.id, getValue(stat, 'current'), getValue(stat, 'awakening'), getValue(stat, 'harvest')]"
        >
          <td>{{ stat.label }}</td>
          <template v-for="column in columns" :key="column">
            <td class="monospace text--right">
              {{ getValue(stat, column) }}
            </td>
            <td v-if="$store.state.settings.debug">
              <form
                v-if="!stat.getter"
                @submit.prevent="setStat(stat, column)"
                class="stackable row"
              >
                <input
                  type="text"
                  style="min-width: 80px; text-align: right"
                  :value="values[column][stat.name]"
                  :ref="`input-${column}-${stat.name}`"
                >
                <button
                  class="display--inline-block text--center"
                  type="submit"
                >Set</button>
              </form>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <template v-if="$store.state.settings.debug">
      <h2>Values</h2>
      <table>
        <thead>
          <th>Key</th>
          <th>Value</th>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="field">
                <input type="text" placeholder="Filter" v-model="valueQuery">
              </div>
            </td>
            <td>
              <a href="" @click.prevent="valueQuery = ''">Clear query</a>
            </td>
          </tr>
          <tr v-for="value in debugValues" :key="value.key" class="text--monospace">
            <td>{{ value.key }}</td>
            <td class="text--right">{{ formatNumber(value.value.toFixed(3)) }}</td>
          </tr>
        </tbody>
      </table>
      <h2>Upgrades</h2>
      <table>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">
              <div class="field">
                <input type="text" placeholder="Filter" v-model="upgradeQuery">
              </div>
            </td>
            <td>
              <a href="" @click.prevent="upgradeQuery = ''">Clear query</a> ·
              <a href="" @click.prevent="toggleAll(debugUpgrades, true)">Enable all</a> ·
              <a href="" @click.prevent="toggleAll(debugUpgrades, false)">Disable all</a>
            </td>
          </tr>
          <tr v-for="upgrade in debugUpgrades" :key="upgrade.id">
            <td class="text--monospace">{{ upgrade.id }}</td>
            <td>{{ upgrade.name }}</td>
            <td>{{ 
                upgrade.description.replace(
                  '${value}',
                  formatNumber(getComputedValue(upgrade.value, $store.getters['values']), 'compact', upgrade.valueFormat))
              }}
            </td>
            <td>
              <div class="checkbox field">
                <input
                  :id="`upgrade-enable-${upgrade.id}`"
                  type="checkbox"
                  @change="$store.commit('setUpgradeFromDebug', {id: upgrade.id, value: $event.target.checked})"
                  :checked="$store.state.current.upgrades.indexOf(upgrade.id) > -1">
                <label :for="`upgrade-enable-${upgrade.id}`">Enabled</label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </section>
</template>

<script>
import {formatNumber} from '@/utils'
import sortBy from 'lodash/sortBy'
import {UPGRADES, getComputedValue} from '@/game'

export default {
  data () {
    return {
      values: {
        current: {},
        awakening: {},
        harvest: {},
        total: {},
      },
      upgradeQuery: '',
      valueQuery: '',
      formatNumber,
      getComputedValue
    }
  },
  computed: {
    stats () {
      let s = [
        {
          name: "hunts",
          label: "Hunts"
        },
        {
          name: "hunted",
          label: "Hunted prey"
        },
        {
          name: "souls",
          label: "Souls"
        },
        {
          name: "minions",
          label: "Minions"
        },
        {
          name: "occultists",
          label: "Occultists"
        },
        {
          name: "upgrades",
          label: "Purchased upgrades",
          getter: (v) => { return v.length }
        },
      ]
      if (this.$store.state.total.awakenings > 0 || this.$store.state.settings.debug) {
        s.push({name: 'pain', label: 'Pain'})
      }
      if (this.$store.state.total.evil > 0 || this.$store.state.settings.debug) {
        s.push({name: 'evil', label: 'Evil'})
      }
      if (this.$store.state.settings.debug) {
        s.push({name: 'prey', label: 'Prey'})
        s.push({name: 'awakenings', label: 'Awakenings'})
        s.push({name: 'harvests', label: 'Harvests'})
      }
      return s
    },
    columns () {
      let c = ["awakening"]
      if (this.$store.state.settings.debug) {
        c.unshift('current')
        c.push('harvest')
        c.push('total')
      }
      return c
    },
    debugUpgrades () {
      let upgrades = sortBy(UPGRADES, ['id'])
      if (this.upgradeQuery) {
        upgrades = upgrades.filter((u) => {
          let haystack = [u.id.toLowerCase(), u.name.toLowerCase(), u.description.toLowerCase()].join(' ')
          return haystack.includes(this.upgradeQuery.toLowerCase())
        })
      }
      return upgrades
    },
    debugValues () {
      let v = []
      let keys = sortBy(Object.keys(this.$store.getters['valuesForDebug']))
      if (this.valueQuery) {
        keys = keys.filter(k => {
          return k.toLowerCase().includes(this.valueQuery.toLowerCase())
        })
      }
      for (const key of keys) {
        let value = this.$store.getters['values'](key)
        if (typeof value === 'number') {
          v.push({key, value})
        }
      }
      return v
    }
  },
  methods: {
    toggleAll (upgrades, value) {
      for (const upgrade of upgrades) {
        this.$store.commit('setUpgradeFromDebug', {id: upgrade.id, value})
      }
    },
    getValue (stat, period, notation = 'default') {
      let initial = this.$store.state[period][stat.name]
      let v
      if (stat.getter) {
        v = stat.getter(initial)
      } else {
        v = formatNumber(parseInt(initial), notation) 
      }
      if (this.values[period][stat.name] === undefined) {
        this.values[period][stat.name] = formatNumber(parseInt(initial), 'scientific') 
      }
      return v
    },
    setStat (stat, namespace) {
      let input = this.$refs[`input-${namespace}-${stat.name}`][0]
      let value = input.value
      value = Number(input.value)
      this.$store.commit(
        "setFromDebug",
        {namespace: namespace, name: stat.name, value: value}
      )
    }
  }
}
</script>
