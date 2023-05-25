/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:25:33
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 10:19:15
 * @Description: 用户信息拦截
 */

import { Router } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'
import { useProjectStore } from '@/store/project'

export function createPermissionGuard (router: Router) {
  const useUser = useUserStore()
  const useMenu = useMenuStore()
  const useProject = useProjectStore()
  router.beforeEach(async (to, from, next) => {
    const logined = useUser.getLogined
    // 获取用户信息
    if (!logined) {
      await useUser.getUserInfoAction()
      await useMenu.getMenuListAction()
      await useProject.getProjectRemote()
      await useMenu.getAuthMenuList(useMenu.getCommonPage())
    }
    // if (!useMenu.roleCode.includes(to.path) && !to.meta.ignoreAuth) {
    //   console.log('暂无权限')
    //   next('/error')
    //   return
    // }
    next()
  })
}
