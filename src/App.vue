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
      <!-- <router-link class="discrete" to="/">Lore</router-link> · -->
      <!-- <router-link class="discrete" to="/">Lord</router-link> · -->
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
    <div class="align-items--center justify-content--center mt-4 mb-4 text--2 text--center">
      <number-badge
        class="ml-4"
        unit="souls"
        :value="parseInt($store.state.current.souls)"
        v-if="$store.state.awakening.souls > 0"
      > Souls</number-badge>
      <number-badge
        class="ml-4"
        unit="prey"
        :value="parseInt($store.state.current.prey)"
        v-if="$store.getters['values']('prey.enabled')"
      > Prey</number-badge>
      <number-badge
        class="ml-4"
        unit="pain"
        :value="parseInt($store.state.harvest.pain)"
        v-if="$store.getters['values']('pain.enabled')"
      > Pain</number-badge>
      <number-badge
        class="ml-4"
        unit="evil"
        :value="parseInt($store.state.total.evil)"
        v-if="$store.state.total.evil > 0"
      > Evil</number-badge>
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
import NumberBadge from '@/components/NumberBadge'

export default {
  components: {
    Fire,
    NumberBadge
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
