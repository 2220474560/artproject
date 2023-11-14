<template>
  <div>
    <canvas ref="canvas" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'DrawingCanvas',
  setup() {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let ctx: CanvasRenderingContext2D | null = null;

    onMounted(() => {
      if (canvasRef.value) {
        const canvas = canvasRef.value;
        ctx = canvas.getContext('2d')!;
        console.log(ctx); // 打印 ctx 的值
        if (ctx) {
          ctx.lineJoin = 'round';
          ctx.lineCap = 'round';
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 5;
        }
      }
    });

    const draw = (x: number, y: number) => {
    if (!isDrawing || !canvasRef.value || !ctx) {
      console.log('isDrawing');
      return;
    }
    console.log('Drawing:', x, y)
    const canvas = canvasRef.value;
    ctx.lineTo(x, y); // 绘制直线到目标点 
    ctx.stroke(); // 绘制路径
    lastX = x;
    lastY = y;
    };
    
    //监听鼠标点击
    const onMouseDown = (event: MouseEvent) => {
      console.log('mouse down');
      isDrawing = true;
      lastX = event.offsetX;
      lastY = event.offsetY;
      if (ctx) {
        ctx.beginPath(); // 开始新的路径
        ctx.moveTo(lastX, lastY); // 设置路径的起点
      }
    }

    // 监听鼠标移动
    const onMouseMove = (event: MouseEvent) => {
      console.log('mouse move');
      draw(event.offsetX, event.offsetY);
    };

    const onMouseUp = () => {
      isDrawing = false;
      if (ctx) {
        ctx.closePath();
      }
    };

    return { canvasRef, onMouseDown, onMouseMove, onMouseUp };

  }
})
</script>

<style>
canvas {
  background-color: aqua;
  width:100% ;
  height: 800px;
}
</style>