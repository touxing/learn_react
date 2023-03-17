
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

export function debounce(fn, delay) {
  let timer = null

  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}

export function throttled(fn, wait = 300, immediate=false) {
  let inThrottle = !immediate, lastFn, lastTime

  return function() {
    let context = this,
    args = arguments
    if(!inThrottle) {
      fn.apply(context, args)
      lastTime = Date.now()
      inThrottle = true
    } else {
      clearTimeout(lastFn)
      lastFn = setTimeout(function() {
        if(Date.now() - lastTime > wait) {
          fn.apply(context, args)
          lastTime = Date.now()
        }
      }, Math.max(wait - (Date.now() - lastTime), 0))
    }
  }
}
