export function clickOutside(element, callbackFunction) {
  function onClick(event) {
    !element.contains(event.target) && callbackFunction()
  }

  setTimeout(() => document.body.addEventListener('click', onClick), 10)

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction
    },
    destroy() {
      document.body.removeEventListener('click', onClick)
    },
  }
}
