import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import * as path from 'path'
import plugins from './plugins'
import config from './config.json'

const isBuild = process.env.NODE_ENV === 'production'
const isLocal = process.env.NODE_ENV === 'development'


const projectName = config.projectCode
const CDNHOST = {
  local: '/',
  develop: `https://cdnfile.corp.kuaishou.com/kc/files/a/sogame-static-staging/${projectName}`,
  production: `https://cdnfile.corp.kuaishou.com/kc/files/a/sogame-static/${projectName}`
}

export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    base: isLocal ? CDNHOST.local : CDNHOST[mode] || CDNHOST.production,
    plugins: [...plugins(isBuild)],
    server: {
      host: 'test.corp.kuaishou.com', // 需要在/etc/hosts里添加别名
      port: 8081,
      https: true,
      open: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
        // "@micro-zoe/micro-app": path.join(__dirname, '../../../micro-app/lib/index.esm.js'),
      },
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        less: {
          // modifyVars: {
          //   hack: `true; @import (reference) "${path.resolve('src/assets/style/common.less')}";`
          // },
          additionalData: '@import "src/assets/style/common.less";',
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps: {
      include: ['@vue/runtime-core', '@vue/shared', 'ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US']
    }
  }
}
