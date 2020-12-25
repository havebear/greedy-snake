
// 食物

(function () {
  let element = null

  class Food {
    constructor({ map, width = 20, height = 20, left = 0, top = 0, background = "#afafaf" } = {}) {
      Object.assign(this, { map, width, height, left, top, background })
      this.init()
    }
  
    init () {
      const { width, height, background } = this
      const _left = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width
      const _top = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height
      this.remove()
      this.left = _left
      this.top = _top
      element = document.createElement('div')
      Object.assign(element.style, {
        position: 'absolute',
        width: width + 'px',
        height: height + 'px',
        left: _left + 'px',
        top: _top + 'px',
        background
      })
      map.appendChild(element)
    }
  
    remove () {
      if (element) {
        element.parentElement.removeChild(element)
      }
    }
  }
  
  window.Food = Food
})()



