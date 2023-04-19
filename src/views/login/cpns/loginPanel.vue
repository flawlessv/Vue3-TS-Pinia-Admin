<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <!-- v-model="activeName" 绑定值，选中选项卡的 name -->
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- name属性：与选项卡绑定值v-model=value 对应的标识符，表示选项卡别名 -->
        <el-tab-pane name="account">
          <!-- 自定义标签页内容 -->
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <!-- 内容区域 -->
          <panelAccount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="control-account">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import panelAccount from "./panelAccount.vue";
import panelPhone from "./panelPhone.vue";
import { localCache } from "@/utils/cache";

const activeName = ref("account");

// 监听是否记住密码的点击
const isRememberPassword = ref<boolean>(
  localCache.getCache("isRememberPassword") ?? false
);
watch(isRememberPassword, (newValue) => {
  // console.log(newValue);

  localCache.setCache("isRememberPassword", newValue);
});

// 立即登录
const accountRef = ref<InstanceType<typeof panelAccount>>();
const handleLoginBtnClick = () => {
  if (activeName.value === "account") {
    console.log("账号登录");
    accountRef.value?.loginAction(isRememberPassword.value);
  } else {
    console.log("手机号登录");
  }
};
</script>

<style lang="scss" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .control-account {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;

    --el-button-size: 40px !important;
  }
}
</style>
