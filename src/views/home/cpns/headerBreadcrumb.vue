<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

import { mapPathToBreadcrumbs } from "@/utils/map-menu";
import useLoginStore from "@/stores/login/login";

const route = useRoute();
const userMenus = useLoginStore().userMenus;
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus);
});
</script>

<style lang="scss" scoped></style>
