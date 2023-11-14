<template>
  <div>
    <div @mousemove="handleMouseMove "  class="tracker-area">
        <img src="../assets/logo.svg" @click="handleImageClick" class="svg-image" :style="{ left: `${position.x}px`, top: `${position.y}px` }" alt="Logo">
    </div>
    <el-button class="draw" @click="drawing">画画</el-button>
    <el-button class="draw" @click="line">连线</el-button>
  </div>

</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

interface Point {
  x: number | null;
  y: number | null;
}

export default {
  name: 'MouseTracker',
  setup() {
    const router = useRouter()
    const position = ref({ x: 0, y: 0 });
    const referencePoint = ref<Point>({ x: null, y: null });
    const isMoving = ref(false); // 用于控制移动状态的标识

    // 点击事件处理函数
    const handleImageClick = (event: MouseEvent) => {
      console.log('Mouse move event captured');
      if (isMoving.value) {
         // 停止移动
        isMoving.value = false;
        referencePoint.value.x = null;
        referencePoint.value.y = null;
      } else {
        // 开始移动
        isMoving.value = true;
        const rect = (event.currentTarget as SVGGraphicsElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        referencePoint.value.x = x;
        referencePoint.value.y = y;
      }
    }
    };

    // 鼠标移动事件处理函数
    const handleMouseMove = (event: MouseEvent) => {
      if (referencePoint.value.x !== null && referencePoint.value.y !== null) {
        position.value.x = event.clientX - referencePoint.value.x;
        position.value.y = event.clientY - referencePoint.value.y;
        console.log(`New position: x=${position.value.x}, y=${position.value.y}`);
      }
    };
    
    const drawing = () => {
      router.push('/SigIn') // 跳转到画画页面
    }
    const line = () => {
      router.push('/HomePage') // 跳转到连线页面
    }


    return {
      position,
      handleImageClick,
      handleMouseMove,
      isMoving,
      drawing,
      line
    };
  },
};

</script>

<style scoped>
img {
  width: 10%;
  height: 10%;
}
.tracker-area {
  position: relative;
  width: 100%;
  height: 800px; /* 设置一个高度，作为鼠标追踪的区域 */
  background-color: #f2f2f2;
  overflow: hidden; /* 确保图片在区域内部显示 */
}

.svg-image {
  position: absolute;
}




</style>