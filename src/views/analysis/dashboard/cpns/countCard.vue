<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <!-- <span v-if="amount === 'saleroom'">¥</span> -->
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <!-- <span v-if="amount === 'saleroom'">¥</span> -->
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CountUp } from "countup.js";

// defineProps
interface IProps {
  amount?: string;
  title?: string;
  tips?: string;
  number1?: number;
  number2?: number;
  subtitle?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  title: "商品总销量",
  tips: "所有的商品总销量",
  number1: 509989,
  number2: 509989,
  subtitle: "商品总销量"
});

// 数字动画
// 创建CountUp的实例对象
const count1Ref = ref<HTMLElement>();
const count2Ref = ref<HTMLElement>();
/**
 * var options = {
    useEasing: true, // 使用缓和
    useGrouping: false, // 使用分组(是否显示千位分隔符,一般为 true)
    separator: ',', // 分隔器(千位分隔符,默认为',')
    decimal: '.', // 十进制(小数点符号,默认为 '.')
    prefix: '', // 字首(数字的前缀,根据需要可设为 $,¥,￥ 等)
    suffix: '' // 后缀(数字的后缀 ,根据需要可设为 元,个,美元 等)
};
// CountUp(参数一, 参数二, 参数三, 参数四, 参数五, 参数六)
// 参数一: 数字所在容器
// 参数二: 数字开始增长前的默认值(起始值),一般从 0 开始增长
// 参数三: 数字增长后的最终值,该值一般通过异步请求获取
// 参数四: 数字小数点后保留的位数
// 参数五: 数字增长特效的时间,此处为3秒
// 参数六: 其他配置项
// 注: 参数六也可不加,其配置项则为默认值
 * 参数一: 执行动画的元素
 * 参数二: 数字增加 10000
 * 参数三：{prefix:'￥'}--前缀参数
 */
const countOption = {
  prefix: props.amount === "saleroom" ? "¥" : ""
};
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption);
  const countup2 = new CountUp(count2Ref.value!, props.number2, countOption);
  countup1.start();
  countup2.start();
});
</script>

<style lang="scss" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
