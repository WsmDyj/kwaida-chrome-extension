/*
 * @Author: shantingting@kuaishou.com
 * @Date: 2023-03-21 19:24:03
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-04-23 13:21:00
 * @Description: 介绍文件的作用、文件的入参、出参
 */
import vue from '@vitejs/plugin-vue';
import babel from 'vite-plugin-babel';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ConfigSvgIconsPlugin } from './SvgIcons';
import { AutoRegistryComponents } from './autoRegisterComponents';
import { AutoImportPlugin } from './autoImport';
import EslintPlugin from 'vite-plugin-eslint';
import { viteSwaggerMock } from '@ksg/vite-plugin-swagger-mock'
import mkcert from 'vite-plugin-mkcert';
import WindiCSS from 'vite-plugin-windicss'

export default function (isBuild: boolean) {
  return [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => /^micro-app/.test(tag)
        }
      }
    }),
    babel(),
    mkcert(),
    vueJsx(),
    viteSwaggerMock({
      swaggerUrl: 'https://kg-toolkit.staging.kuaishou.com/api',
      apiPrefix: '/api/api-docs',
      validParams: false,
      override: false,
      mockEnabled: true,
      logger: true,
      exclude: ['/home/warmup', '/home/health', 'permission/user-role/queryUserSystemRole']
    }),
    WindiCSS(),
    ConfigSvgIconsPlugin(isBuild),
    AutoRegistryComponents(), // 自动按需引入组件
    AutoImportPlugin(),
    EslintPlugin({
      cache: false,
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
    })
  ]
}