<template>
  <div>
    <template v-if="$store.state.harvest.awakenings > 0 && !$store.state.current.name">
      <section class="text--center">
        <h2>Choose your path</h2>
        <p>Evil can take many forms. Choose wisely.</p>
        <div class="stackable row">
          <div v-for="name in $store.getters['values']('names.available')" :key="name.id">
            <h3>{{ name.name }}, {{ name.title }}</h3>
            <ul class="pl-0">
              <li v-for="(perk, idx) in name.perks" :key="idx">{{ perk }}</li>
            </ul>
            <button @click.prevent="$store.commit('name', name.id)">
              I am {{ name.name }}
            </button>
          </div>
        </div>
        
      </section>
    </template>
    <template v-else>

      <section
        class="tiny transparent px-0 pt-0 my-3"
      >
        <button
          class="fluid py-3 text--1"
          @click.prevent="hunt"
          :disabled="$store.state.current.preys === 0"
        >
          Hunt some preys<br>
          <number-badge
            unit="souls"
            :value="parseInt($store.getters['values']('hunt.power'))"
            prefix="+"
          > Souls</number-badge>
          <template v-if="$store.getters['values']('pain.enabled')">
            <br>
            <number-badge
              unit="pain"
              :value="parseInt($store.getters['values']('hunt.pain'))"
              prefix="+"
              
            > Pain</number-badge>
          </template>

        </button>
      </section>  
      <section v-if="$store.state.current.preys === 0" class="my-3">
        <h2>The world is empty</h2>
        <p>
          You have consumed all life in your world. Your legion wanders aimlessly.
          It is time for you to go dormant until the world heal and you can hunt again.
        </p>
        <button @click.prevent="$store.commit('sleep')">
          Devour your legion, souls and go dormant for a while
        </button>
      </section>
      <section v-if="$store.state.total.souls > 0">
        <h2>Legion</h2>
        <div class="stackable row">
          <number-badge
            unit="power"
            :value="parseInt($store.getters['values']('hunt.power'))"
          > Hunt power</number-badge>
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
        <table class="my-4" v-if="$store.getters['values']('minions.enabled') || $store.getters['values']('occultists.enabled')">
          <thead>
            <th>Action</th>
            <th class="text--center text--monospace">x1</th>
            <th class="text--center text--monospace">x10</th>
            <th class="text--center text--monospace">x100</th>
            <th class="text--center text--monospace">Max</th>
          </thead>
          <tbody>
            <tr v-if="$store.getters['values']('minions.enabled')">
              <td>
                Turn preys into Minions 
              </td>
              <td v-for="quantity in [1, 10, 100]" :key="quantity">
                <purchase-button
                  class="fluid"
                  :quantity="quantity"
                  :cost-getter="$store.getters['values']('minions.costGetter')"
                  @purchase="$store.commit('purchase', {name: 'minions', quantity: $event.quantity, cost: $event.cost })"
                ></purchase-button>
              </td>
              <td>
                <purchase-button
                  class="fluid"
                  :quantity="'max'"
                  :cost-getter="$store.getters['values']('minions.costGetter')"
                  :max-quantity-getter="$store.getters['values']('minions.buyMaxGetter')"
                  @purchase="$store.commit('purchase', {name: 'minions', quantity: $event.quantity, cost: $event.cost })"
                ></purchase-button>
              </td>
            </tr>
            <tr v-if="$store.getters['values']('occultists.enabled')">
              <td>
                Turn preys into Occultists 
              </td>
              <td v-for="quantity in [1, 10, 100]" :key="quantity">
                <purchase-button
                  class="fluid"
                  :quantity="quantity"
                  :cost-getter="$store.getters['values']('occultists.costGetter')"
                  @purchase="$store.commit('purchase', {name: 'occultists', quantity: $event.quantity, cost: $event.cost })"
                ></purchase-button>
              </td>
              <td>
                <purchase-button
                  class="fluid"
                  :quantity="'max'"
                  :cost-getter="$store.getters['values']('occultists.costGetter')"
                  :max-quantity-getter="$store.getters['values']('occultists.buyMaxGetter')"
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
            :value="parseInt($store.getters['values']('minions.power.total'))"
          >
          </number-badge>.
        </p>
        <p v-if="$store.state.current.occultists > 0">
          Your occultists channel your legion into the mortal realm, granting you
          <number-badge
            unit="souls"
            :value="parseInt($store.getters['values']('occultists.soulsPerTick'))"
          ></number-badge>
          <template v-if="$store.getters['values']('occultists.painPerTick') > 0">
            and
            <number-badge
              unit="pain"
              :value="parseInt($store.getters['values']('occultists.painPerTick'))"
            ></number-badge>

          </template>
           every second.
        </p>    
      </section>
      <section class="my-3" v-if="$store.getters['values']('upgrades.enabled')">
        <button
          class="float--right"
          @click.prevent="buyMaxUpgrades"
          v-if="$store.state.total.upgrades.length >= 3"
          :disabled="!canBuyMaxUpgrades"
        >
          Buy all
        </button>
        <h2 class="mt-0">Upgrades</h2>
        <template v-if="$store.getters['values']('upgrades.available').length > 0">
          <div v-for="upgrade in $store.getters['values']('upgrades.available')" :key="upgrade.key">
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
                  formatNumber(getComputedValue(upgrade.value, $store.getters['values']), 'compact', upgrade.valueFormat))
              }}
            </p>
          </div>
        </template>
        <p v-else>No available upgrades. Try getting more souls.</p>
      </section>
    </template>
  </div>
