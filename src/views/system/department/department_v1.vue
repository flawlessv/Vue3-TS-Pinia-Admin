<template>
  <div class="department">
    <pageSearch @queryClick="handleQueryClick" @resetClick="handleResetClick" />
    <pageContent
      ref="contentRef"
      @editBtnClick="handleEditBtnClick"
      @newBtnClick="handleNewBtnClick"
    />
    <pageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import pageSearch from "./cpns/pageSearch.vue";
import pageContent from "./cpns/pageContent.vue";
import pageModal from "./cpns/pageModal.vue";

// 1. pageSearch逻辑
const contentRef = ref<InstanceType<typeof pageContent>>();
const handleQueryClick = (queryInfo: any) => {
  contentRef.value?.fetchPagesListData(queryInfo);
};
const handleResetClick = () => {
  contentRef.value?.fetchPagesListData();
};

// 2. pageContent逻辑
const modalRef = ref<InstanceType<typeof pageModal>>();
const handleNewBtnClick = () => {
  modalRef.value?.setModalVisible();
};
const handleEditBtnClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData);
};
</script>

<style lang="scss" scoped></style>
