import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHistory } from 'vue-router'

import { basicRoutes } from './routes'

// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHistory(),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 配置路由器
export function setupRouter (app: App<Element>) {
  app.use(router)
}
