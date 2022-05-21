<template>
  <button @click.prevent="submit" :disabled="!canPurchase">
    <template v-if="quantity === 'max'">
      Max (<number-badge
        :value="realQuantity"
      ></number-badge>)
    </template>
    <template v-else>
      {{ realQuantity }} for
      <number-badge
        
        :value="cost.value"
        :unit="cost.unit"
      ></number-badge>
    </template>
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
