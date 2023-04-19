<template>
  <div class="pie-echart">
    <baseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import baseEcharts from "./baseEcharts.vue";
import type { EChartsOption } from "echarts";
import { computed } from "vue";

// 1. 类型校验及获取props
interface IEchartValueType {
  value: number;
  name: string;
}
interface IProps {
  pieData: IEchartValueType[];
}
const props = defineProps<IProps>();

// 配置项
const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示的文本
    tooltip: {
      trigger: "item"
    },
    // 图例:
    legend: {
      orient: "horizontal",
      left: "left"
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "50%",
        bottom: "-10%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };
});
</script>

<style lang="scss" scoped></style>
