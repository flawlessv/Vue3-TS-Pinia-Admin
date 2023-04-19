import lwjRequest from "..";

// 获取所有角色列表
export function getEntireRoles() {
  return lwjRequest.post({
    url: "/role/list"
  });
}

// 获取所有部门
export function getEntireDepartment() {
  return lwjRequest.post({
    url: "/department/list"
  });
}

export function getEntireMenus() {
  return lwjRequest.post({
    url: "/menu/list"
  });
}
