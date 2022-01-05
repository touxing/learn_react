
export function getClient() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    heihgt: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }
}

export function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop
}

/**
 * @desc 随机数 整数
 * @param {*} min
 * @param {*} max
 * @returns
 */
export function random(min=0, max=1) {
  return Math.floor(Math.random() * max) + max - min
}
