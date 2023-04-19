import lwjRequest from "..";

import type { IAccount } from "@/type/index";

export function accountLoginRequest(account: IAccount) {
  return lwjRequest.post({
    url: "/login",
    data: account
  });
}

export function getUserInfoByIdRequest(id: number) {
  return lwjRequest.get({
    url: `/users/${id}`
    // headers: {
    //   // 携带token
    // }
  });
}

export function getUserMenusByRoleIdRequest(id: number) {
  return lwjRequest.get({
    url: `/role/${id}/menu`
  });
}
