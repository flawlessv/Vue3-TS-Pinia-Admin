<template>
  <div class="user">
    <userSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <userContent
      ref="contentRef"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    />
    <userModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import userSearch from "./cpns/userSearch.vue";
import userContent from "./cpns/userContent.vue";
import userModal from "./cpns/userModal.vue";

// 操作userContent组件
const contentRef = ref<InstanceType<typeof userContent>>();
// 查询
const handleQueryClick = (searchForm: any) => {
  contentRef.value?.fetchUsersListData(searchForm);
};
// 重置
const handleResetClick = () => {
  contentRef.value?.fetchUsersListData();
};

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof userModal>>();
const handleNewBtnClick = () => {
  modalRef.value?.setModalVisible();
};
const handleEditBtnClick = (info: any) => {
  modalRef.value?.setModalVisible(false, info);
};
</script>

<style lang="scss" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
