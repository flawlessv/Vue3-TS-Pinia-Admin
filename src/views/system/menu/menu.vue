<template>
  <div class="menu">
    <pageContent :contentConfig="contentConfig" />
  </div>
</template>

<script setup lang="ts">
import pageContent from "@/base-ui/pageContent/pageContent.vue";

import contentConfig from "./config/contentConfig";
</script>

<style lang="scss" scoped></style>
