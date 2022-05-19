import hotkeys from 'hotkeys-js'

export function bind (config) {
  config.forEach((c) => {
    hotkeys(c.key, (event, handler) => {c.handler(event, handler); return false})
  })
}
export function unbind (config) {
  config.forEach((c) => {
    hotkeys.unbind(c.key)
  })
}