<template>
  <div class="content">
    <!-- 标题区域 -->
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="55" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="120"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="120"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号"
          width="120"
        />
        <el-table-column align="center" prop="enable" label="状态" width="80">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button plain :type="scope.row.enable ? 'primary' : 'danger'">
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template #default="scope">
            <el-button
              @click="handleEditBtnClick(scope.row)"
              icon="Edit"
              type="primary"
              text
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click="handleDeleteBtnClick(scope.row.id)"
              icon="Delete"
              type="warning"
              text
              size="small"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
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
        :total="totalCount"
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

// 自定义事件
const emit = defineEmits(["newBtnClick", "editBtnClick"]);

// 1. 发起action 请求userList 数据
const systemStore = userSystemStore();
const currentPage = ref(1); // 默认是第几页
const pageSize = ref(10); // 默认一页显示多少条数据
fetchUsersListData();

// 2. 获取userList数据进行展示
const { usersList, totalCount } = storeToRefs(systemStore);

// 3. 分页器
// const currentPage = ref(1); // 默认是第几页
// const pageSize = ref(10); // 默认一页显示多少条数据
// 改变页容量
const handleSizeChange = () => {
  fetchUsersListData();
};
// 改变当前页数
const handleCurrentChange = () => {
  fetchUsersListData();
};

// 4. 定义函数用于发送网络请求
function fetchUsersListData(formData: any = {}) {
  // 获取offset/size
  const size = pageSize.value;
  const offset = (currentPage.value - 1) * size;
  const info = { size, offset };

  // 发起网络请求
  const queryInfo = { ...info, ...formData };
  systemStore.postUsersListAction(queryInfo);
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
      systemStore.deleteUserByIdAction(id);
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
defineExpose({ fetchUsersListData });
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
