<template>
  <nav
    class="text--center my-4"
  >
    <router-link class="discrete" to="/">Netherworld</router-link> ·
    <!-- <router-link class="discrete" to="/">Lore</router-link> · -->
    <!-- <router-link class="discrete" to="/">Lord</router-link> · -->
    <router-link class="discrete" to="/settings">Settings</router-link> ·
    <router-link class="discrete" to="/statistics">Statistics</router-link> ·
    <router-link class="discrete" to="/about">About</router-link>
  </nav>
  <div class="text--center py-4">
    <h1 class="mt-4">
      <template v-if="!$store.state.current.name">Who am I?</template>
      <template v-else>
        I am {{ $store.getters['values']('names.current').name }}, {{ $store.getters['values']('names.current').title }} 
      </template>
    </h1>
    <div class="align-items--center justify-content--center">
      <fire class="mr-4"></fire>
      <div class="py-2" v-if="$store.getters['values']('prompts.current')">
        <p v-for="(row, idx) in $store.getters['values']('prompts.current').text" :key="idx">
          <i>
            {{ row }}
          </i>
        </p>
      </div>
    </div>
  </div>
  <div class="align-items--center justify-content--center mb-4 text--2">
    <number-badge
      class="ml-4 float--right"
      unit="souls"
      :value="parseInt($store.state.current.souls)"
      v-if="$store.state.lifetime.souls > 0"
    > Souls</number-badge>
    <number-badge
      class="ml-4 float--right"
      unit="preys"
      :value="parseInt($store.state.current.preys)"
      v-if="$store.getters['values']('preys.enabled')"
    > Preys</number-badge>
    <number-badge
      class="ml-4 float--right"
      unit="pain"
      :value="parseInt($store.state.current.pain)"
      v-if="$store.getters['values']('pain.enabled')"
    > Pain</number-badge>
  </div>
  <router-view/>
  <div style="position: fixed; bottom: 1em; right: 1em" v-if="$store.state.settings.debug">
    <button @click.prevent="$store.commit('reset')">
      Reset
    </button>
  </div>
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
    return {
      loop: null,
      hotkeys: [
        {key: '&, 1', handler: () => { this.$router.push('/')}},
        {key: 'é, 2', handler: () => { this.$router.push('/settings')}},
        {key: '", 3', handler: () => { this.$router.push('/statistics')}},
        {key: "', 4", handler: () => { this.$router.push('/about')}},
        {key: "ctrl+d", handler: () => { this.$store.commit('setting', {name: 'debug', value: !this.$store.state.settings.debug})}},
      ]
    }
  },
  mounted () {
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
