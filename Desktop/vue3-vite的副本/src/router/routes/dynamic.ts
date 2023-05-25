/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:27:36
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-25 10:18:24
 * @Description: 动态路由
 */
import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/constant'

// 业务路由
export const businessRoutes: RouteRecordRaw[] = []


// 项目中心路由
export const permissionRoutes: RouteRecordRaw[] = [
  {
    path: '/projectCenter',
    name: 'projectCenter',
    meta: {
      hideBreadcrumb: true
    },
    redirect: '/projectCenter/system',
    children: [
      {
        path: 'system',
        name: 'projectCenter_system',
        component: LAYOUT,
        meta: { title: '系统管理' },
        redirect: '/projectCenter/system/permison',
        children: [
          {
            path: 'permison',
            name: 'projectCenter_system_permison',
            component: () => import('@/views/permission/index.vue'),
            meta: { title: '权限设置' }
          }
        ]
      }
    ]
  }
]


export const dynamicRoutes = [...permissionRoutes, ...businessRoutes]
