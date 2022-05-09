<template>
  <section class="py-3 vertical--center">
    <div class="text--center">
      <strong>🔥 You woke up, and you're hungry</strong>
      <p>
        You have {{ $store.state.current.souls }} souls
      </p>
      <button @click.prevent="$store.commit('increment', {name: 'souls', value: $store.getters['values']['souls.perClick']})">
        Gather {{ $store.getters['values']['souls.perClick'] }} souls
      </button>
    </div>

    <div class="text--center" v-if="$store.getters['values']['minions.enabled']">
      <hr>
      <strong>Minions</strong>
      <p>
        You have {{ $store.state.current.minions }} minions
      </p>
      <button
        :disabled="$store.state.current.souls < $store.getters.values['minions.cost']"
        @click.prevent="$store.commit('purchase', {name: 'minions', value: 1, cost: $store.getters.values['minions.cost'] })"
      >
        Buy 1 minion for {{ $store.getters.values['minions.cost'] }} souls.
      </button>
    </div>
    <div class="text--center" v-if="$store.getters['values']['upgrades.enabled']">
      <hr>
      <strong>Upgrades</strong>
      <table>
        <tbody>
          <tr v-for="upgrade in $store.getters['values']['upgrades.available']" :key="upgrade.key">
            <td>{{ upgrade.name }}</td>
            <td>{{ upgrade.description.replace('${value}', upgrade.value) }}</td>
            <td>{{ upgrade.cost }} souls</td>
            <td>
              <button
                :disabled="$store.state.current.souls < upgrade.cost"
                @click.prevent="$store.commit('purchaseUpgrade', {id: upgrade.id, cost: upgrade.cost })"
              >
                Purchase
              </button>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text--center">
      <hr>
      <button @click.prevent="$store.commit('reset')">
        Reset
      </button>
    </div>
  </section>
</template>

<script>

export default {}
</script>
