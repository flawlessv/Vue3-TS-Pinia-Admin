<template>
  <div class="main-menu">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <!-- menu -->
    <div class="menu">
      <!--
        el-menu：整个菜单
        el-sub-menu：可以有子菜单，并且是可以展开的
        el-menu-item-group：对子菜单进行分组，但是不可以展开
        el-menu-item：可以点击每个item
       -->
      <!--
        default-active	页面加载时默认激活菜单的 index
        collapse  控制菜单折叠/展开
        -->
      <el-menu
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
        :default-active="activeDefault"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
              <el-icon>
                <!-- 动态组件 -->
                <!-- <component :is="'monitor'"></component> -->
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleItemClick(subItem)"
                >{{ subItem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";

import useLoginStore from "@/stores/login/login";
import { mapPathToMenu } from "@/utils/map-menu";

const router = useRouter();

// 0. 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
});

// 1. 获取动态菜单
const loginStore = useLoginStore();
// const { userMenus } = storeToRefs(loginStore);
const userMenus = loginStore.userMenus;

// 2. 点击菜单跳转到对应路由
const handleItemClick = (subItem: any) => {
  const itemUrl = subItem.url;
  router.push(itemUrl);
};

// 3. el-menu 的默认选中菜单
const route = useRoute();
// const pathMenu = mapPathToMenu(route.path, userMenus);
// console.log(route.path);
// const activeDefault = ref(pathMenu.id + "");
const activeDefault = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus);
  return pathMenu.id + "";
});
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 10px 8px 10px;
    height: 28px;
    overflow: hidden;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
  }
  .menu {
  }

  .el-menu {
    border-right: none;
    user-select: none;
  }

  .el-sub-menu {
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
