<template>
  <div class="py-3">
    <div class="text--center mb-4">
      <h1>You just woke up</h1>
      <fire></fire>
    </div>
    <div class="stackable row my-4">
      <section class="text--center">
        <header class="align-items--center justify-content--center">
          <h2>Souls</h2>
          <number-badge class="ml-4" :value="parseInt($store.state.current.souls)"></number-badge>
        </header>
        <button @click.prevent="$store.commit('increment', {name: 'clicks', value: 1}); $store.commit('increment', {name: 'souls', value: $store.getters['values']['souls.perClick']})">
          Extract souls from living creatures
        </button>
        <p>
          Each extraction gets you
          <number-badge :value="parseInt($store.getters['values']['souls.perClick'])">
            souls
          </number-badge>
        </p>
        <p>
          You <i>need</i> more.
        </p>
      </section>

      <section class="text--center" v-if="$store.getters['values']['minions.enabled']">
        <header class="align-items--center justify-content--center">
          <h2>Minions</h2>
          <number-badge class="ml-4" :value="$store.state.current.minions"></number-badge>
        </header>
        <button
          :disabled="$store.state.current.souls < $store.getters.values['minions.cost']"
          @click.prevent="$store.commit('purchase', {name: 'minions', value: 1, cost: $store.getters.values['minions.cost'] })"
        >
          Subjugate 1 minion for {{ formatNumber($store.getters.values['minions.cost'], $store.state.settings.notation) }} souls.
        </button>
        <p>
          They improve souls extraction by
          <number-badge
            type="bonus"
            :value="parseInt($store.getters['values']['minions.power'] * $store.state.current.minions)"></number-badge>
        </p>
      </section>
      <section class="text--center" v-if="$store.getters['values']['occultists.enabled']">
        <header class="align-items--center justify-content--center">
          <h2>Occultists</h2>
          <number-badge class="ml-4" :value="$store.state.current.occultists"></number-badge>
        </header>
        <button
          :disabled="$store.state.current.minions < $store.getters.values['occultists.cost']"
          @click.prevent="$store.commit('recruitOccultist', {value: 1, cost: $store.getters.values['occultists.cost'] })"
        >
          Sacrifice {{ formatNumber($store.getters.values['occultists.cost'], $store.state.settings.notation) }} minions to recruit 1 occultist.
        </button>
        <p v-if="$store.getters['values']['souls.perTick'] > 0">
          They harvest
          <number-badge :value="parseInt($store.getters['values']['souls.perTick'])">
            souls/s
          </number-badge>
        </p>
      </section>
    </div>
    <div class="stackable row">
      <section v-if="$store.getters['values']['upgrades.enabled']">
        <h2>Upgrades</h2>
        <table v-if="$store.getters['values']['upgrades.available'].length > 0">
          <tbody>
            <tr v-for="upgrade in $store.getters['values']['upgrades.available']" :key="upgrade.key">
              <td>
                <strong>{{ upgrade.name }}</strong>
              </td>
              <td>
                {{ 
                  upgrade.description.replace(
                    '${value}',
                    formatNumber(upgrade.valueFormatter ? upgrade.valueFormatter(upgrade.value) : upgrade.value, $store.state.settings.notation))
                }}
              </td>
              <td style="min-width: 100px">
                <number-badge :value="upgrade.cost" type="cost">
                  souls
                </number-badge>
              </td>
              <td>
                <button
                  :disabled="$store.state.current.souls < upgrade.cost"
                  @click.prevent="$store.commit('purchaseUpgrade', {id: upgrade.id, cost: upgrade.cost })"
                >
                  Purchase
                </button>

              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No available upgrades. Try getting more souls.</p>
      </section>
    </div>
    <div style="position: fixed; bottom: 1em; right: 1em">
      <button @click.prevent="$store.commit('reset')">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import {formatNumber} from '@/utils'

import Fire from '@/components/Fire'
import NumberBadge from '@/components/NumberBadge'

export default {
  components: {
    Fire,
    NumberBadge,
  },
  data () {
    return {
      formatNumber
    }
  }
}
</script>
