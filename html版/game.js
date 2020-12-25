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
        const maxX = map.offsetWidth - snack.width
        const maxY = map.offsetHeight - snack.height
        const headX = snack.left
        const headY = snack.top
        if (headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
          clearInterval(timer)
          alert('游戏结束')
        }
      }, 100)
    }


  }

  window.Game = Game
})()