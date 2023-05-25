<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default defineComponent({
  setup () {
    return {
      locale: zhCN
    };
  }
});
</script>
<style>
h1 {
  color: red
}
</style>