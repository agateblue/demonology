<template>
  <section>
    <img alt="Vue logo" src="../assets/logo.png">
    You have {{ $store.state.current.souls }} souls

    <button @click.prevent="$store.commit('increment', {name: 'souls', value: 1})">
      Gather {{ $store.getters["soulsPerClick"] }} souls
    </button>
  </section>
</template>

<script>

export default {}
</script>
