/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-27 16:42:40
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 20:01:19
 * @FilePath: /permission-micro/src/common/hooks/usePermission.ts
 * @Description: 寻找有权限的根路径
 */
import { useMenuStore, Menus } from '@/store/menu'
import { router } from '@/router'
const menuStore = useMenuStore()

export function useFindRootPath () {
  function findRootPath (data: Menus[]) {
    if (!data || !data.length) {
      return router.push({ path: '/error' })
    }
    const item = data[0]
    if (item.children?.length && item.children.some((it) => it.typeCode === 'menu')) {
      findRootPath(item.children)
    } else {
      router.push({ path: item.serviceUrl as string })
    }
  }
  watch(
    () => menuStore.getRoleList,
    (data) => {
      findRootPath(data)
    }
  )
}
