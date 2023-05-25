/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-23 10:11:41
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-18 11:50:51
 * @FilePath: /vue3-vite/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'

import { registerGlobComp } from '@/components/registerGlobComp'
import { setupRouter, router } from '@/router'
import { setupStore } from '@/store'
import { setupRouterGuard } from '@/router/guard'
import { setupMicroApp } from '@/micro'
import { setupGlobDirectives } from '@/common/directives'

// 全局自定义样式
import 'virtual:windi.css'
import 'virtual:svg-icons-register'
import '@ksg/ksg-components/es/style'
import '@/assets/style/common.less'


async function mount () {
  const app = createApp(App)

  // 注册全局组件
  registerGlobComp(app)

  // 注册指令
  setupGlobDirectives(app)

  // 注册微应用
  setupMicroApp()

  // 注册store
  setupStore(app)

  // 注册router
  setupRouter(app)

  // 路由守卫
  setupRouterGuard(router)

  app.mount('#app')
}
mount()
