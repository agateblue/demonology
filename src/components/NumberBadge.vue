<template>
  <span class="number-badge">
    <span v-if="unit" class="unit">
      {{ unitToIcon[unit]}}
    </span>
    <span class="value">
      {{ formatNumber(value || 0) }}<slot></slot>
    </span>
  </span>
</template>

<script>
import {formatNumber} from '@/utils'

export default {
  props: {
    value: {},
    unit: {},
  },
  data () {
    return {
      unitToIcon: {
        souls: '⚱️',
        minions: '😈',
        occultists: '🕯️',
        preys: '🐇',
        power: '💪',
      },
      formatNumber
    }
  }
}
</script>
