/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-07 21:06:16
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 10:27:23
 * @FilePath: /pressure-test/src/layout/headerMenu.tsx
 * @Description: 项目选择
 */
import { useMenuStore } from '@/store/menu'
import { useProjectStore } from '@/store/project'
import { PageEnum } from '@/const/pageEnum'
const ProjectSelect = defineComponent({
  emits: ['change'],
  setup (props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const menuStore = useMenuStore()
    const projectStore = useProjectStore()
    
    const activeProject = ref(projectStore.getActiveProject)

    const projectList = computed(() => projectStore.getProjectList)
    
    watch(() => projectStore.getActiveProject, (value) => {
      activeProject.value = value
    })


    async function handleChange (value: number) {
      emit('change', value)
      await projectStore.setActiveProject(value)
      await menuStore.getAuthMenuList()
      const path = route.path.includes('error') ? PageEnum.BASE_HOME : route.path
      router.push({ path, query: { timestamp: new Date().valueOf() } })
    }
	 
    return () => (
      <div class="header-project-select">
        {menuStore.getActiveKey !== PageEnum.PROJECT_KEY ? (
          <a-select
            v-model={[activeProject.value, 'value']}
            style={{ width: '160px' }}
            placeholder="请选择项目"
            onChange={handleChange}
            class="pressure-home__header-select"
            show-search
            fieldNames={{ label: 'name', value: 'nodeId' }}
            options={projectList.value}
            filterOption={(value: string, options: { name: string }) => {
              return options.name && options.name.includes(value)
            }}
          />
        ) : null}
      </div>
    )
  }
})

export default ProjectSelect
