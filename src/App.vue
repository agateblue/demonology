<template>
  <div class="text--center my-4">
    <h1>Who am I?</h1>
    <fire></fire>
  </div>
  <nav
    class="text--center mb-4"
    v-if="$store.getters['values']['upgrades.enabled']"
  >
    <router-link class="discrete" to="/">Lair</router-link> ·
    <!-- <router-link class="discrete" to="/">Lore</router-link> · -->
    <!-- <router-link class="discrete" to="/">Lord</router-link> · -->
    <router-link class="discrete" to="/settings">Settings</router-link> ·
    <router-link class="discrete" to="/about">About</router-link>
  </nav>
  <router-view/>
  <div style="position: fixed; bottom: 1em; right: 1em" v-if="$store.state.settings.debug">
    <button @click.prevent="$store.commit('reset')">
      Reset
    </button>
  </div>
</template>
<script>
import Fire from '@/components/Fire'

export default {
  components: {
    Fire,
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
