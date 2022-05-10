<template>
  <div class="py-3">
    <div class="text--center mb-4">
      <h1>Who am I?</h1>
      <fire></fire>
    </div>
    <div class="stackable row my-4">
      <section class="text--center">
        <header class="align-items--center justify-content--center">
          <h2 title="Let me sleep all night in your soul kitchen">Souls</h2>
          <number-badge
            class="ml-4"
            unit="soul"
            :value="parseInt($store.state.current.souls)"
          ></number-badge>
        </header>
        <button
          title="They may not survive, but do you care?"
          @click.prevent="$store.commit('increment', {name: 'clicks', value: 1}); $store.commit('increment', {name: 'souls', value: $store.getters['values']['souls.perClick']})">
          Extract 
          
          <number-badge
            unit="soul"
            :value="parseInt($store.getters['values']['souls.perClick'])"
          >
          </number-badge>
          from living creatures
        </button>
        <p>
          You <i>need</i> more.
        </p>
      </section>

      <section class="text--center" v-if="$store.getters['values']['minions.enabled']">
        <header class="align-items--center justify-content--center">
          <h2>Minions</h2>
          <number-badge
            class="ml-4"
            unit="minion"
            :value="$store.state.current.minions"
          ></number-badge>
        </header>
        <button
          title="Useful. And disposable."
          :disabled="$store.state.current.souls < $store.getters.values['minions.cost']"
          @click.prevent="$store.commit('purchase', {name: 'minions', value: 1, cost: $store.getters.values['minions.cost'] })"
        >
          Subjugate
          <number-badge
            unit="minion"
            :value="1"
          ></number-badge>
          for
          <number-badge
            unit="soul"
            :value="$store.getters.values['minions.cost']"
          ></number-badge>          
        </button>
        <p>
          They improve souls extraction by
          <number-badge
            unit="soul"
            :value="parseInt($store.getters['values']['minions.power'] * $store.state.current.minions)"
          >
          </number-badge>
        </p>
      </section>
      <section class="text--center" v-if="$store.getters['values']['occultists.enabled']">
        <header class="align-items--center justify-content--center">
          <h2>Occultists</h2>
          <number-badge
            class="ml-4"
            unit="occultist"
            :value="$store.state.current.occultists"
          ></number-badge>
        </header>
        <button
          :disabled="$store.state.current.minions < $store.getters.values['occultists.cost']"
          @click.prevent="$store.commit('recruitOccultist', {value: 1, cost: $store.getters.values['occultists.cost'] })"
        >
          Sacrifice
          <number-badge
            unit="minion"
            :value="$store.getters.values['occultists.cost']"
          ></number-badge>
          to recruit
          <number-badge
            unit="occultist"
            :value="1"
          ></number-badge>
        </button>
        <p v-if="$store.getters['values']['souls.perTick'] > 0">
          They harvest
          <number-badge
            unit="soul"
            :value="parseInt($store.getters['values']['souls.perTick'])"
          ></number-badge> every second.
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
                <button
                  :disabled="$store.state.current.souls < upgrade.cost"
                  @click.prevent="$store.commit('purchaseUpgrade', {id: upgrade.id, cost: upgrade.cost })"
                >
                  Purchase for
                  <number-badge
                    :value="upgrade.cost"
                    unit="soul"
                  ></number-badge>
                </button>

              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No available upgrades. Try getting more souls.</p>
      </section>
    </div>
    <div style="position: fixed; bottom: 1em; right: 1em" v-if="$store.state.settings.debug">
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
