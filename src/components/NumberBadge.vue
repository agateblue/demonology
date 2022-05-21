<template>
  <span class="number-badge">
    <span v-if="unit" class="unit">
      {{ unitToIcon[unit]}}
    </span>
    <template v-if="prefix">{{ prefix }} </template>
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
    prefix: {}
  },
  data () {
    return {
      unitToIcon: {
        souls: '⚱️',
        minions: '😈',
        occultists: '🕯️',
        preys: '🐇',
        power: '💪',
        pain: '🌀',
        evil: '🩸',

      },
      formatNumber
    }
  }
}
</script>
