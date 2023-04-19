<template>
  <div class="dashboard">
    <!-- 1.顶部数字展示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <countCardfrom v-bind="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 2. 中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7" :xs="24">
        <chart-card>
          <pieEcharts :pieData="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10" :xs="24">
        <chart-card>
          <mapEcharts :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7" :xs="24">
        <chart-card>
          <roseEcharts :roseData="showGoodsCategorySale" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3. 底部部分图表 -->
    <el-row :gutter="10">
      <!-- 折线图 -->
      <el-col :span="12" :xs="24">
        <chart-card>
          <lineEcharts v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
      <!-- 柱状图 -->
      <el-col :span="12" :xs="24">
        <chart-card>
          <barEcharts v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from "@/stores/analysis/analysis";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import countCardfrom from "./cpns/countCard.vue";
import chartCard from "./cpns/chartCard.vue";
import {
  lineEcharts,
  pieEcharts,
  roseEcharts,
  barEcharts,
  mapEcharts
} from "@/components/echarts";

// 1.发起数据的请求
const analysisStore = useAnalysisStore();
analysisStore.fetchAnalysisDataAction();

// 2.从store获取数据
const {
  amountList,
  goodsCategoryCount,
  goodsCategorySale,
  goodsCategoryFavor,
  goodsAddressSale
} = storeToRefs(analysisStore);

// 3.获取数据--数据处理成我们想要的格式
// 饼图数据处理
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }));
});
// 南丁格尔图
const showGoodsCategorySale = computed(() => {
  return goodsCategorySale.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }));
});
// 折线图
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name);
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor);
  return { labels, values };
});
//
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }));
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 10px;
}
</style>
