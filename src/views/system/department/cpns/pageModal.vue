<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isNewRef ? '新建部门' : '编辑部门'"
    width="30%"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input
            clearable
            v-model="formData.name"
            placeholder="请输入部门名称"
          />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input
            v-model="formData.leader"
            clearable
            placeholder="请输入部门领导"
          />
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select
            style="width: 100%"
            v-model="formData.parentId"
            class="m-2"
            placeholder="请选择上级部门"
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
  leader: "",
  parentId: ""
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
const { entireDepartments } = storeToRefs(mainStore);

// 3. 点击确认
const systemStore = useSystemStore();
const handleConfirmClick = () => {
  dialogVisible.value = false;
  // 发送网络请求
  if (!isNewRef.value && editData.value) {
    // 编辑数据
    systemStore.editPageDataAction("department", editData.value.id, formData);
    ElMessage({
      type: "success",
      message: "编辑部门信息成功！"
    });
  } else {
    // 新建
    systemStore.createPageDataAction("department", formData);
    ElMessage({
      type: "success",
      message: "新建部门成功！"
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
