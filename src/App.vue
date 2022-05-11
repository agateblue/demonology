<template>
  <nav
    class="text--center my-4"
    v-if="$store.getters['values']['upgrades.enabled']"
  >
    <router-link class="discrete" to="/">Lair</router-link> ·
    <!-- <router-link class="discrete" to="/">Lore</router-link> · -->
    <!-- <router-link class="discrete" to="/">Lord</router-link> · -->
    <router-link class="discrete" to="/settings">Settings</router-link> ·
    <router-link class="discrete" to="/about">About</router-link>
  </nav>
  <div class="text--center py-4">
    <h1 class="mt-4">Who am I?</h1>
    <fire></fire>
  </div>
  <div class="align-items--center justify-content--center my-4 text--2">
    <number-badge
      class="ml-4 float--right"
      unit="soul"
      :value="parseInt($store.state.current.souls)"
      v-if="$store.state.lifetime.souls > 0"
    > Souls</number-badge>
    <number-badge
      class="ml-4 float--right"
      unit="minion"
      :value="parseInt($store.state.current.minions)"
      v-if="$store.state.current.minions > 0"
    > Minions</number-badge>
    <number-badge
      class="ml-4 float--right"
      unit="occultist"
      :value="parseInt($store.state.current.occultists)"
      v-if="$store.state.current.occultists > 0"
    > Occultists</number-badge>
  </div>
  <router-view/>
  <div style="position: fixed; bottom: 1em; right: 1em" v-if="$store.state.settings.debug">
    <button @click.prevent="$store.commit('reset')">
      Reset
    </button>
  </div>
</template>
<script>
import Fire from '@/components/Fire'
import NumberBadge from '@/components/NumberBadge'

export default {
  components: {
    Fire,
    NumberBadge
  },
  data () {
    return {
      loop: null
    }
  },
  mounted () {
    let interval = 300
    this.loop = window.setInterval(() => {
      this.$store.dispatch('tick')
    }, interval)
  },
  unmounted () {
    window.clearInverval(this.loop)
  }
}
</script>
<style>
  @import './styles.css';
</style>
