/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-27 16:15:00
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-04-27 17:09:32
 * @FilePath: /permission-micro/src/common/directives/permission.ts
 * @Description: 权限指令
 */
import type { App, Directive, DirectiveBinding } from 'vue'
import { usePermission } from '@/common/hooks/usePermission'

function isAuth (el: Element, binding: any) {
  const { hasPermission } = usePermission()
  const value = binding.value
  if (!value) return
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el)
  }
}


const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding)
}

const authDirective: Directive = {
  mounted
}

export function setupPermissionDirective (app: App) {
  app.directive('auth', authDirective)
}

export default authDirective