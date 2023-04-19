const searchConfig = {
  pageName: "department",
  formItems: [
    {
      type: "input",
      prop: "name",
      label: "部门名称",
      placeholder: "请输入查询的部门名称",
      elColSpan: 8,
      isClearable: true,
      initialValue: ""
    },
    {
      type: "input",
      prop: "leader",
      label: "部门领导",
      placeholder: "请输入查询的部门领导",
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
