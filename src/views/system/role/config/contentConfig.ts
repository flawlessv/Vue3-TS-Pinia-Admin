// 注意：prop:所对应的值需要与后台返回的一致

const contentConfig = {
  pageName: "role",
  header: {
    title: "角色列表",
    btnTitle: "新建角色"
  },
  propsList: [
    {
      type: "selection",
      label: "选择",
      width: "80px"
    },
    {
      type: "index",
      label: "序号",
      width: "80px"
    },
    {
      type: "normal",
      label: "角色名称",
      prop: "name",
      width: "100px"
    },
    {
      type: "normal",
      label: "角色权限",
      prop: "intro",
      width: "100px"
    },
    {
      type: "timer",
      label: "创建时间",
      prop: "createAt"
    },
    {
      type: "timer",
      label: "更新时间",
      prop: "updateAt"
    },
    {
      type: "handler",
      label: "操作",
      width: "150px"
    }
  ]
};

export default contentConfig;
