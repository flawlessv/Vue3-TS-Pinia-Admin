<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <homeMenu :isFold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <homeHeader @foldChange="handleFoldChange" />
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import homeMenu from "./cpns/homeMenu.vue";
import homeHeader from "./cpns/homeHeader.vue";

// 处理homeHeader中折叠的变化
const isCollapse = ref(false);
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold;
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */

      transition: width 0.3s ease;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
