/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-28 18:04:07
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-07 19:52:34
 * @FilePath: /permission-micro/src/common/directives/v-resize.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DirectiveBinding, Directive, App } from 'vue'

const domResizeFunc: Directive = {
  mounted (el: HTMLElement, binding: DirectiveBinding) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = ''
    let height = ''

    function isResize () {
      // @ts-ignore
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        binding.value(el) // 关键
      }
      width = style.width
      height = style.height
    }

    // @ts-ignore
    el.__vueSetInterval__ = setInterval(isResize, 300)
  },

  unmounted (el: HTMLElement) {
    // @ts-ignore
    clearInterval(el.__vueSetInterval__)
  }
}

export function setupDomResizeDirective (app: App) {
  app.directive('dom-resize', domResizeFunc)
}