</template>

<script>
import {bind, unbind} from '@/hotkeys'
import {formatNumber} from '@/utils'
import {getComputedValue, getBuyableUpgrades} from '@/game'

import NumberBadge from '@/components/NumberBadge'
import PurchaseButton from '@/components/PurchaseButton'

function purchase({store, unit, costGetter, quantity}) {
  let cost = costGetter(quantity)
  store.commit(
    'purchase',
    {name: unit, quantity: quantity, cost}
  )
}

export default {
  components: {
    NumberBadge,
    PurchaseButton,
  },
  data () {
    return {
      formatNumber,
      getComputedValue,
      hotkeys: [
        {key: 'h', handler: () => { this.hunt()}},
        {key: 'u', handler: () => { this.buyMaxUpgrades()}},
        {key: 'm', handler: () => {
          purchase({
            store: this.$store,
            unit: 'minions',
            quantity: 1,
            costGetter: this.$store.getters['values']('minions.costGetter')
          })
        }},
        {key: 'ctrl+m', handler: () => {
          purchase({
            store: this.$store,
            unit: 'minions',
            quantity: 10,
            costGetter: this.$store.getters['values']('minions.costGetter')
          })
        }},
        {key: 'shift+m', handler: () => {
          purchase({
            store: this.$store,
            unit: 'minions',
            quantity: 100,
            costGetter: this.$store.getters['values']('minions.costGetter')
          })
        }},
        {key: 'ctrl+shift+m', handler: () => {
          let buyable = this.$store.getters['values']('minions.buyMaxGetter')()
          purchase({
            store: this.$store,
            unit: 'minions',
            quantity: buyable,
            costGetter: this.$store.getters['values']('minions.costGetter')
          })
        }},
        {key: 'o', handler: () => {
          purchase({
            store: this.$store,
            unit: 'occultists',
            quantity: 1,
            costGetter: this.$store.getters['values']('occultists.costGetter')
          })
        }},
        {key: 'ctrl+o', handler: () => {
          purchase({
            store: this.$store,
            unit: 'occultists',
            quantity: 10,
            costGetter: this.$store.getters['values']('occultists.costGetter')
          })
        }},
        {key: 'shift+o', handler: () => {
          purchase({
            store: this.$store,
            unit: 'occultists',
            quantity: 100,
            costGetter: this.$store.getters['values']('occultists.costGetter')
          })
        }},
        {key: 'ctrl+shift+o', handler: () => {
          let buyable = this.$store.getters['values']('occultists.buyMaxGetter')()
          purchase({
            store: this.$store,
            unit: 'occultists',
            quantity: buyable,
            costGetter: this.$store.getters['values']('occultists.costGetter')
          })
        }},
      ]
    }
  },
  mounted () {
    bind(this.hotkeys)
  },
  unmounted () {
    unbind(this.hotkeys)
  },
  computed: {
    canBuyMaxUpgrades () {
      let available = this.$store.state.current.souls
      return (
        this.$store.getters['values']('upgrades.available').length > 0
        && this.$store.getters['values']('upgrades.available')[0].cost <= available
      )
    }
  },
  methods: {
    hunt () {
      this.$store.commit(
        'gatherSouls',
        {
          hunts: 1,
          power: this.$store.getters['values']('hunt.power'),
          pain: this.$store.getters['values']('hunt.pain'),
        }
      )
    },
    buyMaxUpgrades () {
      let buyable = getBuyableUpgrades(
        this.$store.getters['values']('upgrades.available'),
        this.$store.state.current.souls
      )
      for (const upgrade of buyable) {
        this.$store.commit('purchaseUpgrade', {id: upgrade.id, cost: upgrade.cost })
      }
    }
  }
}
</script>
