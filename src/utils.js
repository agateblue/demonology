import { marked } from 'marked'

export function renderMarkdown (source) {
  return marked.parse(source)
}

const NOTATIONS = {
  default: new Intl.NumberFormat('en-US', {notation: 'compact', minimumFractionDigits: 0, maximumFractionDigits: 2}),
  compact: new Intl.NumberFormat('en-US', {notation: 'compact', minimumFractionDigits: 0, maximumFractionDigits: 2}),
  scientific: new Intl.NumberFormat('en-US', {notation: 'scientific', minimumFractionDigits: 0, maximumFractionDigits: 2}),
}
export function formatNumber (n, notation = 'default', valueFormat = null) {
  let suffix = ''
  if (valueFormat === '%') {
    n = (n - 1) * 100
    suffix = ' %'
  }
  let f = NOTATIONS[notation]
  return f.format(n) + suffix
}