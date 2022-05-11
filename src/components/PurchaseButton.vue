<template>
  <button @click.prevent="submit" :disabled="!canPurchase">
    <number-badge
      :value="cost.value"
      :unit="cost.unit"
    ></number-badge>
  </button>
</template>

<script>
import NumberBadge from '@/components/NumberBadge'

export default {
  props: {
    costGetter: {},
    quantity: {},
  },
  components: {
    NumberBadge,
  },
  computed: {
    cost () {
      return this.costGetter(this.quantity)
    },
    canPurchase () {
      return this.$store.state.current[this.cost.unit] >= this.cost.value
    },
    purchaseQuantity () {
      return this.quantity
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
