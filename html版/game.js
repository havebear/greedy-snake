/*
 * @Author: 616749285@qq.com
 * @Date: 2020-12-25 09:35:36
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-12-30 14:14:01
 * @Description:  
 */

(function () {
  const DIRECTION_MAP = new Map([
    ['ArrowRight', { d: 'right', c: 'left' }],
    ['ArrowDown', { d: 'bottom', c: 'top' }],
    ['ArrowLeft', { d: 'left', c: 'right' }],
    ['ArrowUp', { d: 'top', c: 'bottom' }],
  ])
  let timer = null
  class Game {
    constructor (id) {
      this.state = false
      this.map = document.getElementById(id)
      this.snack = new Snack({ map: this.map })
      this.food = new Food({ map: this.map })
      this.changeDirection(this.snack)
    }

    start () {
      this.state = true
      this.move()
    }

    move () {
      clearTimeout(timer)
      if (!this.state) return
      const { snack, food } = this
      const { left: headX, top: headY } = snack.body[0]
      const { direction } = snack
      const maxX = map.offsetWidth - snack.width
      const maxY = map.offsetHeight - snack.height
      if (
        (headX <= 0 && direction === "left") ||
        (headX >= maxX && direction === "right") ||
        (headY <= 0 && direction === "top") ||
        (headY >= maxY && direction === "bottom")
      ) {
        this.state = false
        return clearTimeout(timer)
      }
      snack.move(food)
      timer = setTimeout(() => {
        this.move()
      }, 500)
    }

    changeDirection (snake) {
      document.addEventListener('keydown', e => {
        const temp = DIRECTION_MAP.get(e.key)
        if (!temp) return
        if (temp.d === snake.direction) {
          this.move()
        } else {
          snake.direction !== temp.c && (snake.direction = temp.d)
        }
      })
    }
  }

  window.Game = Game
})()