import useLoginStore from "@/stores/login/login";

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore();
  const { permissions } = loginStore;

  // 将结果转为boolean类型
  // return Boolean(permissions.find((item) => item.includes(permissionID))) // 或者下面做法
  return !!permissions.find((item) => item.includes(permissionID));
}

export default usePermissions;
