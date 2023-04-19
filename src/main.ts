import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/css/main.scss";
import "normalize.css";

// import pinia from "./stores";
import registerStore from "./stores";

// element-plus 图标全局注册
import registerIcons from "./global/register-icons";
// import useLoginStore from "./stores/login/login";

// ElMessage、ElLoading等内置组件样式的引入
// import "element-plus/theme-chalk/el-message.css";

const app = createApp(App);
app.use(registerIcons);
// app.use(pinia);
// const loginStore = useLoginStore();
// loginStore.loadLocalCacheAction();
app.use(registerStore);
app.use(router);
app.mount("#app");
