

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Webpack Plugin Chart</h1>
  <p>打包查看你的项目资源</p>
</div>

可以在线打开一个浏览器端口查看你的打包后的项目资源

<h2 align="center">安装</h2>

```bash
# NPM
npm install --save-dev webpack-plugin-chart
# Yarn
yarn add -D webpack-plugin-chart
```

<h2 align="center">使用</h2>

```js
const  WebpackPluginChart= require('webpack-plugin-chart');

module.exports = {
  plugins: [
    new  WebpackPluginChart()
  ]
}
```


<h2 align="center">配置</h2>

```js
new BundleAnalyzerPlugin(options?: object)
```


| **Name**   | **Type**  | **Description**   | 
| ---------- | --------- | ---------- | 
| analyzerPort | `{Number}` or `auto`  |Default: `8899`. 默认启动的浏览器端口| 
| reportTitle    | `{String\|function}`| 浏览器句柄标题名称| 




