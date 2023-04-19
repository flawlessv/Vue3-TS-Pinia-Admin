<template>
  <div class="login">
    <loginPanel />
  </div>
</template>

<script setup lang="ts">
import loginPanel from "./cpns/loginPanel.vue";
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/img/login-bg.svg");
  width: 100%;
  height: 100%;
}
</style>
