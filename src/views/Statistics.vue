<template>
  <section class="narrow">
    <h1>Statistics</h1>
    <table class="simple">
      <thead>
        <th></th>
        <th
          :colspan="$store.state.settings.debug ? 2 : 1"
          v-if="$store.state.settings.debug"
        >Current</th>
        <th :colspan="$store.state.settings.debug ? 2 : 1">Lifetime</th>
      </thead>
      <tbody>
        <tr
          v-for="stat in stats"
          :key="stat.label"
          v-memo="[stat.id, getValue(stat, 'current'), getValue(stat, 'lifetime')]"
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
  </section>
</template>

<script>
import {formatNumber} from '@/utils'
export default {
  data () {
    return {
      stats: [
        {
          name: "hunts",
          label: "Hunts"
        },
        {
          name: "hunted",
          label: "Hunted preys"
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
      ],
      values: {
        current: {},
        lifetime: {},
        total: {},
      }
    }
  },
  computed: {
    columns () {
      let c = ["lifetime"]
      if (this.$store.state.settings.debug) {
        c.unshift('current')
      }
      return c
    }
  },
  methods: {
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
