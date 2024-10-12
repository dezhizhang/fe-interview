# 有哪些常见的 loader 和 Plugin

- 在 Webpack 中，loader 和 plugin 是两大关键概念，它们分别负责模块转换和打包过程中的扩展功能。以下是一些常见的 loader 和 plugin

### 常见的 Loader

- Loader 用于对模块的源代码进行转换处理，将非 JavaScript 文件转换为 Webpack 能理解的模块。在 Webpack 中，loader 是函数，接受源文件并返回转换后的结果。

1. ##### babel-loader

- 用途：将 ES6+ 代码转换为 ES5，以确保浏览器兼容性。
- 搭配工具：通常与 Babel 一起使用。

```bash
npm install babel-loader @babel/core @babel/preset-env --save-dev

```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
```

2. ##### css-loader 和 style-loader

- css-loader：解析 @import 和 url() 语法，使得 CSS 文件可以作为模块加载。
- style-loader：将 CSS 插入到 DOM 中，通常与 css-loader 一起使用。

```bash
npm install css-loader style-loader --save-dev
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 顺序从右到左
      },
    ],
  },
};
```

3. ##### file-loader

- 用途：处理文件（如图片、字体等），并将其复制到输出目录中，返回文件的 URL。

```bash
npm install file-loader --save-dev
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: 'file-loader',
      },
    ],
  },
};
```

4. ##### url-loader

- 用途：与 file-loader 类似，但当文件小于指定的大小时，会将文件转为 base64 URL 形式嵌入，而不是生成单独的文件。

```bash
npm install url-loader --save-dev

```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于 8KB 的文件将转为 base64
          },
        },
      },
    ],
  },
};
```

5. ##### ts-loader

- 用途：将 TypeScript 文件编译为 JavaScript。

```bash
npm install ts-loader typescript --save-dev
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
```

6. ##### sass-loader

- 用途：将 SCSS/SASS 文件编译为 CSS，通常与 css-loader 和 style-loader 一起使用。

```bash
npm install sass-loader sass css-loader style-loader --save-dev
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

### 常见的 Plugin

- Plugin 允许 Webpack 提供更多功能，除了简单的文件转换，它们可以优化打包、压缩代码、分离 CSS 等。

1. ##### HtmlWebpackPlugin

- 用途：生成 HTML 文件，并自动注入打包后的 JavaScript 文件。

```bash
npm install html-webpack-plugin --save-dev
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 使用的模板
    }),
  ],
};
```

2. ##### MiniCssExtractPlugin

- 用途：将 CSS 从 JavaScript 中分离出来，生成独立的 CSS 文件。适用于生产环境。

```bash
npm install mini-css-extract-plugin --save-dev
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
```

3. ##### CleanWebpackPlugin

- 用途：在每次构建时，清理输出目录，防止生成过多的无用文件。

```bash
npm install clean-webpack-plugin --save-dev
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(), // 默认清理 output 目录
  ],
};
```

4. ##### DefinePlugin

- 用途：定义全局变量，常用于注入环境变量或进行条件编译。

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
```

5. ##### TerserPlugin

- 用途：在生产环境中压缩 JavaScript 代码，Webpack 5 已内置，无需额外安装。

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
```

6. ##### OptimizeCSSAssetsPlugin

- 用途：压缩 CSS 代码，通常与 MiniCssExtractPlugin 一起使用。

```bash
npm install optimize-css-assets-webpack-plugin --save-dev
```

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()],
  },
};
```

7. ##### BundleAnalyzerPlugin

- 用途：生成打包文件的可视化报告，帮助分析打包后的文件大小。

```bash
npm install webpack-bundle-analyzer --save-dev
```

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

8. ##### HotModuleReplacementPlugin

- 用途：实现模块热替换，允许在运行时替换、添加或删除模块，而无需重新刷新整个页面。

```js
const webpack = require('webpack');

module.exports = {
  devServer: {
    hot: true, // 启用 HMR
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
```
