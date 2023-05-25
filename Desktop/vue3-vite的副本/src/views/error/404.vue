<!--
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-06 16:03:58
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 09:46:53
 * @FilePath: /permission-portal/src/views/error/401.vue
 * @Description: 无权限页面
-->
<script lang="tsx">
import KsgPageWrapper from '@/components/KsgPageWrapper.vue';
import KsgSvgIcon from '@/components/KsgSvgIcon.vue';
import { getAdminListRemote } from '@/services/common'
import KsgKim from '@/components/KsgKim.vue'
import { Spin } from 'ant-design-vue';
export default defineComponent({
  setup () {
    let adminList = ref()
    let loading = ref<boolean>(false)
    onMounted(() => {
      getAdminList()
    })
    async function getAdminList () {
      loading.value = true
      const data = await getAdminListRemote({
        resourceCode: 'system_permison_role'
      })
      adminList.value = data
      loading.value = false
    } 

    return () => (
      <KsgPageWrapper>
        <div class="pt-200px h-full bg-light-50 w-full flex justify-center">
          <Spin spinning={loading.value}>
            <div class="flex">
              <KsgSvgIcon size={300} name="404" />
              <div class="ml-24px">
                <div class="font-bold text-7xl">Oops!</div>
                <div class="text-xl mt-24px">当前页面未找到或暂未对外开放</div>
                <div class="mt-12px">可联系下方管理员进行咨询</div>
                <div class='flex w-400px flex-wrap'>
                  {adminList.value?.superAdminDetailList?.map((item: any) => <div class='ml-12px mt-12px w-80px'><KsgKim value={item} /></div>)}
                </div>
              </div>
            </div>
          </Spin>
        </div>
      </KsgPageWrapper>
    );
  },
});
</script>
