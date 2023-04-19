<template>
  <div class="search" v-if="isQuery">
    <el-form :model="searchForm" label-width="80px" size="large" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="item.elColSpan">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  :clearable="item.isClearable"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  :type="item.datePickerDaterange"
                  :range-separator="item.rangeSeparator"
                  :start-placeholder="item.startPlaceholder"
                  :end-placeholder="item.endPlaceholder"
                  v-model="searchForm[item.prop]"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ElForm } from "element-plus";

import usePermissions from "@/hooks/usePermissions";

// 自定义事件
const emit = defineEmits(["queryClick", "resetClick"]);

// 自定义接收的属性
interface IProps {
  searchConfig: {
    pageName: string;
    formItems: any[];
  };
}
const props = defineProps<IProps>();

// 按钮权限
const isQuery = usePermissions(`${props.searchConfig.pageName}:query`);

// 定义form数据
const initialForm: any = {};
for (const item of props.searchConfig.formItems) {
  // 初始化值
  initialForm[item.prop] = item.initialValue ?? "";
}
const searchForm = reactive(initialForm);

// 1. 重置
const formRef = ref<InstanceType<typeof ElForm>>();
const handleResetClick = () => {
  if (!formRef) return;
  /**
   * 想要通过resetFields()进行重置，必须要绑定prop在每个el-form-item上
   */
  // form中的数据全部重置
  formRef.value?.resetFields();

  // 将事件出去, content内部重新发送网络请求
  emit("resetClick");
};

// 2. 查询
const handleQueryClick = () => {
  emit("queryClick", searchForm);
};
</script>

<style lang="scss" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0px;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
