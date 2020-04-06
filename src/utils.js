export function myTypeOf (data) {
  return Object.prototype.toString.call(data).slice(8, -1)
}

export function nextTick (fn) {
  return Promise.resolve().then(() => { fn() })
}
