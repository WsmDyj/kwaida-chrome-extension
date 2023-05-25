/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:09:59
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 11:05:53
 * @Description: 系统菜单 store
 */
import { store } from '@/store'
import { defineStore } from 'pinia'
import { getMenuListRemote, getAllMenuListRemote } from '@/services/common'
import { Menus, UserState, HeaderMenu, TypeValue } from '@/store/menu/types'
import { cloneDeep } from 'lodash-es'
import { useProjectStore } from '@/store/project'
import { PageEnum } from '@/const/pageEnum'
export * from './types'

// 根据返回结构过滤菜单以及用户权限点
function convertMenus (data: Menus[], codes: string[] = []) {
  const menus: Menus[] = cloneDeep(data).filter((item) => {
    if ([TypeValue.menu, TypeValue.app].includes(item.typeCode)) {
      item.serviceUrl && codes.push(item?.serviceUrl)
      return true
    } else {
      codes.push((item.typeCode === TypeValue.page ? item.serviceUrl : item.code) as string)
      item.children && convertMenus(item.children, codes)
      return false
    }
  })
  menus.forEach((item) => {
    item.title = item.name
    item.key = item.code
    item.path = item.serviceUrl
    item.children && (item.children = convertMenus(item.children, codes).menus)
  })
  return { menus, codes }
}

export const useMenuStoreFunc = defineStore({
  id: 'app-menu',
  state: (): UserState => ({
    menuList: [],
    roleCode: [],
    roleList: [],
    activeKey: window.location.pathname.split('/')[1] // 激活的顶部菜单
  }),
  getters: {
    getMenuList (): Menus[] {
      return this.menuList
    },
    getRoleCode (): string[] {
      return this.roleCode
    },
    getRoleList (): Menus[] {
      return this.roleList
    },
    getActiveKey (): string {
      return (this.activeKey || this.headerMenu?.[0]?.tabKey) as string
    }
  },
  actions: {
    setMenuList (data: Menus[]) {
      this.menuList = data || []
    },
    setHeaderMenu (data: HeaderMenu[]) {
      this.headerMenu = data || []
    },
    setRoleCode (data: string[]) {
      this.roleCode = data || []
    },
    setRoleList (data: Menus[]) {
      this.roleList = data || []
    },
    setActiveKey (data: string) {
      this.activeKey = data || ''
    },
    getCommonPage (data?: string): boolean {
      return ![PageEnum.PROJECT_KEY].includes(data || (this.getActiveKey as any))
    },
    // 获取权限菜单
    async getAuthMenuList (isId = true): Promise<void> {
      const projectStore = useProjectStore()
      const params = isId ? { nodeId: projectStore.getActiveProject } : null
      const data = await getMenuListRemote(params)
      if (data.length) {
        this.setRoleList(data[0].children)
        const { codes } = convertMenus(data[0].children)
        this.setRoleCode(codes)
      }
    },
    // 获取所有菜单
    async getMenuListAction (): Promise<void> {
      const menuList = await getAllMenuListRemote()
      if (menuList.length) {
        const { menus } = convertMenus(menuList[0].children)
        this.setMenuList(menus)
      }
    }
  }
})

export function useMenuStore () {
  return useMenuStoreFunc(store)
}
