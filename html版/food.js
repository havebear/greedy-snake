
// 食物

(function () {
  let element = null

  const genFoodPostion = (bodys = [], { offsetWidth, offsetHeight }, { width, height }) => {
    const maxX = offsetWidth / width
    const maxY = offsetHeight / height

    const gen = () => {
      let left = parseInt(Math.random() * (maxX)) * width
      let top = parseInt(Math.random() * (maxY)) * height
      console.log({ left, top })
      if (bodys.find(item => item.left === left && item.top === top)) {
        return gen()
      }
      return { left, top }
    }

    return gen()
  }

  class Food {
    constructor({ map, width = 20, height = 20, left = 0, top = 0, background = "#afafaf" } = {}) {
      Object.assign(this, { map, width, height, left, top, background })
    }
  
    init (snake = {}) {
      const { width, height, background } = this
      const position = genFoodPostion(snake.bodys, map, { width, height })
      this.remove()
      Object.assign(this, position)
      element = document.createElement('div')
      Object.assign(element.style, {
        position: 'absolute',
        zIndex: 0,
        width: width + 'px',
        height: height + 'px',
        left: position.left + 'px',
        top: position.top + 'px',
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



