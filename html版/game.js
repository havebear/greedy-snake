(function () {
  class Game {
    constructor (id) {
      this.map = document.getElementById(id)
      this.snack = new Snack({ map: this.map })
      this.food = new Food({ map: this.map })
    }

    start () {
      const timer = setInterval(() => {
        const { snack, food } = this
        snack.move(food)
        const { left: headX, top: headY } = snack.body[0]
        const maxX = map.offsetWidth - snack.width
        const maxY = map.offsetHeight - snack.height
        console.log({ maxX, maxY, headX, headY })
        if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
          clearInterval(timer)
          alert('游戏结束')
        }
      }, 1000)
    }


  }

  window.Game = Game
})()