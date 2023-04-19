<template>
  <div class="department">
    <pageSearch
      :searchConfig="searchConfig"
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    />
    <pageContent
      ref="contentRef"
      :contentConfig="contentConfig"
      @editBtnClick="handleEditBtnClick"
      @newBtnClick="handleNewBtnClick"
    />
    <pageModal ref="modalRef" :modalConfig="modalConfigRef" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import pageSearch from "@/base-ui/pageSearch/pageSearch.vue";
import pageContent from "@/base-ui/pageContent/pageContent.vue";
import pageModal from "@/base-ui/pageModal/pageModal.vue";

import searchConfig from "./config/searchConfig";
import contentConfig from "./config/contentConfig";
import modalConfig from "./config/modalConfig";
import useMainStore from "@/stores/main/main";
import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore();
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id };
  });
  mainStore.entireDepartments;
  modalConfig.formItems.forEach((item) => {
    if (item.prop === "parentId") {
      item.options.push(...departments);
    }
  });
  return modalConfig;
});

// 1. pageSearch逻辑
// const contentRef = ref<InstanceType<typeof pageContent>>();
// const handleQueryClick = (queryInfo: any) => {
//   contentRef.value?.fetchPagesListData(queryInfo);
// };
// const handleResetClick = () => {
//   contentRef.value?.fetchPagesListData();
// };

const { contentRef, handleQueryClick, handleResetClick } = usePageContent();

// 2. pageContent逻辑
// const modalRef = ref<InstanceType<typeof pageModal>>();
// const handleNewBtnClick = () => {
//   modalRef.value?.setModalVisible();
// };
// const handleEditBtnClick = (itemData: any) => {
//   modalRef.value?.setModalVisible(false, itemData);
// };
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal();
</script>

<style lang="scss" scoped></style>
