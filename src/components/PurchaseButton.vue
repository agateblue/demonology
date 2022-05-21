<template>
  <button @click.prevent="submit" :disabled="!canPurchase">
    <number-badge
      v-if="quantity === 'max'"
      :value="realQuantity"
    ></number-badge>
    <number-badge
      v-else
      :value="cost.value"
      :unit="cost.unit"
    ></number-badge>
  </button>
</template>

<script>
import NumberBadge from '@/components/NumberBadge'

export default {
  props: {
    maxQuantityGetter: {},
    costGetter: {},
    quantity: {},
  },
  components: {
    NumberBadge,
  },
  computed: {
    realQuantity () {
      if (this.quantity === 'max') {
        return this.maxQuantityGetter()
      } {
        return this.quantity
      }
    },
    cost () {
      return this.costGetter(this.realQuantity)
    },
    canPurchase () {
      if (this.realQuantity === 0) {
        return false
      }
      return this.$store.state.current[this.cost.unit] >= this.cost.value
    },
    purchaseQuantity () {
      return this.realQuantity
    }
  },
  methods: {
    submit () {
      if (!this.canPurchase) {
        return
      }
      this.$emit('purchase', {cost: this.cost, quantity: this.purchaseQuantity})
    }
  }
}
</script>
