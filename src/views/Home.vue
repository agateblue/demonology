<template>
  <div>
    <div class="stackable row">
      <div>
        <section class="tiny">
          <h2 v-if="$store.state.total.souls > 0">
            Hunt ·
            <number-badge
              unit="power"
              :value="parseInt($store.getters['values']['hunt.power'])"
            ></number-badge>
          </h2>
          <button
            class="fluid"
            @click.prevent="hunt">
            Hunt some preys
          </button>      
        </section>

        <section class="tiny mt-3" v-if="$store.getters['values']['minions.enabled']">
          <h2>
            Legion
          </h2>
          <button
            class="fluid"
            :disabled="$store.state.current.souls < $store.getters.values['minions.cost']"
            @click.prevent="$store.commit('purchase', {name: 'minions', value: 1, cost: $store.getters.values['minions.cost'] })"
          >
            Turn a prey into a minion for
            <number-badge
              unit="soul"
              :value="$store.getters.values['minions.cost']"
            ></number-badge>          
          </button>
          <p v-if="$store.state.current.minions > 0">
            Your legion improves your power by
            <number-badge
              unit="power"
              :value="parseInt($store.getters['values']['minions.power.total'])"
            >
            </number-badge>.
          </p>
        </section>
        <section class="tiny mt-3" v-if="$store.getters['values']['occultists.enabled']">
          <h2>
            Occultists
          </h2>
          <button
            class="fluid"
            :disabled="$store.state.current.minions < $store.getters.values['occultists.cost']"
            @click.prevent="$store.commit('recruitOccultist', {value: 1, cost: $store.getters.values['occultists.cost'] })"
          >
            Turn a prey into an occultist for
            <number-badge
              unit="minion"
              :value="$store.getters.values['occultists.cost']"
            ></number-badge>
          </button>
          <p v-if="$store.state.current.occultists > 0">
            Your occultist channel your legion into the mortal realm, granting you
            <number-badge
              unit="soul"
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
                  unit="soul"
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

export default {
  components: {
    NumberBadge,
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
