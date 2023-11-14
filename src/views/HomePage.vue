<template>
    <div class="connect" ref="connect">
        <div class="boxdudu" draggable="true">
            <div class="left">
                <div class="box " v-for="(item, index) in leftElements" :key="index" :ref="`left-${index}`" @mousedown="startConnection(index, $event)">
                    {{ item.label }}
                </div>
            </div>
            <div class="right">
                <div class="box " v-for="(item, index) in rightElements" :key="index" :ref="`right-${index}`" @mouseup="endConnection(index, $event)">
                    {{ item.label }}
                </div>
            </div>
        </div>
        <div>
            <svg class="svg-container">
                <line v-for="(connection, index) in connections" :key="index" id="`line-${index}`"
                :x1="connection.startX"
                :y1="connection.startY"
                :x2="connection.endX"
                :y2="connection.endY"
                v-if="!isDrawing"  
                style="stroke:black"> <!-- 设置线的颜色 -->
                </line>
                <line id="dynamic-line" style="display: none;" stroke="black" />
            </svg>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import {  onMounted, onBeforeUnmount } from 'vue';
  
  const leftElements = ref([
    { label: 'box1' },
    { label: 'box2' },
    { label: 'box3' },
  ]);
  
  const rightElements = ref([
    { label: 'boxA' },
    { label: 'boxB' },
    { label: 'boxC' },
  ]);
  
const connections = ref<Array<{
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  startElementIndex: number,
  endElementIndex: number,
}>>([]);
  
  let isDrawing = false;
  let currentConnection = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    startElementIndex: -1,
    endElementIndex: -1,
  };
  
  const startConnection = (index: number, event: MouseEvent) => {
    const element = event.target as HTMLElement;
    const boundingRect = element.getBoundingClientRect();
    currentConnection.startX = boundingRect.left + boundingRect.width / 2;
    currentConnection.startY = boundingRect.top + boundingRect.height / 2;
    currentConnection.startElementIndex = index;
    
// 设置动态线条的起点坐标
    const dynamicLine = document.getElementById("dynamic-line");
    if (dynamicLine) {   
    dynamicLine.setAttribute("x1", currentConnection.startX.toString());
    dynamicLine.setAttribute("y1", currentConnection.startY.toString());

// 设置动态线条可见
    dynamicLine.style.display = "block";
    isDrawing = true;

    // 添加mousemove事件监听器
  document.addEventListener('mousemove', updateConnection);
    }
  };
  
  
  const endConnection = (index: number, event: MouseEvent) => {
    if (isDrawing) {
      const element = event.target as HTMLElement;
      const boundingRect = element.getBoundingClientRect();
      currentConnection.endX = boundingRect.left + boundingRect.width / 2;
      currentConnection.endY = boundingRect.top + boundingRect.height / 2;
      currentConnection.endElementIndex = index;
      connections.value.push({ ...currentConnection });
      isDrawing = false;

// 隐藏动态线条
    const dynamicLine = document.getElementById("dynamic-line");
    if (dynamicLine) {   
    dynamicLine.style.display = "none";
    }
      // 移除mousemove事件监听器
    document.removeEventListener('mousemove', updateConnection);
    }
  };

    // 实时更新连线终点位置
    const updateConnection = (event: MouseEvent) => {
    if (isDrawing) {
        console.log('move');
        const dynamicLine = document.getElementById("dynamic-line");
        currentConnection.endX = event.clientX;
        currentConnection.endY = event.clientY;

        if (dynamicLine) {
// 更新动态线条的终点坐标
        dynamicLine.setAttribute("x2", `${currentConnection.endX}`);
        dynamicLine.setAttribute("y2", `${currentConnection.endY}`);
        }
// 更新对应连线的终点坐标
        const lineId = `line-${connections.value.length - 1}`; // 获取最后一条连线的ID
        const line = document.getElementById(lineId);
        if (line) {
            line.setAttribute('x2', `${currentConnection.endX}`);
            line.setAttribute('y2', `${currentConnection.endY}`); 
        } 
        // 更新对应连线的终点坐标
    /* const currentConnectionIndex = connections.value.length - 1;
    if (currentConnectionIndex >= 0) {
      // 更新当前连线的终点坐标
      connections.value[currentConnectionIndex].endX = currentConnection.endX;
      connections.value[currentConnectionIndex].endY = currentConnection.endY; 
    }*/
    }

    };
  // 在setup中添加mousemove事件监听器
  onMounted(() => {
    document.addEventListener('mousemove', updateConnection);
  });

  // 在beforeUnmount中移除mousemove事件监听器
  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', updateConnection);
  });
    
    
  </script>
  
 
  
  <style scoped>
  .connect {
    position: relative;
  }
  .boxdudu {
    display: flex;
  }
  
  .left, .right {
    display: flex;
    flex-direction: column;
  }
  .left {
    width: 500px;
  }
  .svg-container[data-v-9b48b94e] {
    width:600px;
    height: 700px;
  }
  .box {
    width: 100px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    margin: 10px;
    cursor: pointer;
    background-color: antiquewhite;
    z-index: 1;
  }
  
  .svg-container {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
  </style>
  