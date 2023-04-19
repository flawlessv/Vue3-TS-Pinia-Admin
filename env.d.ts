// 放置一些类型定义/类型声明文件

/// <reference types="vite/client" />

declare module "*.vue" {
  import type { defineComponent } from "vue";
  const component: defineComponent<{}, {}, any>;
  export default component;
}
declare module "*.json";
declare module "*.mjs";
