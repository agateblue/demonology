<template>
  <section v-if="duplicateTab" class="mt-4 tiny">
    <h1>
      A Demonology tab is already opened
    </h1>
    <p>Another Demonology tab is open, please close this one and use the other one to avoid bugs and glitches.</p>
  </section>
  <template v-else>
    <nav
      class="text--center my-4"
    >
      <router-link class="discrete" to="/">Netherworld</router-link> ·
      <router-link class="discrete" to="/statistics">Statistics</router-link> ·
      <router-link class="discrete" to="/story">Story</router-link>
    </nav>
    <div class="text--center py-2">
      <h1 class="mt-4 mb-2">
        <template v-if="!$store.state.current.name">Who am I?</template>
        <template v-else>
          I am {{ $store.getters['values']('names.current').name }}, {{ $store.getters['values']('names.current').title }} 
        </template>
      </h1>
      <div class="align-items--center justify-content--center">
        <fire class="mr-4"></fire>
        <div v-if="$store.getters['values']('prompts.current')">
          <p
            v-for="(row, idx) in $store.getters['values']('prompts.current').text"
            :key="idx"
            class="my-0"
          >
            <i>
              {{ row }}
            </i>
          </p>
        </div>
      </div>
    </div>
    <div class="align-items--center justify-content--center my-2 text--2 text--center">
      <span v-if="$store.state.awakening.souls > 0">
        <tooltip id="tooltip-souls">
          <p>
            Souls let you expand your legion and purchase upgrade.
            <template v-if="$store.getters['values']('occultists.soulsPerTick') > 0">
              Your occultists gather souls each second.
            </template>
          </p>
          <value-detail :source="$store.getters['values']('occultists.soulsPerTick.detail')"></value-detail>
        </tooltip>
          
        <number-badge
          unit="souls"
          :value="$store.state.current.souls"
          v-tooltip="'tooltip-souls'"
        > Souls</number-badge>
      </span>
      <span v-if="$store.getters['values']('prey.enabled')">
        <tooltip id="tooltip-prey">
          <p>
            A prey dies for every soul gathered.
            <template v-if="$store.getters['values']('prey.breedingRate') > 0">
              Through breeding, the flock gives birth to new prey every second.
            </template>
          </p>
          <value-detail :source="$store.getters['values']('prey.breedingRate.detail')"></value-detail>
        </tooltip>
        <number-badge
          class="ml-4"
          unit="prey"
          :value="$store.state.current.prey"
          v-tooltip="'tooltip-prey'"
        > Prey</number-badge>
      </span>
      <span v-if="$store.getters['values']('pain.enabled')">
        <tooltip id="tooltip-pain">
          <p>
            Hunting prey grant you pain, based on your hunt power.
          </p>
          <value-detail :source="$store.getters['values']('hunt.pain.detail')"></value-detail>
          <template v-if="$store.getters['values']('occultists.painPerTick') > 0">
            <p>
              Your occultists collect pain from your flock each second.
            </p>
            <value-detail :source="$store.getters['values']('occultists.painPerTick.detail')"></value-detail>
          </template>
        </tooltip>
        <number-badge
          class="ml-4"
          unit="pain"
          :value="$store.state.harvest.pain"
          v-tooltip="'tooltip-pain'"
        > Pain</number-badge>
      </span>
      <span v-if="$store.state.total.evil > 0">
        <tooltip id="tooltip-evil">
          <p>
            Evil multiply your hunt power, the power of your legion and the initial size of your flock.
          </p>
          <value-detail :source="$store.getters['values']('evil.power.detail')"></value-detail>
        </tooltip>
        <number-badge
          class="ml-4"
          unit="evil"
          :value="$store.state.total.evil"
          v-tooltip="'tooltip-evil'"          
        > Evil</number-badge>
      </span>
    </div>
    <router-view class="view" />
    <footer
      class="text--center my-4"
    >

      <router-link class="discrete" to="/settings">Settings</router-link> ·
      <router-link class="discrete" to="/about">About</router-link>
    </footer>
    <div style="position: fixed; bottom: 1em; right: 1em" v-if="$store.state.settings.debug">
      <button @click.prevent="$store.commit('hardReset')">
        Reset
      </button>
    </div>
  </template>
</template>
<script>
import {bind, unbind} from '@/hotkeys'

import Fire from '@/components/Fire'
import Tooltip from '@/components/Tooltip'
import ValueDetail from '@/components/ValueDetail'

import NumberBadge from '@/components/NumberBadge'

export default {
  components: {
    Fire,
    NumberBadge,
    Tooltip,
    ValueDetail,
  },
  data () {
    let hotkeys = [
      {key: '&, 1', handler: () => { this.$router.push('/')}},
      {key: 'é, 2', handler: () => { this.$router.push('/statistics')}},
      {key: '", 3', handler: () => { this.$router.push('/story')}},
      {key: 's', handler: () => { this.$router.push('/settings')}},
      {key: "a", handler: () => { this.$router.push('/about')}},
    ]

    if (this.$store.getters.allowDebugMode) {
      hotkeys.push({key: "ctrl+d", handler: () => { this.$store.commit('setting', {name: 'debug', value: !this.$store.state.settings.debug})}})
    }
    return {
      loop: null,
      duplicateTab: false,
      hotkeys
    }
  },
  mounted () {
    // ensure multiple tabs of the game don't run in parallel
    const bc = new BroadcastChannel("demonology")

    bc.onmessage = (event) => {
      if (event.data === `started`) {
        bc.postMessage(`already opened`)
      }
      if (event.data === `already opened`) {
        this.duplicateTab = true
      }
    }

    bc.postMessage(`started`)
    if (this.duplicateTab) {
      return
    }
    bind(this.hotkeys)
    let interval = 300
    this.loop = window.setInterval(() => {
      this.$store.dispatch('tick', (new Date()).getTime())
    }, interval)
  },
  unmounted () {
    unbind(this.hotkeys)
    window.clearInverval(this.loop)
  }
}
</script>
<style>
  @import './styles.css';
</style>
