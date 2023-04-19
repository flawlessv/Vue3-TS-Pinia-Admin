const goods = () => import("@/views/product/goods/goods.vue");
export default {
  path: "/main/product/goods",
  name: "goods",
  component: goods,
  children: []
};
