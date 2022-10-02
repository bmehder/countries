export function clickOutside(element, callbackFunction) {
  function handleClick(event) {
    !element.contains(event.target) && callbackFunction()
  }

  setTimeout(() => document.body.addEventListener('click', handleClick), 10)

  return {
    update(newCallbackFunction) {
      callbackFunction = newCallbackFunction
    },
    destroy() {
      document.body.removeEventListener('click', handleClick)
    },
  }
}
