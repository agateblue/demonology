<template>
  <section class="py-3 vertical--center">
    <div class="text--center">
      <strong>🔥 You woke up, and you're hungry</strong>
      <p>
        You have {{ formatNumber($store.state.current.souls, $store.state.settings.notation) }} souls
      </p>
      <button @click.prevent="$store.commit('increment', {name: 'souls', value: $store.getters['values']['souls.perClick']})">
        Gather {{ formatNumber($store.getters['values']['souls.perClick'], $store.state.settings.notation) }} souls
      </button>
      <template v-if="$store.getters['values']['souls.perTick'] > 0">
        Your minions hunt {{ formatNumber($store.getters['values']['souls.perTick'], $store.state.settings.notation) }} souls each tick
      </template>
    </div>

    <div class="text--center" v-if="$store.getters['values']['minions.enabled']">
      <hr>
      <strong>Minions</strong>
      <p>
        You have {{ formatNumber($store.state.current.minions, $store.state.settings.notation) }} minions
      </p>
      <button
        :disabled="$store.state.current.souls < $store.getters.values['minions.cost']"
        @click.prevent="$store.commit('purchase', {name: 'minions', value: 1, cost: $store.getters.values['minions.cost'] })"
      >
        Buy 1 minion for {{ formatNumber($store.getters.values['minions.cost'], $store.state.settings.notation) }} souls.
      </button>
    </div>
    <div class="text--center" v-if="$store.getters['values']['upgrades.enabled']">
      <hr>
      <strong>Upgrades</strong>
      <table>
        <tbody>
          <tr v-for="upgrade in $store.getters['values']['upgrades.available']" :key="upgrade.key">
            <td>{{ upgrade.name }}</td>
            <td>{{ upgrade.description.replace('${value}', formatNumber(upgrade.value, $store.state.settings.notation)) }}</td>
            <td>{{ formatNumber(upgrade.cost, $store.state.settings.notation) }} souls</td>
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
    </div>
    <div class="text--center">
      <hr>
      <button @click.prevent="$store.commit('reset')">
        Reset
      </button>
    </div>
  </section>
</template>

<script>
import {formatNumber} from '@/utils'

export default {
  data () {
    return {
      formatNumber
    }
  }
}
</script>
