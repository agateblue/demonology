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
    <h1 class="mt-4">Who am I?</h1>
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
      this.$store.dispatch('tick', (new Date()).getTime())
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
