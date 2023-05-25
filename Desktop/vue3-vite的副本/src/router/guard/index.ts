/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:25:55
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-04-23 11:44:53
 * @FilePath: /vue3-vite/src/router/guard/index.ts
 * @Description: 这里注册一些路由拦截器
*/

import { createPermissionGuard } from '@/router/guard/permission'

import { Router } from 'vue-router';

export function setupRouterGuard (router: Router) {
  createPermissionGuard(router)
}