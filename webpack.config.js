/*
 * @Author: wusimin wusimin@kuaishou.com
 * @Date: 2023-08-26 15:15:35
 * @LastEditors: wusimin wusimin@kuaishou.com
 * @LastEditTime: 2023-08-26 15:15:41
 * @FilePath: /kwaida-chrome-extension/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path=require("path")
const CopyPlugin = require('copy-webpack-plugin');
module.exports={
    entry: {
        'content-scripts': './src/content-scripts.ts',
        background: './src/background.ts',
        'interceptor':'./src/interceptor.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use:['ts-loader'],
                exclude:'/node_modules/'
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    to: './'
                },
            ]
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    mode: "production"
}
