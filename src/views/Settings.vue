<template>
  <section class="narrow">
    <h1>Settings</h1>
    <div class="checkbox field">
      <input
        id="debug"
        name="debug"
        type="checkbox"
        @change="$store.commit('setting', {name: 'debug', value: $event.target.checked})"
        :checked="$store.state.settings.debug">
      <label for="debug">Enable debug mode</label>
    </div>
    <hr>
    <p>
      Reset all your progress and delete all your data.
      Proceed with caution, this is irreversible.
      You will be asked for confirmation.
    </p>
    <button @click.prevent="triggerReset">
      Hard reset
    </button>
  </section>
</template>

<script>

export default {
  methods: {
    triggerReset () {
      if (window.confirm("Do you want to erase all your data and start from a blank state?")) {
        this.$store.commit("hardReset")
        this.$router.push("/")
      } 
    }
  }
}
</script>
