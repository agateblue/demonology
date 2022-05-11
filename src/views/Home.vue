<template>
  <div>
    <div class="stackable row">
      <div>
        <section class="tiny transparent px-0 pt-0">
          <button
            class="fluid py-3 text--1"
            @click.prevent="hunt">
            Hunt some preys
          </button>
        </section>  
        <section class="tiny">
          <div class="stackable row">
            <number-badge
              unit="power"
              :value="parseInt($store.getters['values']['hunt.power'])"
            > Power</number-badge>
            <number-badge
              unit="minions"
              :value="parseInt($store.state.current.minions)"
              v-if="$store.state.current.minions > 0"
            > Minions</number-badge>
            <number-badge
              unit="occultists"
              :value="parseInt($store.state.current.occultists)"
              v-if="$store.state.current.occultists > 0"
            > Occultists</number-badge>
          </div>
          <table class="my-4">
            <thead>
              <th>Action</th>
              <th class="text--center text--monospace">1</th>
              <th class="text--center text--monospace">10</th>
            </thead>
            <tbody>
              <tr v-if="$store.getters['values']['minions.enabled']">
                <td>
                  Turn preys into Minions 
                </td>
                <td v-for="quantity in [1, 10]" :key="quantity">
                  <purchase-button
                    class="fluid"
                    :quantity="quantity"
                    :cost-getter="$store.getters['values']['minions.costGetter']"
                    @purchase="$store.commit('purchase', {name: 'minions', quantity: $event.quantity, cost: $event.cost })"
                  ></purchase-button>
                </td>
              </tr>
              <tr v-if="$store.getters['values']['occultists.enabled']">
                <td>
                  Turn preys into Occultists 
                </td>
                <td v-for="quantity in [1, 10]" :key="quantity">
                  <purchase-button
                    class="fluid"
                    :quantity="quantity"
                    :cost-getter="$store.getters['values']['occultists.costGetter']"
                    @purchase="$store.commit('purchase', {name: 'occultists', quantity: $event.quantity, cost: $event.cost })"
                  ></purchase-button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="$store.state.current.minions > 0">
            Your legion improves your power by
            <number-badge
              unit="power"
              :value="parseInt($store.getters['values']['minions.power.total'])"
            >
            </number-badge>.
          </p>
          <p v-if="$store.state.current.occultists > 0">
            Your occultists channel your legion into the mortal realm, granting you
            <number-badge
              unit="souls"
              :value="parseInt($store.getters['values']['occultists.perTick'])"
            ></number-badge> every second.
          </p>    
        </section>
      </div>
      <section v-if="$store.getters['values']['upgrades.enabled']">
        <h2>Upgrades</h2>
        <template v-if="$store.getters['values']['upgrades.available'].length > 0">
          <div v-for="upgrade in $store.getters['values']['upgrades.available']" :key="upgrade.key">
            <hr>
            <div class="align-items--center justify-content--space-between">
              <strong>{{ upgrade.name }}</strong>
              <button
                :disabled="$store.state.current.souls < upgrade.cost"
                @click.prevent="$store.commit('purchaseUpgrade', {id: upgrade.id, cost: upgrade.cost })"
              >
                Purchase for
                <number-badge
                  :value="upgrade.cost"
                  unit="souls"
                ></number-badge>
              </button>
            </div>
            <p>
              {{ 
                upgrade.description.replace(
                  '${value}',
                  formatNumber(upgrade.value, $store.state.settings.notation, upgrade.valueFormat))
              }}
            </p>
          </div>
        </template>
        <p v-else>No available upgrades. Try getting more souls.</p>
      </section>
    </div>
  </div>
</template>

<script>
import {formatNumber} from '@/utils'

import NumberBadge from '@/components/NumberBadge'
import PurchaseButton from '@/components/PurchaseButton'

export default {
  components: {
    NumberBadge,
    PurchaseButton,
  },
  data () {
    return {
      formatNumber
    }
  },
  methods: {
    hunt () {
      this.$store.commit(
        'increment',
        {name: 'clicks', value: 1}
      )
      this.$store.commit(
        'increment',
        {name: 'souls', value: this.$store.getters['values']['hunt.power']}
      )
    }
  }
}
</script>
