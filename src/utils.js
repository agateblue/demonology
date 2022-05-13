import { marked } from 'marked'

export function renderMarkdown (source) {
  return marked.parse(source)
}

const NOTATIONS = {
  compact: new Intl.NumberFormat('en-US', {notation: 'compact', minimumFractionDigits: 2})
}
export function formatNumber (n, notation = "compact", valueFormat = null) {
  let suffix = ''
  if (valueFormat === '%') {
    n = (n - 1) * 100
    suffix = ' %'
  }
  let f = NOTATIONS[notation]
  return f.format(n) + suffix
}