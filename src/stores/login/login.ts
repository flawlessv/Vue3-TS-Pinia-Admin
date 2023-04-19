import { defineStore } from "pinia";

import {
  accountLoginRequest,
  getUserInfoByIdRequest,
  getUserMenusByRoleIdRequest
} from "@/service/login/login";
import type { IAccount } from "@/type";
import { localCache } from "@/utils/cache";
import { LOGIN_TOKEN } from "@/global/constants";
import router from "@/router";

import {
  mapUserMenuListToPermissions,
  mapMenusToRoutes
} from "@/utils/map-menu";
import useMainStore from "../main/main";

interface ILoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  permissions: string[];
}

const useLoginStore = defineStore("login", {
  // 如何制定state的类型
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account);
      this.token = loginResult.data.token;
      const id = loginResult.data.id;
      const name = loginResult.data.name;
      localCache.setCache(LOGIN_TOKEN, this.token);

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoByIdRequest(id);
      // console.log(userInfoResult);
      const userInfo = userInfoResult.data;
      this.userInfo = userInfo;

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleIdRequest(
        this.userInfo.role.id
      );
      const userMenus = userMenusResult.data;
      this.userMenus = userMenus;

      // 4.进行本地缓存
      localCache.setCache("userInfo", userInfo);
      localCache.setCache("userMenus", userMenus);

      // 获取登录用户的所有按钮权限
      const permissions = mapUserMenuListToPermissions(userMenus);
      this.permissions = permissions;

      // 动态添加路由
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => router.addRoute("main", route));

      // 请求所有的角色列表和部门数据
      const mainStore = useMainStore();
      mainStore.fetchEntireRolesDepartmentAction();

      // 5. 页面跳转
      router.push("/main");
    },
    // 加载本地数据
    loadLocalCacheAction() {
      // 1. 用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN);
      const userInfo = localCache.getCache("userInfo");
      const userMenus = localCache.getCache("userMenus");
      if (token && userInfo && userMenus) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenus = userMenus;

        // 请求所有的角色列表和部门数据
        const mainStore = useMainStore();
        mainStore.fetchEntireRolesDepartmentAction();

        // 获取按钮权限
        // 获取登录用户的所有按钮权限
        const permissions = mapUserMenuListToPermissions(userMenus);
        this.permissions = permissions;

        // 2. 动态添加路由
        const routes = mapMenusToRoutes(userMenus);
        routes.forEach((route) => router.addRoute("main", route));
      }
    }
  }
});

export default useLoginStore;
