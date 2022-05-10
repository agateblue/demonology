<template>
  <span :class="['number-badge', type]">
    {{ formatNumber(value || 0, $store.state.settings.notation) }}<slot></slot>
  </span>
</template>

<script>
import {formatNumber} from '@/utils'

import Fire from '@/components/Fire'

export default {
  props: {
    value: {},
    type: {default: 'value'},
  },
  data () {
    return {
      formatNumber
    }
  }
}
</script>
