/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:09:59
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 15:41:27
 * @Description: 用户信息 store
 */
import { defineStore } from 'pinia'
import { store } from '@/store'
import { UserInfo } from '@/store/user/types'
import { getUserInfoRemote } from '@/services/common'
import { initPsSdk } from '@/utils/plugin'

interface UserState {
  userInfo: Nullable<UserInfo>
  logined: boolean
}

export const useUserStoreFunc = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    logined: false // 是否已经登录
  }),
  getters: {
    getUserInfo (): UserInfo {
      return this.userInfo as UserInfo
    },
    getLogined (): boolean {
      return this.logined
    }
  },
  actions: {
    setUserInfo (info: UserInfo | null) {
      this.userInfo = info
    },
    setLogined (info: boolean) {
      this.logined = info
    },
    // 获取用户信息
    async getUserInfoAction (): Promise<UserInfo | null> {
      const userInfo = await getUserInfoRemote()
      if (userInfo) {
        initPsSdk(userInfo.username)
        this.setUserInfo(userInfo)
      }
      this.setLogined(true)
      return userInfo
    }
  }
})

export function useUserStore () {
  return useUserStoreFunc(store)
}
