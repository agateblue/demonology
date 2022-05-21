<template>
  <div>
    <template v-if="$store.state.harvest.awakenings > 0 && !$store.state.current.name">
      <section class="narrow text--center">
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
        class="tiny transparent px-0 pt-0 my-3 justify-content--center text--center"
      >
        <button
          class="py-2 px-4"
          @click.prevent="hunt"
          :disabled="$store.state.current.preys === 0"
        >
          <div class="text--1 mb-1">Hunt some preys</div>
          <number-badge
            unit="souls"
            :value="parseInt($store.getters['values']('hunt.power'))"
            prefix="+"
          > Souls</number-badge>
          <template v-if="$store.getters['values']('pain.enabled')">
            <number-badge
              class="ml-4"
              unit="pain"
              :value="parseInt($store.getters['values']('hunt.pain'))"
              prefix="+"
              
            > Pain</number-badge>
          </template>

        </button>
      </section>  
      <section
        class="tiny transparent px-0 pt-0 my-3 text--center"
        v-if="$store.state.total.awakenings > 0 || $store.getters['values']('evil.enabled')"
      >
        <button
          class="py-2 mx-2"
          v-if="$store.state.harvest.awakenings > 0"
          @click.prevent="showSleep = !showSleep"
        >
          Go dormant
        </button>
        <button
          class="py-2 mx-2"
          v-if="$store.getters['values']('evil.enabled')"
          @click.prevent="showHarvest = !showHarvest"
          :disabled="$store.state.total.harvests === 0 && $store.getters['values']('evil.buyMaxGetter')() === 0"
        >
          Harvest
          <number-badge
            unit="evil"
            :value="$store.getters['values']('evil.buyMaxGetter')()"
          > Evil</number-badge>
        </button>
      </section>
      <section
        class="narrow my-3"
        v-if="showHarvest"
      >
        <h2>Reap what you sow</h2>
        <p v-if="$store.getters['values']('evil.buyMaxGetter')() < $store.state.total.evil">
          <i>Warning: harvesting now won't yield many evil points. You may want to get more pain first.</i>
        </p>
        <p>
          The pain of your preys shimmer in the crimson skies.
        </p>
        <p>
          You could feed on it, grow in power and take over another realm. Or you could wait.
        </p>
        <p>
          If you harvest now, you will:
        </p>
        <ul>
          <li>
            Lose
            <number-badge
              unit="pain"
              :value="parseInt($store.state.harvest.pain)"
            >
              Pain
            </number-badge>
          </li>
          <li>
            Gain
            <number-badge
              unit="evil"
              :value="$store.getters['values']('evil.buyMaxGetter')()"
            > Evil</number-badge>
          </li>
          <li>
            Lose your souls, legion and upgrades
          </li>
          <li>
            Forget your path
          </li>
          <li>
            Start again in another realm
          </li>
        </ul>
        <p>
          Each Evil point increase your Hunt power, Minions power
          and the number of preys in your realm by
          {{ formatNumber($store.getters['values']('evil.basePower') + 1, 'compact', '%') }}
        </p>
        <div class="stackable row">
          <button @click.prevent="$store.commit('harvest', {evil: $store.getters['values']('evil.buyMaxGetter')()}); showHarvest = false">
            Start the harvest
          </button>
          <button @click.prevent="showHarvest = false">
            I am not done with this world
          </button>
        </div>
      </section>
      <section v-if="showSleep" class="narrow my-3">
        <h2>Everyone must rest</h2>
        <p>
          Maybe it's time for you to change paths and find new ways to play with your preys? 
        </p>
        <ul>
          <li>Devour your legion and souls</li>
          <li>Lose your upgrades</li>
          <li>Take a new path</li>
          <li>Wake up to a world full of preys</li>
        </ul>
        <div class="stackable row">
          <button @click.prevent="showSleep = false; $store.commit('sleep')">
            Go dormant for a while
          </button>
          <button @click.prevent="showSleep = false">
            Stay awake
          </button>
        </div>
      </section>
      <section v-if="$store.state.current.preys === 0" class="narrow my-3">
        <h2>The world is empty</h2>
        <p>
          You have consumed all life in your world. Your legion wanders aimlessly.
          It is time for you to go dormant until the world heal and you can hunt again.
        </p>
        <ul>
          <li>Devour your legion and souls</li>
          <li>Lose your upgrades</li>
          <li>Take a new path</li>
          <li>Wake up to a world full of preys</li>
        </ul>
        <button @click.prevent="showSleep = false; $store.commit('sleep')">
          Go dormant for a while
        </button>
      </section>
      <section v-if="$store.state.harvest.souls > 0" class="narrow">
        <div class="justify-content--space-between">

          <h2 class="mb-0">Legion</h2>
          <div>
            <number-badge
              unit="power"
              :value="parseInt($store.getters['values']('hunt.power'))"
            > Hunt power</number-badge>
            <number-badge
              unit="minions"
              class="ml-4"
              :value="parseInt($store.state.current.minions)"
              v-if="$store.state.current.minions > 0"
            > Minions</number-badge>
            <number-badge
              unit="occultists"
              class="ml-4"
              :value="parseInt($store.state.current.occultists)"
              v-if="$store.state.current.occultists > 0"
            > Occultists</number-badge>
          </div>
        </div>
        <div v-if="$store.getters['values']('minions.enabled')" class="mt-3">
          <h3>
            Turn preys into Minions 
          </h3>
          <div class="stackable row">
            <purchase-button
              v-for="quantity in [1, 10, 100]"
              :key="quantity"
              :quantity="quantity"
              :cost-getter="$store.getters['values']('minions.costGetter')"
              @purchase="$store.commit('purchase', {name: 'minions', quantity: $event.quantity, cost: $event.cost })"
            ></purchase-button>
            <purchase-button
              :quantity="'max'"
              :cost-getter="$store.getters['values']('minions.costGetter')"
              :max-quantity-getter="$store.getters['values']('minions.buyMaxGetter')"
              @purchase="$store.commit('purchase', {name: 'minions', quantity: $event.quantity, cost: $event.cost })"
            ></purchase-button>
          </div>
          <p v-if="$store.state.current.minions > 0">
            Your legion improves your power by
            <number-badge
              unit="power"
              :value="parseInt($store.getters['values']('minions.power.total'))"
            >
            </number-badge>.
          </p>
        </div>
        <div v-if="$store.getters['values']('occultists.enabled')" class="mt-2">
          <hr>
          <h3>
            Raise Occultists 
          </h3>
          <div class="stackable row">
            <purchase-button
              v-for="quantity in [1, 10, 100]"
              :key="quantity"
              :quantity="quantity"
              :cost-getter="$store.getters['values']('occultists.costGetter')"
              @purchase="$store.commit('purchase', {name: 'occultists', quantity: $event.quantity, cost: $event.cost })"
            ></purchase-button>
            <purchase-button
              :quantity="'max'"
              :cost-getter="$store.getters['values']('occultists.costGetter')"
              :max-quantity-getter="$store.getters['values']('occultists.buyMaxGetter')"
              @purchase="$store.commit('purchase', {name: 'occultists', quantity: $event.quantity, cost: $event.cost })"
            ></purchase-button>
          </div>
          <p v-if="$store.state.current.occultists > 0">
            Your occultists channel your legion into the mortal realm, granting you
            <number-badge
              unit="souls"
              :value="parseInt($store.getters['values']('occultists.soulsPerTick'))"
            ></number-badge>
            <template v-if="$store.getters['values']('pain.enabled') && $store.getters['values']('occultists.painPerTick') > 0">
              and
              <number-badge
                unit="pain"
                :value="parseInt($store.getters['values']('occultists.painPerTick'))"
              ></number-badge>

            </template>
            every second.
          </p>    
        </div>
      </section>
      <section class="narrow my-3" v-if="$store.getters['values']('upgrades.enabled')">
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
            <div>
              <button
                class="float--right"
                :disabled="$store.state.current.souls < upgrade.cost"
                @click.prevent="$store.commit('purchaseUpgrade', {id: upgrade.id, cost: upgrade.cost })"
              >
                Purchase for
                <number-badge
                  :value="upgrade.cost"
                  unit="souls"
                ></number-badge>
              </button>
              <strong>{{ upgrade.name }}</strong>
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
      showHarvest: false,
      showSleep: false,
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
          pain: this.$store.getters['values']('pain.enabled') ? this.$store.getters['values']('hunt.pain') : 0,
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
