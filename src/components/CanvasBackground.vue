<template>
  <div>
    xx
  </div>
    <canvas
      @mousemove="mousemove"
      @mouseout="mouseout"
      class="canvas-bg"
      ref="canvasRef"></canvas>
  
</template>




<script setup lang="ts">
// import { Button, Result } from "antd"
import {ref,onMounted} from 'vue'
import type { CircleType } from '@/utils/'
import { Circle } from '@/utils/'
  const canvasRef = ref<HTMLCanvasElement>()
  const current_circle = new Circle(0, 0, 8)

  function mousemove(e: MouseEvent){
    current_circle.x = e.clientX
    current_circle.y = e.clientY
  }
  function mouseout(){
    current_circle.x = -1
    current_circle.y = -1
  }
  onMounted(()=>{
    const canvas = canvasRef.value as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const w = canvas.width = canvas.offsetWidth
    const h = canvas.height = canvas.offsetHeight

    const circles: CircleType[] = []

    const draw = function () {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < circles.length; i++) {
        // 移动一下
        circles[i].move(w, h)
        // 画个圆
        circles[i].drawCircle(ctx)
        // 和其他圆画个线
        for (let j = i + 1; j < circles.length; j++)
          circles[i].drawLine(ctx, circles[j])
      }
      if (current_circle.x > 0) {
        current_circle.drawCircle(ctx)
        for (let k = 1; k < circles.length; k++)
          current_circle.drawLine(ctx, circles[k])
      }
      window.requestAnimationFrame(draw)
    }
    const init = function (num: number) {
      for (let i = 0; i < num; i++) {
        const c: Circle = new Circle(Math.random() * w, Math.random() * h)
        circles.push(c)
      }
      draw()
    }
    init(60)
  })


</script>

<style>

.canvas-bg{
  position:absolute;
  z-index:1;
  display: block;
  width: 100%;
  height: 100%;
}
</style>