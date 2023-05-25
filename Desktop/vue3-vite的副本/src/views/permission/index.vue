<template>
  <KsgPageWrapper :loading="loading">
    <micro-app
      :name="micro"
      class="h-full permission-micro"
      :url="config.microUrl"
      :data="microAppData"
      iframe
      keep-alive
      @error="handleError"
      @mounted='handleMount'
      @datachange="handleDataChange"
    />
  </KsgPageWrapper>
</template>
<script lang="ts">
import KsgPageWrapper from '@/components/KsgPageWrapper.vue'
import { useMicroConfig } from '@/micro';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useMenuStore } from '@/store/menu';
import * as projectConfig from '../../../config.json'

export default defineComponent({
  name: 'Permission',
  components: { KsgPageWrapper },
  setup () {
    const micro = 'permission-micro-app';
    const route = useRoute()
    const userStore = useUserStore();
    const menuStore = useMenuStore();
    const loading = ref<boolean>(true)

    let microAppData = ref({
      path: route.meta?.microPath || '#',
      userInfo: userStore.getUserInfo,
      projectCode: projectConfig.projectCode,
      roleCode: menuStore.getRoleCode,
      menus: menuStore.getRoleList
    })

    const { config } = useMicroConfig(micro);


    //  已经渲染完成
    function handleMount (): void {
      loading.value = false
    }

    function handleError (): void {
      loading.value = false
      console.error(`子应用 ${micro} 加载出错了`)
    }

    function handleDataChange (e: CustomEvent): void {
      console.log('来自子应用 child-vite 的数据:', e.detail.data);
    }
    return {
      microAppData,
      micro,
      config,
      loading,
      handleMount,
      handleDataChange,
      handleError,
    };
  },
});
</script>
<style lang="less">
.permission-micro {
   padding: 0 24px;
   background: #fff;
  micro-app-body {
    height: 100%;
  }
}
</style>
