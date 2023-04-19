import { defineStore } from "pinia";

import {
  getEntireRoles,
  getEntireDepartment,
  getEntireMenus
} from "@/service/main/main";
import type { IMainState } from "./type";

const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    // 获取所有用户列表/所有部门/所有菜单
    async fetchEntireRolesDepartmentAction() {
      const roleResult = await getEntireRoles();
      const departmentResult = await getEntireDepartment();
      const menuResult = await getEntireMenus();
      this.entireRoles = roleResult.data.list;
      this.entireDepartments = departmentResult.data.list;
      this.entireMenus = menuResult.data.list;
    }
  }
});

export default useMainStore;
