import type { RouteRecordRaw } from "vue-router";

// 1. 本地路由加载
function loadLocalRoutes() {
  // 1.1动态获取所有的路由对象, 放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = [];

  // 1.2
  // 读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    "../router/main/**/*.ts",
    {
      eager: true
    }
  );
  // console.log(files);

  // 1.3.将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key];
    localRoutes.push(module.default);
    // console.log(module.default);
  }
  // console.log(localRoutes);
  return localRoutes;
}

// 动态注册所有路由中的第一个路由
export let firstMenu: any = null;

// 2. 动态添加路由
export function mapMenusToRoutes(userMenus: any[]) {
  // 2.1 加载本地路由
  const localRoutes = loadLocalRoutes();

  // 2.2 根据生成的菜单去匹配正确的路径
  const routes: RouteRecordRaw[] = [];
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url);
      if (route) {
        // 给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path });
        }

        // 将二级菜单对应的路径
        routes.push(route);
      }

      // 第一次没有值并且匹配到路由的情况下--记录第一个被匹配到的菜单
      if (!firstMenu && route) {
        firstMenu = submenu;
      }
    }
  }
  return routes;
}

/**
 * 3. 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu;
      }
    }
  }
}

/**
 * 4. 面包屑
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
interface IBreadcrumbs {
  name: string;
  path: string;
}
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 4.1 定义面包屑
  const breadCrumbs: IBreadcrumbs[] = [];

  // 4.2 获取面包屑的层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // breadCrumbs.push(submenu);
        // 顶层菜单
        breadCrumbs.push({ name: menu.name, path: menu.url });
        // 匹配菜单
        breadCrumbs.push({ name: submenu.name, path: submenu.url });
      }
    }
  }
  return breadCrumbs;
}

/**
 * 5. 菜单映射到id列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = [];

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children);
      } else {
        ids.push(item.id);
      }
    }
  }
  recurseGetId(menuList);

  return ids;
}

/**
 * 6. 按钮权限
 * @param menuList 菜单列表
 * @returns 返回的权限数组
 */
export function mapUserMenuListToPermissions(menuList: any[]) {
  const permissions: string[] = [];
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission);
      } else {
        recurseGetPermission(item.children ?? []);
      }
    }
  }
  recurseGetPermission(menuList);
  return permissions;
}
