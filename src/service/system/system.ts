import lwjRequest from "..";

/**针对用户的操作 */
// 查询/赛选用户
export function postUsersListData(queryInfo: any) {
  return lwjRequest.post({
    url: "/users/list",
    data: queryInfo
  });
}

// 根据id删除用户
export function deleteUserById(id: number) {
  return lwjRequest.delete({
    url: `/users/${id}`
  });
}

// 新建用户
export function createUserData(userInfo: any) {
  return lwjRequest.post({
    url: "/users",
    data: userInfo
  });
}

// 编辑用户
export function editUserData(id: number, userInfo: any) {
  return lwjRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  });
}

/**针对页面的网络请求：增删改查 */
// 前提是网络接口的请求是规范的
// 不规范时我们需要对url先进行处理后再继续操作
function getPageUrl(UrlName: string) {
  /**处理逻辑 */
  // return xxx;
}
// 1. 获取数据列表
export function postPageListData(pageName: string, queryInfo: any) {
  console.log(pageName);
  return lwjRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  });
}

// 2.根据id删除
export function deletePageById(pageName: string, id: number) {
  return lwjRequest.delete({
    url: `/${pageName}/${id}`
  });
}

// 3.新建
export function createPageData(pageName: string, pageInfo: any) {
  return lwjRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  });
}

// 4. 编辑

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return lwjRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  });
}
