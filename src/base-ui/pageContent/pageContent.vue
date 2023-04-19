<template>
  <div class="content">
    <!-- 标题区域 -->
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title ?? "数据列表" }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig.header?.btnTitle ?? "新建数据" }}
      </el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <!--
        v-bind="contentConfig.childrenTree" 等价于
        :row-key="contentConfig.childrenTree.rowKey"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
       -->
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- <el-table-column v-bind="item"></el-table-column> 等价于下面 -->
          <template v-if="item.type === 'timer'">
            <el-table-column
              align="center"
              :label="item.label"
              :prop="item.prop"
            >
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column :label="item.label" :width="item.width">
              <template #default="scope">
                <el-button
                  @click="handleEditBtnClick(scope.row)"
                  icon="Edit"
                  type="primary"
                  text
                  size="small"
                  v-if="isUpdate"
                >
                  编辑
                </el-button>
                <el-button
                  @click="handleDeleteBtnClick(scope.row.id)"
                  icon="Delete"
                  type="warning"
                  text
                  size="small"
                  v-if="isDelete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              align="center"
              :label="item.label"
              :prop="item.prop"
              :width="item.width"
              :type="item.type"
            ></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="false"
        layout="sizes, prev, pager, next, jumper, total"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, markRaw } from "vue";
import { Delete } from "@element-plus/icons-vue";

import userSystemStore from "@/stores/system/system";
import { formatUTC } from "@/utils/format_date";
import usePermissions from "@/hooks/usePermissions";

// 自定义接收的属性
interface IProps {
  contentConfig: {
    pageName: string;
    header?: {
      title?: string;
      btnTitle?: string;
    };
    propsList: any[];
    childrenTree?: any;
  };
}
const props = defineProps<IProps>();

// 自定义事件
const emit = defineEmits(["newBtnClick", "editBtnClick"]);

// 0. 获取是否有对应的增删改查的组件
// const loginStore = useLoginStore();
// const { permissions } = loginStore;
// const isCreate = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:create`)
// );
// const isDelete = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:delete`)
// );
// const isUpdate = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:update`)
// );
// const isQuery = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:query`)
// );
// 抽取
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`);
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`);
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`);
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`);

// 1. 发起action 请求userList 数据
const systemStore = userSystemStore();
const currentPage = ref(1); // 默认是第几页
const pageSize = ref(10); // 默认一页显示多少条数据

/**
 * 无论是编辑、新建还是删除的操作请求数据都是放在 store/system/system.ts
 * 里的cations里，因此只需要监听systemStore中的actions中的有关新建、编辑、删除的
 * action执行成功，执行成功了就让分页器里的当前页码回归到第一页
 */
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === "deletePageByIdAction" ||
      name === "createPageDataAction" ||
      name === "editPageDataAction"
    ) {
      currentPage.value = 1;
    }
  });
});

fetchPagesListData();

// 2. 获取userList数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore);

// 3. 分页器
// 改变页容量
const handleSizeChange = () => {
  fetchPagesListData();
};
// 改变当前页数
const handleCurrentChange = () => {
  fetchPagesListData();
};

// 4. 定义函数用于发送网络请求
function fetchPagesListData(formData: any = {}) {
  if (!isQuery) return;

  // 获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const pageInfo = { size, offset };

  // 发起网络请求
  const queryInfo = { ...pageInfo, ...formData };
  systemStore.postListAction(props.contentConfig.pageName, queryInfo);
}

// 5. 删除操作
const handleDeleteBtnClick = (id: number) => {
  ElMessageBox.confirm("确定要继续执行此操作吗?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
    icon: markRaw(Delete)
  })
    .then(() => {
      systemStore.deletePageByIdAction(props.contentConfig.pageName, id);
      ElMessage({
        type: "success",
        message: "删除成功"
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "已取消删除"
      });
    });
};

// 6. 新增用户
const handleNewUserClick = () => {
  emit("newBtnClick");
};

// 7. 编辑用户
const handleEditBtnClick = (info: any) => {
  emit("editBtnClick", info);
};

// 暴露方法或属性，便于父组件通过ref进行获取和调用
defineExpose({ fetchPagesListData });
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 15px;

    .title {
      font-size: 22px;
    }
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}

:deep(.el-table .el-table__cell) {
  padding: 12px 0 !important;
}

:deep(.el-button) {
  margin-left: 0;
  padding: 5px 8px;
}
</style>
