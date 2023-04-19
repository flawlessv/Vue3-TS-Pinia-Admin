<template>
  <div class="role">
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

    <pageModal
      ref="modalRef"
      :modalConfig="modalConfig"
      :other-info="otherInfo"
    >
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { storeToRefs } from "pinia";
import type { ElTree } from "element-plus";

import pageSearch from "@/base-ui/pageSearch/pageSearch.vue";
import pageContent from "@/base-ui/pageContent/pageContent.vue";
import pageModal from "@/base-ui/pageModal/pageModal.vue";

import searchConfig from "./config/searchConfig";
import contentConfig from "./config/contentConfig";
import modalConfig from "./config/modalConfig";

import usePageContent from "@/hooks/usePageContent";
import usePageModal from "@/hooks/usePageModal";
import useMainStore from "@/stores/main/main";

import { mapMenuListToIds } from "@/utils/map-menu";

// 逻辑关系
const { contentRef, handleQueryClick, handleResetClick } = usePageContent();
const { modalRef, handleNewBtnClick, handleEditBtnClick } = usePageModal(
  createCallback,
  editCallback
);

// 获取完整菜单
const mainStore = useMainStore();
const { entireMenus } = storeToRefs(mainStore);
const otherInfo = ref({});
const handleElTreeCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys];
  otherInfo.value = { menuList };
};

//回显问题
const treeRef = ref<InstanceType<typeof ElTree>>();
// 新建角色回显
function createCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([]);
  });
}
// 编辑角色回显
function editCallback(itemData: any) {
  // console.log(itemData.menuList);
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList);
    treeRef.value?.setCheckedKeys(menuIds);
  });
}
</script>

<style lang="scss" scoped></style>
