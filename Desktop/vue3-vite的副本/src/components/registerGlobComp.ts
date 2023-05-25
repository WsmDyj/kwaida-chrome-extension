/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-05-10 15:35:52
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 15:35:56
 * @FilePath: /vue3-vite/src/components/registerGlobComp.ts
 * @Description: 注册全局组件
 */
import type { App } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
import KsgFormText from '@/components/KsgFormText.vue'
import { KsgForm } from '@ksg/ksg-components'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3217625_sdalmsgmlx.js' // 在 iconfont.cn 上生成
})

export const registerGlobComp = (app: App) => {
  app.component('IconFont', IconFont)
  KsgForm.useComponentRegister('KsgFormText', KsgFormText)
}
