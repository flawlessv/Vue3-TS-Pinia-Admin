<template>
  <div class="pie-echart">
    <baseEcharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import baseEcharts from "./baseEcharts.vue";
import type { EChartsOption } from "echarts";
import { computed } from "vue";

interface IEchartValueType {
  value: number;
  name: string;
}
interface IProps {
  roseData: IEchartValueType[];
}

const props = defineProps<IProps>();

const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        // 内半径/外半径的大小
        radius: [10, 160],
        // 设置区域的位置
        center: ["50%", "50%"],
        bottom: "-15%",
        roseType: "area", // 圆心角一样, 通过半径的不同表示大小
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: false
        }
      }
    ]
  };
});
</script>

<style lang="scss" scoped></style>
