<template>
  <section class="narrow" v-html="renderedDocument">
  </section>
</template>

<script>
import {renderMarkdown} from '@/utils'
import doc from '../../ABOUT.md';

export default {
  computed: {
    renderedDocument () {
      return renderMarkdown(doc)
    }
  }
}
</script>
