/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:33:03
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-04-21 09:55:14
 * @Description: 路由的一些types
 */
import type { RouteRecordRaw, RouteMeta } from 'vue-router';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: any
  fullPath?: string
}
