

<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>Webpack Plugin Chart</h1>
  <p>打包查看你的项目资源</p>
</div>

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




功能与使用:

1. Realize what's *really* inside your bundle
2. Find out what modules make up the most of its size
3. Find modules that got there by mistake
4. Optimize it!

And the best thing is it supports minified bundles! It parses them to get real size of bundled modules.
And it also shows their gzipped sizes!

<h2 align="center">配置</h2>

```js
new BundleAnalyzerPlugin(options?: object)
```

|Name|Type|Description|
|:--:|:--:|:----------|
|**`analyzerMode`**|One of: `server`, `static`, `json`, `disabled`|Default: `server`. In `server` mode analyzer will start HTTP server to show bundle report. In `static` mode single HTML file with bundle report will be generated. In `json` mode single JSON file with bundle report will be generated. In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`. |
|**`analyzerHost`**|`{String}`|Default: `127.0.0.1`. Host that will be used in `server` mode to start HTTP server.|
|**`analyzerPort`**|`{Number}` or `auto`|Default: `8888`. Port that will be used in `server` mode to start HTTP server.|
|**`reportFilename`**|`{String}`|Default: `report.html`. Path to bundle report file that will be generated in `static` mode. It can be either an absolute path or a path relative to a bundle output directory (which is output.path in webpack config).|
|**`reportTitle`**|`{String\|function}`|Default: function that returns pretty printed current date and time. Content of the HTML `title` element; or a function of the form `() => string` that provides the content.|
|**`defaultSizes`**|One of: `stat`, `parsed`, `gzip`|Default: `parsed`. Module sizes to show in report by default. [Size definitions](#size-definitions) section describes what these values mean.|
|**`openAnalyzer`**|`{Boolean}`|Default: `true`. Automatically open report in default browser.|
|**`generateStatsFile`**|`{Boolean}`|Default: `false`. If `true`, webpack stats JSON file will be generated in bundle output directory|
|**`statsFilename`**|`{String}`|Default: `stats.json`. Name of webpack stats JSON file that will be generated if `generateStatsFile` is `true`. It can be either an absolute path or a path relative to a bundle output directory (which is output.path in webpack config).|
|**`statsOptions`**|`null` or `{Object}`|Default: `null`. Options for `stats.toJson()` method. For example you can exclude sources of your modules from stats file with `source: false` option. [See more options here](https://webpack.js.org/configuration/stats/). |
|**`excludeAssets`**|`{null\|pattern\|pattern[]}` where `pattern` equals to `{String\|RegExp\|function}`|Default: `null`. Patterns that will be used to match against asset names to exclude them from the report. If pattern is a string it will be converted to RegExp via `new RegExp(str)`. If pattern is a function it should have the following signature `(assetName: string) => boolean` and should return `true` to *exclude* matching asset. If multiple patterns are provided asset should match at least one of them to be excluded. |
|**`logLevel`**|One of: `info`, `warn`, `error`, `silent`|Default: `info`. Used to control how much details the plugin outputs.|



