<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIcon">
      <!-- 利用动态组件实现图标切换 -->
      <el-icon size="25">
        <component :is="isFold ? 'Expand' : 'Fold'"></component>
      </el-icon>
    </div>
    <div class="content">
      <headerBreadcrumb />
      <headerInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import headerBreadcrumb from "./headerBreadcrumb.vue";
import headerInfo from "./headerInfo.vue";

const emit = defineEmits(["foldChange"]);

// 1. 监听左侧图标点击
const isFold = ref(false);
const handleMenuIcon = () => {
  // 内部改变状态
  isFold.value = !isFold.value;

  // 将事件和状态传递给父组件
  emit("foldChange", isFold.value);
};
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
