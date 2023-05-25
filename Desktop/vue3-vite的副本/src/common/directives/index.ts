/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-27 16:15:00
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-04-28 18:05:34
 * @FilePath: /permission-micro/src/common/directives/permission.ts
 * @Description: 全局指令
 */
import type { App } from 'vue'
import { setupPermissionDirective } from './permission'
import { setupDomResizeDirective } from './v-resize'

export function setupGlobDirectives (app: App) {
  setupPermissionDirective(app)
  setupDomResizeDirective(app)
}
