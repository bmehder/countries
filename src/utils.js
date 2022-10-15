export const throttle = (func, delay = 1000) => {
  let lastTime = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - lastTime < delay) return
    lastTime = now
    func(...args)
  }
}
