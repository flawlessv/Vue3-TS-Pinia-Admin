<template>
  <div class="panel-account">
    <el-form
      label-width="60px"
      size="large"
      status-icon
      :model="account"
      :rules="accountRules"
      ref="formRef"
    >
      <!-- prop 在定义了 validate(校验)、resetFields(重置) 的方法时，该属性是必填的 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ElForm, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

import { localCache } from "@/utils/cache";
import useLoginStore from "@/stores/login/login";

// 1.定义account数据
const CACHE_NAME = "name";
const CACHE_PASSWORD = "password";
const account = reactive({
  name: localCache.getCache(CACHE_NAME) ?? "",
  password: localCache.getCache(CACHE_PASSWORD) ?? ""
});

// 2. 自定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: "必须输入帐号信息~", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: "必须是6~20数字或字母组成~",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "必须输入密码信息~", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "必须是3位以上数字或字母组成",
      trigger: "blur"
    }
  ]
};

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>();
const loginStore = useLoginStore();
const loginAction = (isRememberPassword: boolean) => {
  console.log(isRememberPassword);

  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const name = account.name;
      const password = account.password;

      // 2.向服务器发送网络请求(携带账号和密码)
      // 方式一
      // accountLoginRequest({ name, password }).then((res) => {
      //   console.log(res);
      // });
      // 方式二
      loginStore.loginAccountAction({ name, password }).then((res) => {
        // 3. 判断是否需要记住密码
        if (isRememberPassword) {
          localCache.setCache(CACHE_NAME, name);
          localCache.setCache(CACHE_PASSWORD, password);
        } else {
          localCache.removeCache(CACHE_NAME);
          localCache.removeCache(CACHE_PASSWORD);
        }
      });
    } else {
      // 单纯这样做并不会生效，这是因为element-plus中相关的样式未引入
      // import 'element-plus/dist/index.css' 第一种方式是在main.ts里全部引入
      // 第二种方式
      // 第三种方式
      ElMessage({
        message: "Oops, 请您输入正确的格式后再操作~~.",
        type: "error"
      });
    }
  });
};

defineExpose({
  loginAction
});
</script>

<style lang="scss" scoped></style>
