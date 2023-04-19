<template>
  <el-dialog
    v-model="dialogVisible"
    :title="
      isNewRef ? modalConfig.header?.newTitle : modalConfig.header?.editTitle
    "
    :width="modalConfig.header?.width"
    center
  >
    <div class="form">
      <el-form :model="formData" label-width="80px" size="large">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="option in item.options" :key="option.value">
                  <el-option :label="option.label" :value="option.value" />
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
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
import { reactive, ref } from "vue";
import type { ElForm } from "element-plus";

// 自定义接收的属性
interface IProps {
  modalConfig: {
    pageName: string;
    header?: {
      newTitle: string;
      editTitle: string;
      width: string;
    };
    formItems: any[];
  };
  otherInfo?: any;
}
const props = defineProps<IProps>();

const dialogVisible = ref(false);
const initialData: any = {};
for (const item of props.modalConfig.formItems) {
  // initialData[item.prop] = item.initialValue ?? "";
  initialData[item.prop] = "";
}
const formData = reactive<any>(initialData);

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
      // 设置初始化值
      // const item = modalConfig.formItems.find((item) => item.prop === key) as any;
      // formData[key] = item ? item.initialValue : "";

      formData[key] = "";
    }
    editData.value = null;
  }
};

// 2. 获取所有角色和部门数据
const mainStore = useMainStore();
// const { entireDepartments } = storeToRefs(mainStore);

// 3. 点击确认
const systemStore = useSystemStore();
const handleConfirmClick = () => {
  dialogVisible.value = false;

  let infoData = { ...formData };
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo };
  }

  // 发送网络请求
  if (!isNewRef.value && editData.value) {
    // 编辑数据
    systemStore.editPageDataAction(
      props.modalConfig.pageName,
      editData.value.id,
      infoData
    );
    ElMessage({
      type: "success",
      message: `${props.modalConfig.header?.editTitle}信息成功！`
    });
  } else {
    // 新建
    systemStore.createPageDataAction(props.modalConfig.pageName, infoData);
    ElMessage({
      type: "success",
      message: `${props.modalConfig.header?.newTitle}成功！`
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
      message: `取消${props.modalConfig.header?.newTitle}成功！`
    });
  } else {
    ElMessage({
      type: "info",
      message: `取消${props.modalConfig.header?.editTitle}成功！`
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
