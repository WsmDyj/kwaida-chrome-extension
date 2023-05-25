<script lang="tsx">
import { useUserStore } from '@/store/user';
import { useMenuStore, Menus } from '@/store/menu';
import { useRoute } from 'vue-router';
import { KsgLayout } from '@ksg/ksg-components';
import KsgSvgIcon from '@/components/KsgSvgIcon.vue'
import type { MenuProps } from 'ant-design-vue'
import HanderMenu from '@/layout/headerMenu'
import ProjectSelect from '@/layout/projectSelect'
import * as config from '../../config.json'
export default defineComponent({
  title: 'Layout组件-mix模式',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const menuStore = useMenuStore()
    const isRouterAlive = ref(true)

    const menuList = computed(() => {
      // return menuStore.getMenuList
      return menuStore.getMenuList.filter((item: Menus) => item.code.includes(menuStore.getActiveKey))?.[0]?.children || []
    });

    const matched = computed(() => {
      return route.matched || [];
    });

    const openKeys = computed<MenuProps['openKeys']>(() => {
      return menuList.value.map(item => { return item.code })
      
    });

    const activeRouteName = computed<string>(() => {
      return (route.meta?.activeRouteName || route.name) as string;
    });

    const reloadRouterView = () => {
		  isRouterAlive.value = false
		  nextTick(() => {
			  isRouterAlive.value = true
		  })
	  }

    function onProjectChange () {
      router.replace({ 
        path: route.path, 
      })
		  reloadRouterView()
    }


    return () => (
      <KsgLayout
        class="h-full"
        title={config.projectName}
        menu-list={menuList.value}
        user-info={userStore.getUserInfo}
        route-name={activeRouteName.value}
        route-matched={matched.value}
        openKeys={openKeys.value}
        v-slots={{ 
          logo: () => <KsgSvgIcon size={28} name="logo" />,
          headerMenu: () => <HanderMenu />,
          tools: () => <><ProjectSelect onChange={onProjectChange} /></>
        }}
      >
        {
          isRouterAlive.value ? 
            <>
              <router-view />
            </> : null
        }
      </KsgLayout>
    )
  },
});
</script>
