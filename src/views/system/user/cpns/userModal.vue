<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isNewRef ? '新建用户' : '编辑用户'"
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input
            clearable
            v-model="formData.name"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input
            v-model="formData.realname"
            clearable
            placeholder="请输入真实姓名"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="isNewRef">
          <el-input
            v-model="formData.password"
            clearable
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input
            v-model="formData.cellphone"
            clearable
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select
            style="width: 100%"
            v-model="formData.roleId"
            class="m-2"
            placeholder="请选择角色"
            size="large"
          >
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select
            style="width: 100%"
            v-model="formData.departmentId"
            class="m-2"
            placeholder="请选择部门"
            size="large"
          >
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancleClick">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import useMainStore from "@/stores/main/main";
import useSystemStore from "@/stores/system/system";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import type { ElForm } from "element-plus";

const dialogVisible = ref(false);
const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
});

const isNewRef = ref(true);
const editData = ref();

// 1. 控制模态框显示与否
// 定义设置dialogVisible值的方法
const setModalVisible = (isNew: boolean = true, itemData?: any) => {
  dialogVisible.value = true;
  isNewRef.value = isNew;
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key];
    }
    editData.value = itemData;
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = "";
    }
    editData.value = null;
  }
};

// 2. 获取所有角色和部门数据
const mainStore = useMainStore();
const { entireRoles, entireDepartments } = storeToRefs(mainStore);

// 3. 点击确认
const systemStore = useSystemStore();
const handleConfirmClick = () => {
  dialogVisible.value = false;
  // 发送网络请求
  if (!isNewRef.value && editData.value) {
    // 编辑数据
    systemStore.editUserDataAction(editData.value.id, formData);
    ElMessage({
      type: "success",
      message: "编辑用户信息成功！"
    });
  } else {
    // 新建
    systemStore.createUserDataAction(formData);
    ElMessage({
      type: "success",
      message: "新建用户成功！"
    });
  }
};

// 4. 点击取消
const formRef = ref<InstanceType<typeof ElForm>>();
const handleCancleClick = () => {
  dialogVisible.value = false;
  if (!formRef) return;
  /**
   * 想要通过resetFields()进行重置，必须要绑定prop在每个el-form-item上
   */
  // form中的数据全部重置
  formRef.value?.resetFields();
  console.log(isNewRef.value);

  if (isNewRef.value === true) {
    ElMessage({
      type: "info",
      message: "取消新建用户成功！"
    });
  } else {
    ElMessage({
      type: "info",
      message: "取消编辑用户成功！"
    });
  }
};

// 暴露给父组件调用
defineExpose({
  setModalVisible
});
</script>

<style lang="scss" scoped>
.form {
  padding: 0 20px;
}
</style>
