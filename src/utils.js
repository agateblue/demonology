import { marked } from 'marked'

export function renderMarkdown (source) {
  return marked.parse(source)
}

function toExp(n) {
  return n.toExponential(2).replace('+', '')
}

const PERCENT_FORMAT = new Intl.NumberFormat('en-US', {notation: 'compact', minimumFractionDigits: 0})
const SHORT_FORMAT = Intl.NumberFormat('en-US')
const NOTATIONS = {
  'short': (n) => {
    return SHORT_FORMAT.format(parseInt(n))
  },
  'exponential': toExp,
  'default': toExp,
  '%': (n) => {
    n = (n - 1) * 100
    return PERCENT_FORMAT.format(n) + ' %'
  },
  'raw%': (n) => {
    return PERCENT_FORMAT.format(n) + ' %'
  }
}
export function formatNumber (n, notation = 'default') {
  if (notation === 'default' && n < 10000) {
    notation = 'short' 
  }
  let formatter = NOTATIONS[notation] || NOTATIONS['default']

  return formatter(n)
}