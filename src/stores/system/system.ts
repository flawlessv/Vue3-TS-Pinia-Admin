import { defineStore } from "pinia";

import {
  postUsersListData,
  deleteUserById,
  createUserData,
  editUserData,
  postPageListData,
  deletePageById,
  createPageData,
  editPageData
} from "@/service/system/system";
import type { ISystemState } from "./type";

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    totalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 1. 获取所有用户
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo);
      const { list, totalCount } = usersListResult.data;
      this.usersList = list;
      this.totalCount = totalCount;
    },
    // 2.  根据id删除用户
    async deleteUserByIdAction(id: number) {
      // 删除数据
      const deleteResult = await deleteUserById(id);

      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 });
    },
    // 3. 新建用户
    async createUserDataAction(userInfo: any) {
      // 创建用户
      const createResult = await createUserData(userInfo);
      // console.log(createResult);

      // 重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 });
    },
    // 编辑用户
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo);
      console.log(editResult);

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 });
    },

    /**针对页面的数据进行增删改查 */
    // 1. 获取数据列表
    async postListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo);
      console.log(pageListResult);

      const { list, totalCount } = pageListResult.data;
      this.pageList = list;
      this.pageTotalCount = totalCount;
    },
    // 2. 删除
    async deletePageByIdAction(pageName: string, id: number) {
      const pageDeleteResult = await deletePageById(pageName, id);
      this.postListAction(pageName, { offset: 0, size: 10 });
    },
    // 3. 新建
    async createPageDataAction(pageName: string, pageInfo: any) {
      const createResult = await createPageData(pageName, pageInfo);
      this.postListAction(pageName, { offset: 0, size: 10 });
    },
    // 4. 编辑
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo);
      this.postListAction(pageName, { offset: 0, size: 10 });
    }
  }
});

export default useSystemStore;
