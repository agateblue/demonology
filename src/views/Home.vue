<template>
  <section class="py-3">
    <div>
      <h1>🔥 You woke up, and you're hungry 🔥</h1>
      <p>
        You have {{ formatNumber(parseInt($store.state.current.souls), $store.state.settings.notation) }} souls. You want more.
      </p>
      <button @click.prevent="$store.commit('increment', {name: 'souls', value: $store.getters['values']['souls.perClick']})">
        Extract {{ formatNumber($store.getters['values']['souls.perClick'], $store.state.settings.notation) }} souls from living creatures
      </button>
      <p v-if="$store.getters['values']['souls.perTick'] > 0">
        Your minions hunt {{ formatNumber($store.getters['values']['souls.perTick'], $store.state.settings.notation) }} souls each second.
      </p>
    </div>

    <div v-if="$store.getters['values']['minions.enabled']">
      <hr>
      <h2>Minions</h2>
      <p>
        You have {{ formatNumber($store.state.current.minions, $store.state.settings.notation) }} minions.
      </p>
      <button
        :disabled="$store.state.current.souls < $store.getters.values['minions.cost']"
        @click.prevent="$store.commit('purchase', {name: 'minions', value: 1, cost: $store.getters.values['minions.cost'] })"
      >
        Subjugate 1 minion for {{ formatNumber($store.getters.values['minions.cost'], $store.state.settings.notation) }} souls.
      </button>
    </div>
    <div v-if="$store.getters['values']['upgrades.enabled']">
      <hr>
      <h2>Upgrades</h2>
      <table>
        <tbody>
          <tr v-for="upgrade in $store.getters['values']['upgrades.available']" :key="upgrade.key">
            <td>{{ upgrade.name }}</td>
            <td>
              {{ 
                upgrade.description.replace(
                  '${value}',
                  formatNumber(upgrade.valueFormatter ? upgrade.valueFormatter(upgrade.value) : upgrade.value, $store.state.settings.notation))
              }}
            </td>
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
    <div style="position: fixed; bottom: 1em; right: 1em">
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
