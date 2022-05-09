export function formatNumber (n, notation = "standard") {
  let f = new Intl.NumberFormat('en-US', {notation: notation})
  return f.format(n)
}