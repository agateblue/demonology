import { createApp } from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App).use(store).use(router)

function positionTooltip(parent, tooltip) {
  const screenPadding = 16
  const maxWidth = window.outerWidth - screenPadding * 2
  const width = Math.min(250, maxWidth)
  const parentRect = parent.getBoundingClientRect()

  tooltip.style.width = `${width}px`

  let widthDiff = parentRect.width - width
  let rightOverflow = parentRect.right - widthDiff + screenPadding - window.outerWidth
  if (rightOverflow > 0) {
    tooltip.style.right = `0px`

  } else if (parentRect.x + widthDiff / 2 <= 0) {
    tooltip.style.left = `0px`
  } else {
    tooltip.style.left = `${parseInt(widthDiff / 2)}px`
  }
}

function showTooltip (id) {
  return (event) => {
    let tooltip = document.getElementById(id)
    if (!event.target.contains(tooltip) && !tooltip.contains(event.target)) {
      event.target.appendChild(tooltip)
    }
    if (tooltip && !tooltip.classList.contains('visible')) {
      tooltip.classList.add('visible')
      positionTooltip(event.target, tooltip)
    }
  }
}
function hideTooltip () {
  return () => {
    let tooltips = document.querySelectorAll('[role=tooltip]')
    for (const tooltip of tooltips) {
      tooltip.classList.remove('visible')
    }
  }
}
app.directive('tooltip', (el, binding) => {
  let tooltipId = binding.value
  let openTimeout = null
  el.setAttribute('aria-describedby', tooltipId)
  el.setAttribute('tabindex', 0)
  el.classList.add('tooltip--parent')
  el.addEventListener('focus', showTooltip(tooltipId))
  el.addEventListener('blur', hideTooltip())
  el.addEventListener('mouseover', (event) => {
    if (openTimeout) {
      return
    }
    openTimeout = window.setTimeout(() => {
      openTimeout = null
      showTooltip(tooltipId)(event)
    }, 100);
  })
  el.addEventListener('mouseleave', () => {
    window.clearTimeout(openTimeout)
    openTimeout = null
    hideTooltip()()
  })
  el.addEventListener('click', showTooltip(tooltipId))
  document.addEventListener('click', function (event) {
    // hide tooltip when a click happens outside
    const withinBoundaries = event.composedPath().includes(event.target)
    if (!withinBoundaries) {
      hideTooltip()(event)
    }
  })
})
app.mount('#app')
