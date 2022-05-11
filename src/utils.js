import { marked } from 'marked'

export function renderMarkdown (source) {
  return marked.parse(source)
}

export function formatNumber (n, notation = "standard", valueFormat = null) {
  let suffix = ''
  if (valueFormat === '%') {
    n = (n - 1) * 100
    suffix = ' %'
  }
  let f = new Intl.NumberFormat('en-US', {notation: notation})
  return f.format(n) + suffix
}