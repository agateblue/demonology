<template>
  <nav v-if="false">
    <router-link to="/">Home</router-link>
  </nav>
  <router-view/>
</template>
<script>

export default {
  data () {
    return {
      loop: null
    }
  },
  mounted () {
    let interval = 300
    this.loop = window.setInterval(() => {
      this.$store.dispatch('tick', interval)
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
