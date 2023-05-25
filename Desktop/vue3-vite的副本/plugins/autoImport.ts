/**
 * @name  AutoImport
 * @description 自动引入相关的依赖和生命周期函数和 hooks
 * 是一个按需自动导入Vue/Vue Router等官方Api的插件
 * 支持vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core等自动引入
 * 在组件中，就不需要再次引入相关的API，可以直接使用
 *
 * 解决eslint报错的问题： https://blog.csdn.net/sayUonly/article/details/123482912
 * eslintrc是用来解决eslint报错问题的配置项。当enabled为true时，会根据filepath生成一个eslint的配置文件。
 * 这个文件需要引入到eslint的配置文件中，例如：.eslintrc.js文件中
 * "extends": [
 *     "./.eslintrc-auto-import.json"
 *   ],
 *
 * 需要注意的是，一旦生成配置文件之后，最好把enable关掉，即改成false。
 * 否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开吧
 */
import AutoImport from 'unplugin-auto-import/vite'
export const AutoImportPlugin = () => {
  return AutoImport({
    // targets to transform
    include: [
      /\.[tj]sx?$/,
      /\.vue$/,
      /\.vue\?vue/,
      /\.md$/
    ],

    // global imports to register
    imports: [
      // 插件预设支持导入的api
      'vue',
      'vue-router',
      'vuex'
      // 自定义导入的api
    ],

    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },

    // Filepath to generate corresponding .d.ts file.
    // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
    // Set `false` to disable.
    dts: 'types/auto-imports.d.ts'
  })
};