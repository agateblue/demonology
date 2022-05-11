<template>
  <div>
    <div class="stackable row">
      <div>
        <section class="tiny">
          <h2 title="Let me sleep all night in your soul kitchen">
            <number-badge
              class="ml-4 float--right"
              unit="soul"
              :value="parseInt($store.state.current.souls)"
            ></number-badge>
            Souls
          </h2>
          <button
            title="They may not survive, but do you care?"
            @click.prevent="extract">
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

        <section class="tiny mt-3" v-if="$store.getters['values']['minions.enabled']">
          <h2>
            <number-badge
              class="ml-4 float--right"
              unit="minion"
              :value="$store.state.current.minions"
            ></number-badge>
            Minions
          </h2>
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
              :value="parseInt($store.getters['values']['minions.power.total'])"
            >
            </number-badge>
          </p>
        </section>
        <section class="tiny mt-3" v-if="$store.getters['values']['occultists.enabled']">
          <h2>
            <number-badge
              class="ml-4 float--right"
              unit="occultist"
              :value="$store.state.current.occultists"
            ></number-badge>
            Occultists
          </h2>
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
    extract () {
      this.$store.commit(
        'increment',
        {name: 'clicks', value: 1}
      )
      this.$store.commit(
        'increment',
        {name: 'souls', value: this.$store.getters['values']['souls.perClick']}
      )
    }
  }
}
</script>
