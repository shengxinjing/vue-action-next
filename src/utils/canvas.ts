export type CircleType = InstanceType<typeof Circle>

export class Circle {
  x: number
  y: number
  r: number // 半径
  mx: number // 最大x
  my: number // 最大y
  colors: string[]
  constructor(x: number, y: number, r: number = Math.random() * 10) {
    this.x = x
    this.y = y
    this.r = r
    this.mx = Math.random()
    this.my = Math.random()
    this.colors = ['#ff4d4f', '#73d13d', '#4096ff']
  }

  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 360)
    ctx.closePath()
    ctx.fillStyle = this.colors[Math.round(this.r) % this.colors.length]
    ctx.fill()
  }

  drawLine(ctx: CanvasRenderingContext2D, _circle: CircleType) {
    const dx = this.x - _circle.x
    const dy = this.y - _circle.y
    const d = Math.sqrt(dx * dx + dy * dy)
    if (d < 150) {
      ctx.beginPath()
      // 画一条线
      ctx.moveTo(this.x, this.y) // 起始点
      ctx.lineTo(_circle.x, _circle.y) // 终点
      ctx.closePath()
      ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)'
      ctx.stroke()
    }
  }

  move(w: number, h: number) {
    this.mx = (this.x < w && this.x > 0) ? this.mx : (-this.mx)
    this.my = (this.y < h && this.y > 0) ? this.my : (-this.my)
    this.x += this.mx / 2
    this.y += this.my / 2
  }
}
