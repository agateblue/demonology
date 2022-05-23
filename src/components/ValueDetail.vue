<template>
  <table v-if="source.length > 0">
    <tbody>
      <tr v-for="row, idx in source" :key="idx">
        <td>
          {{ row.label }}
        </td>
        <td class="text--monospace text--right">
          <template v-if="row.prefix">
            {{ row.prefix }}
          </template>
          {{ formatNumber(row.value, row.notation || 'default') }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import {formatNumber} from '@/utils'


export default {
  props: {
    source: {}
  },
  data () {
    return {
      formatNumber,
    }
  }
}
</script>