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
