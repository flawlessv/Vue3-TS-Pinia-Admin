const searchConfig = {
  pageName: "role",
  formItems: [
    {
      type: "input",
      prop: "name",
      label: "角色名称",
      placeholder: "请输入查询的角色名称",
      elColSpan: 8,
      isClearable: true,
      initialValue: ""
    },
    {
      type: "input",
      prop: "leader",
      label: "权限介绍",
      placeholder: "请输入权限介绍",
      elColSpan: 8,
      isClearable: true,
      initialValue: ""
    },
    {
      type: "date-picker",
      prop: "createAt",
      label: "创建时间",
      elColSpan: 8,
      rangeSeparator: "-",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      datePickerDaterange: "daterange"
    }
  ]
};

export default searchConfig;
