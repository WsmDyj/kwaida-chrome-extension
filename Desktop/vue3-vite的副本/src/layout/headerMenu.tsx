/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-07 21:06:16
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-22 16:35:04
 * @FilePath: /pressure-test/src/layout/headerMenu.tsx
 * @Description: 顶部导航
 */
import { useMenuStore, Menus } from '@/store/menu'

const HanderMenu = defineComponent({
  setup () {
    const menuStore = useMenuStore()
    const router = useRouter()

    const activeKey = computed<string>({
      get () {
        return menuStore.getActiveKey
      },
      set (value) {
        menuStore.setActiveKey(value)
      }
    })
    
    return () => (
      <a-tabs
        onChange={async () => {
          const isId = menuStore.getCommonPage(activeKey.value)
          await menuStore.getAuthMenuList(isId)
          router.push({ path: `/${activeKey.value}` })
        }}
        v-model={[activeKey.value, 'activeKey']}
        class="flex ksg-common__tabs-content-hide pl-12px"
      >
        {menuStore.getMenuList.map((item: Menus) => {
          return (
            <a-tab-pane
              key={item.code}
              disabled={!item.enabled}
              v-slots={{
                tab: () => (
                  <div class="text-sm">
                    <icon-font size={14} type={item.icon} />
                    <span>{item.name}</span>
                  </div>
                )
              }}
            />
          )
        })}
      </a-tabs>
    )
  }
})

export default HanderMenu
