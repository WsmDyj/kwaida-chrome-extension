/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:27:36
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 15:53:22
 * @Description: 静态路由
 */
import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'

// 没有权限页面
export const noPermission: RouteRecordRaw = {
  path: '/error',
  component: LAYOUT,
  name: 'error',
  meta: { title: '错误页面', icon: '', ignoreAuth: true },
  redirect: '/error/401',
  children: [
    {
      path: '401',
      name: '401',
      meta: { title: '401', icon: '', ignoreAuth: true },
      component: () => import('@/views/error/401.vue')
    }
  ]
}

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  meta: { title: '错误页面', icon: '', ignoreAuth: true },
  component: LAYOUT,
  children: [
    {
      path: '/:path(.*)*',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        ignoreAuth: true
      }
    }
  ]
}
export const staticRoutes: RouteRecordRaw[] = [noPermission, PAGE_NOT_FOUND_ROUTE]
