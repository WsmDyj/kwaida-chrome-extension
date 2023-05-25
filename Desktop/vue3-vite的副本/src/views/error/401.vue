<!--
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-06 16:03:58
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 11:34:28
 * @FilePath: /permission-portal/src/views/error/401.vue
 * @Description: 无权限页面
-->
<script lang="tsx">
import KsgSvgIcon from '@/components/KsgSvgIcon.vue'
import { getAdminListRemote } from '@/services/common'
import { useProjectStore } from '@/store/project'
import { useMenuStore } from '@/store/menu'
import KsgKim from '@/components/KsgKim.vue'

export default defineComponent({
  setup () {
    let adminList = ref()
    const projectStore = useProjectStore()
    const menuStore = useMenuStore()
    onMounted(() => {
      getAdminList()
    })
    async function getAdminList () {
      const data = await getAdminListRemote({
        resourceCode: 'system_permison_role',
        nodeId: projectStore.getActiveProject || null
      })
      adminList.value = data
    } 

    const title = computed(() => {
      return projectStore.getActiveProject || !menuStore.getCommonPage()  ? '您暂无当前页面权限' : '请先在右上角选择项目'
    })

    return () => 
      <div class='pt-100px pl-1/5 bg-light-50 h-full w-full'>
        <div class='flex h-full'>
          <KsgSvgIcon size={300} name="401" />
          <div class='ml-24px flex f-full overflow-hidden flex-col'>
            <div class='font-bold text-4xl'>{title.value}</div>
            <div class='mt-24px text-base'>可联系下方各项目管理员添加权限</div>
            <div class='mt-24px flex'>
              {adminList.value?.superAdminDetailList.length ? <>
                <div class='font-bold'>超管:</div>
                {adminList.value?.superAdminDetailList?.slice(0,5).map((item: any) => <div class='ml-12px'><KsgKim value={item} /></div>) }
              </> : null}
            </div>
            <div class='flex-1 pb-24px overflow-y-scroll'>
              {adminList.value?.dataNodeUserRoleDetailList.map((item: any) => {
                return <div class='flex mt-12px'>
                  <div class='font-bold max-w-300px truncate'>{item.name}:</div>
                  {item.userDetailList && item.userDetailList.length ? item.userDetailList?.slice(0, 5).map((item: any) =>
                    <div class="ml-12px flex"><KsgKim value={item} /></div>
                  ) :  <div class="ml-12px">暂无管理员</div>}
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
  },
})
</script>