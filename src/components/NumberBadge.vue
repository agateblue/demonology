<template>
  <span class="number-badge">
    <span v-if="unit" class="unit">
      {{ unitToIcon[unit]}}
    </span>
    <span class="value">
      {{ formatNumber(value || 0, $store.state.settings.notation) }}<slot></slot>
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
        soul: '⚱️',
        minion: '😈',
        occultist: '🕯️',
        prey: '🐇',
        power: '💪',
      },
      formatNumber
    }
  }
}
</script>
