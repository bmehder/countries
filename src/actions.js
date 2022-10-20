// Click Outside
export const clickOutside = (element, callbackFunction) => {
  const handleClick = evt => !element.contains(evt.target) && callbackFunction()

  document.body.addEventListener('click', handleClick, { capture: true })

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction
    },
    destroy() {
      document.body.removeEventListener('click', handleClick)
    },
  }
}

// Viewport
let intersectionObserver

const ensureIntersectionObserver = () => {
  if (intersectionObserver) return

  intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const eventName = entry.isIntersecting ? 'enterViewport' : 'exitViewport'
      entry.target.dispatchEvent(new CustomEvent(eventName))
    })
  })
}

export const viewport = element => {
  ensureIntersectionObserver()

  intersectionObserver.observe(element)

  return {
    destroy() {
      intersectionObserver.unobserve(element)
    },
  }
}
