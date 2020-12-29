(function () {
  let elements = []

  const genBodyItem = (data, { width, height, color }) => {
    const div = document.createElement('div')
    Object.assign(div.style, {
      position: 'absolute',
      zIndex: 1,
      width: width + 'px',
      height: height + 'px',
      left: data.left + 'px',
      top: data.top + 'px',
      background: color
    })
    return div
  }

  class Snack {
    constructor({ map, width = 20, height = 20, direction = "right", color = '#333333' } = {}) {
      Object.assign(this, {
        map,
        width,
        height,
        direction,
        color,
        body: new Array(3)
          .fill(3)
          .map((item, index) => ({ left: index * width, top: 0 }))
          .reverse()
      })
      this.init()
    }

    init () {
      const { body, map } = this
      body.forEach(item => {
        const bodyItem = genBodyItem(item, this)
        map.appendChild(bodyItem)
        elements.push(bodyItem)
      })
    }

    // 暂定思路：把数组最后一个pop，修改后unshift回去
    move (food) {
      // console.log(this)
      // debugger
      const { body, direction, width, height } = this
      const currentHead = body[0]
      const nextHead = { ...currentHead }
      const lastBodyItem = body[body.length - 1]
      // 计算头部下一个位置
      switch (direction) {
        case 'top':
          nextHead['top'] = currentHead['top'] - height
          break
        case 'right':
          nextHead['left'] = currentHead['left'] + width
          break
        case 'bottom':
          nextHead['top'] = currentHead['top'] + height
          break
        case 'left':
          nextHead['left'] = currentHead['left'] - width
          break
        default: break
      }
      // 移动元素索引位置
      elements.unshift(elements.pop())
      // 移动对应body节点位置
      body.unshift(nextHead)
      Object.assign(elements[0].style, { left: nextHead.left + 'px', top: nextHead.top + 'px' })
      // 移动过程中，判断是否和食物的位置相同，是则增加节点，创建新食物
      if (currentHead.left === food.left && currentHead.top === food.top) {
        const newBodyItem = genBodyItem(lastBodyItem, this)
        map.appendChild(newBodyItem)
        elements.push(newBodyItem)
        food.init()
      } else {
        body.pop()
      }
      // 移动完成后
      // console.log(elements)
    }

    // 移除dom节点
    remove () {
      if (elements.length) {
        elements.forEach(item => {
          this.map.removeChild(item)
        })
        elements = []
      }
    }
  }

  window.Snack = Snack
})()
