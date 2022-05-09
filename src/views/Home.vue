<template>
  <section class="py-3">
    <h1>🔥 You woke up, and you're hungry 🔥</h1>
    <div class="stackable row">
      <div>
        <h2>
          Souls · {{ formatNumber(parseInt($store.state.current.souls), $store.state.settings.notation) }}
        </h2>
        <button @click.prevent="$store.commit('increment', {name: 'clicks', value: 1}); $store.commit('increment', {name: 'souls', value: $store.getters['values']['souls.perClick']})">
          Extract souls from living creatures
        </button>
        <p>
          Each extraction gets you {{ formatNumber(parseInt($store.getters['values']['souls.perClick']), $store.state.settings.notation) }} souls.
        </p>
        <p>
          You <i>need</i> more.
        </p>
      </div>

      <div v-if="$store.getters['values']['minions.enabled']">
        <h2>
          Minions ·
          {{ formatNumber($store.state.current.minions, $store.state.settings.notation) }}
        </h2>
        <button
          :disabled="$store.state.current.souls < $store.getters.values['minions.cost']"
          @click.prevent="$store.commit('purchase', {name: 'minions', value: 1, cost: $store.getters.values['minions.cost'] })"
        >
          Subjugate 1 minion for {{ formatNumber($store.getters.values['minions.cost'], $store.state.settings.notation) }} souls.
        </button>
        <p>
          They improve souls extraction by {{ formatNumber(parseInt($store.getters['values']['minions.power'] * $store.state.current.minions), $store.state.settings.notation) }}.
        </p>
      </div>
      <div v-if="$store.getters['values']['occultists.enabled']">
        <h2>
          Occultists
          ·
          {{ formatNumber($store.state.current.occultists, $store.state.settings.notation) }}
        </h2>
        <button
          :disabled="$store.state.current.minions < $store.getters.values['occultists.cost']"
          @click.prevent="$store.commit('recruitOccultist', {value: 1, cost: $store.getters.values['occultists.cost'] })"
        >
          Sacrifice {{ formatNumber($store.getters.values['occultists.cost'], $store.state.settings.notation) }} minions to recruit 1 occultist.
        </button>
        <p v-if="$store.getters['values']['souls.perTick'] > 0">
          They harvest {{ formatNumber(parseInt($store.getters['values']['souls.perTick']), $store.state.settings.notation) }} souls/second.
        </p>
      </div>
    </div>
    <div class="stackable row">
      <div v-if="$store.getters['values']['upgrades.enabled']">
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
