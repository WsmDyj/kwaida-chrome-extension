/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-04-21 09:09:59
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-05-10 15:33:06
 * @Description: 微应用注册
 */
import microApp from '@micro-zoe/micro-app'

export function setupMicroApp () {
  microApp.start({
    'disable-memory-router': true, // 关闭虚拟路由系统
    'disable-patch-request': true, // 关闭对子应用请求的拦截
    globalAssets: {
      js: [],
      css: []
    },
    plugins: {}
  })
}
