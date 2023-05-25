/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:27:36
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-16 17:18:55
 * @Description: 项目路由配置
 */

import { AppRouteRecordRaw } from '@/router/types'
import { PageEnum } from '@/const/pageEnum'
import { dynamicRoutes } from '@/router/routes/dynamic'
import { staticRoutes } from '@/router/routes/static';

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};


export const basicRoutes = [RootRoute, ...staticRoutes, ...dynamicRoutes]