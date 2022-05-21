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
    <h2>Keyboard shortcuts</h2>
    <table>
      <thead>
        <th>Key(s)</th>
        <th>Effect</th>
      </thead>
      <tbody>
        <tr v-for="hotkey in hotkeys" :key="hotkey.key">
          <td>
            <code class="text--2">
              {{ hotkey.key }}
            </code>
          </td>
          <td>{{ hotkey.effect }}</td>
        </tr>
      </tbody>
    </table>
    <h2>Reset</h2>
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
  data () {
    return {
      hotkeys: [
        {key: '1', effect: 'Show Netherworld tab'},
        {key: '2', effect: 'Show Settings tab'},
        {key: '3', effect: 'Show Statistics tab'},
        {key: '4', effect: 'Show About tab'},
        {key: 'h', effect: 'Hunt'},
        {key: 'u', effect: 'Purchase all available upgrades'},
        {key: 'm', effect: 'Purchase 1 minion'},
        {key: 'ctrl+m', effect: 'Purchase 10 minions'},
        {key: 'shift+m', effect: 'Purchase 100 minions'},
        {key: 'ctrl+shift+m', effect: 'Purchase max minions'},
        {key: 'o', effect: 'Purchase 1 occultist'},
        {key: 'ctrl+o', effect: 'Purchase 10 occultists'},
        {key: 'shift+o', effect: 'Purchase 100 occultists'},
        {key: 'ctrl+shift+o', effect: 'Purchase max occultists'},
        {key: 'ctrl+d', effect: 'Enable/disable debug mode'},
      ]
    }
  },
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
