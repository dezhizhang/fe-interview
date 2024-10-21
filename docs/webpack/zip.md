# 如何使用 Webpack 进行代码压缩

## 1. 使用生产模式 (`mode: 'production'`)

Webpack 在 **生产模式** (`production`) 下默认会自动压缩 JavaScript 代码，并启用各种优化设置。这是最简单的压缩方式。

在 `webpack.config.js` 中，设置 `mode` 为 `production`：

```javascript
module.exports = {
  mode: 'production', // 开启生产模式
  // 其他配置...
};
```

在生产模式下，Webpack 会自动使用 TerserPlugin 来压缩和混淆 JavaScript 代码，同时还会启用其他性能优化措施（如 tree shaking）。

## 2. 使用生产模式 (`mode: 'production'`)

如果你需要自定义压缩行为，可以手动配置 TerserPlugin。TerserPlugin 是 Webpack 内置的插件，用于压缩和混淆 JavaScript。

首先，安装 TerserPlugin（若使用较新的 Webpack，TerserPlugin 是默认包含的，无需安装）：

```bash
npm install terser-webpack-plugin --save-dev
```

然后，在 webpack.config.js 中配置：

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true, // 启用代码压缩
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 去除 console.log 语句
          },
          mangle: true, // 混淆变量名
          format: {
            comments: false, // 去除注释
          },
        },
        extractComments: false, // 禁止将注释提取到单独的文件中
      }),
    ],
  },
};
```

### TerserPlugin 配置说明

- compress.drop_console: 移除代码中的 console.log，以进一步减少体积。
- mangle: 启用变量混淆，将变量名重命名为短名。
- format.comments: 去除注释。

## 3. 压缩 CSS 文件

对于 CSS 文件，使用 css-minimizer-webpack-plugin 来进行压缩。它可以和 TerserPlugin 一起使用，用于压缩样式文件。

首先，安装 CSS 压缩插件：

```bash
npm install css-minimizer-webpack-plugin --save-dev

```

在 webpack.config.js 中配置：

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // 扩展默认 minimizers（包括 TerserPlugin）
      new CssMinimizerPlugin(),
    ],
  },
};
```

## 4. 压缩 CSS 文件

对于图片资源，可以使用 image-webpack-loader 进行压缩。
首先，安装相关插件：

```bash
npm install image-webpack-loader --save-dev
```

在 webpack.config.js 中配置：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader', // 加载文件
          },
          {
            loader: 'image-webpack-loader', // 压缩图片
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75, // JPEG 压缩质量
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.9], // PNG 压缩质量
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
};
```

## 4. 压缩 HTML 文件

使用 html-webpack-plugin 可以生成 HTML 文件，并且配合 html-minifier 对其进行压缩。

首先，安装插件：

```bash
npm install html-webpack-plugin --save-dev
```

在 webpack.config.js 中配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true, // 移除注释
        collapseWhitespace: true, // 移除空格和换行
        removeAttributeQuotes: true, // 移除属性中的引号
      },
    }),
  ],
};
```

### 总结

在 Webpack 中，进行代码压缩的方式多种多样，主要分为以下几类：

- 生产模式下自动压缩 JavaScript 文件。
- 手动配置 TerserPlugin 来定制压缩行为。
- 使用 css-minimizer-webpack-plugin 压缩 CSS 文件。
- 使用 image-webpack-loader 压缩图片资源。
- 使用 html-webpack-plugin 配合 html-minifier 压缩 HTML 文件。
