const department = () => import("@/views/system/department/department.vue");
export default {
  path: "/main/system/department",
  name: "department",
  component: department,
  children: []
};
