_# ksg-project-template

游戏中台前端项目脚手架

## 下载依赖
```shell
yarn install
```

## 启动项目
```shell
yarn dev
```


## 打包项目
```shell
yarn build
```

## 项目配置
基本跟项目相关需压迫改动的配置都写在config.json文件里

### projectCode
项目的唯一标识，反馈组件&前端网关路由&接口权限都会用到这个值

在百宝箱项目进行配置
https://gameweb-component-config-kfx.kproxy.corp.kuaishou.com/#/projectList

1. 新建项目
2. 配置网关路由等信息 (目前还需要在网关后台配置 https://sogame-kagura-gateway.staging.kuaishou.com/, 后续会迁移到百宝箱统一配置)
3. 配置权重中台appKey （选填，接入权限时需要添加）

### weblogger&&radar配置 （选配）
loggerId, 对应weblogger的kpn; radarId,  对应radar的项目id
接入文档：
https://docs.corp.kuaishou.com/k/home/VQ-Jtpowu-ew/fcACYWcC5qE4fS_WJWIc_cb6M

### psId（选配）
广播组件，接入文档： https://product-studio.corp.kuaishou.com/#/ 

### 星级评分配置
选择对应项目后， 需配置打开进行评分为显示
https://gameweb-component-config-kfx.kproxy.corp.kuaishou.com/#/authConfig
### 
## git Hook
husky 是一个 Git Hook 工具，借助 husky 我们可以在 git 提交的不同生命周期进行一些自动化操作。   
eslint 校验和提交时 commit 信息的规范校验

- pre-commit
  ```shell
  # .husky/pre-commit
  # 目前只做了eslint规则的校验
  yarn lint
  ```

- commit-msg 规则
  ```shell
  # .husky/commit-msg
  # https://www.conventionalcommits.org/zh-hans/v1.0.0/
  # https://github.com/woai3c/Front-end-articles/blob/master/git%20commit%20style.md
  yarn commitlint
  ```
  ```markdown
  提交模板：
  type(scope?): subject 换行 body 换行 footer
  
  <类型>[可选的作用域]: <描述>
  
  [可选的正文]
  
  [可选的脚注]
  
  ```
  示例：
  - 包含了描述以及正文内有破坏性变更的提交说明
      ```shell
      feat: allow provided config object to extend other configs
      
      BREAKING CHANGE: `extends` key in config file is now used for extending other config files
      ```

  - 为 fix 编写的提交说明，包含（可选的） issue 编号

      ```shell
      fix: correct minor typos in code
      
      see the issue for details on the typos fixed
      
      closes issue #12
      ```

## 常用plugin

- `@vitejs/plugin-vue-jsx`  支持jsx插件
- `vite-plugin-svg-icons` svg图片简化使用的插件
- `unplugin-vue-components` 自动注册本地以及第三方组件
- `unplugin-auto-import` 自动导入预设插件的API（vue、vue-router、vuex）
- `vite-plugin-eslint` 实时进行aslant 校验



## eslint

```json
// package.json
{
  "eslint": "^8.22.0",
  "eslint-plugin-vue": "^9.4.0",
}

// .eslintrc.js
{
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    './.eslintrc-auto-import.json'
  ],
  plugins: ['vue', '@typescript-eslint']
  // 其他规则查阅.eslintrc.js文件
}
```

## docs

项目相关的说明文档都放置`docs`目录下，方便统一管理帮助文档

## [yomi](./docs/yomi-usage.md)

## [mock-server](./docs/mock-server-readme.md)


详细看对应文档

## [const 常量](./docs/const-readme.md)

详细看对应文档

## directive

- `domResizeFunc` 实时监听dom 大小变化
- `downloadUrl`点击连接下载文件指令
