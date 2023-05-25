/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-06 15:45:16
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-06 15:45:16
 * @FilePath: /permission-portal/src/common/hooks/usePermission.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-27 16:42:40
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-04-28 12:58:19
 * @FilePath: /permission-micro/src/common/hooks/usePermission.ts
 * @Description: 权限hook
 */
import { useMenuStore } from '@/store/menu'
export function usePermission () {
  const menuStore = useMenuStore()

  function hasPermission (value: string, def = true): boolean {
    if (!value) return def
    const roleCode = menuStore.getRoleCode
    if (Array.isArray(value)) {
      return value.some(it => roleCode.includes(it))
    }
    return roleCode.includes(value)
  }
  return { hasPermission }
}