/*
 * @Author: 616749285@qq.com
 * @Date: 2020-12-25 09:35:36
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-12-29 18:04:23
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
      this.map = document.getElementById(id)
      this.snack = new Snack({ map: this.map })
      this.food = new Food({ map: this.map })
      this.changeDirection(this.snack)
    }

    start () {
      this.move()
    }

    move () {
      clearTimeout(timer)
      const { snack, food } = this
      snack.move(food)
      const { left: headX, top: headY } = snack.body[0]
      const maxX = map.offsetWidth - snack.width
      const maxY = map.offsetHeight - snack.height
      if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
        clearTimeout(timer)
        // alert('游戏结束')
        return
      }
      timer = setTimeout(() => {
        this.move()
      }, 500)
    }

    changeDirection (snake) {
      document.addEventListener('keydown', e => {
        console.log(e.key)
        const temp = DIRECTION_MAP.get(e.key)
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