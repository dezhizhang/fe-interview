# 如何减少 Webpack 的打包体积

- 减少 Webpack 的打包体积是优化 Web 应用性能的重要步骤，尤其是在生产环境中。以下是几种常见的优化方式来减少 Webpack 打包输出的体积

### 使用生产模式（Production Mode）

- Webpack 内置了 production 和 development 模式。production 模式会自动进行代码压缩、去除开发时的调试信息，并优化输出的代码。

```js
module.exports = {
  mode: 'production',
};
```

### 代码压缩与丑化

- 在生产模式下，Webpack 会默认使用 TerserPlugin 来压缩和丑化 JavaScript 文件，移除无用代码、空白符等，减少体积。

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true, // 开启压缩
    minimizer: [new TerserPlugin()],
  },
};
```

- 对于 CSS 文件，你可以使用 css-minimizer-webpack-plugin 来压缩：

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(), // 压缩CSS
    ],
  },
};
```

### Tree Shaking

- Tree Shaking 是移除未使用的模块或代码的过程。Webpack 默认支持 ES6 模块的 Tree Shaking，在生产模式下自动启用。确保使用 ES6 模块 (import 和 export)，并避免使用不支持 Tree Shaking 的 CommonJS 模块。

```js
module.exports = {
  optimization: {
    usedExports: true, // 标记未使用的模块
  },
};
```

### 按需加载（Lazy Loading）

- 通过代码分割，按需加载应用中不同的模块，以减少首次加载的包大小。这可以通过 Webpack 内置的 import() 动态导入语法实现。

```js
// 按需加载某个模块
import('./module').then((module) => {
  module.doSomething();
});
```

### 使用第三方库的精简版本

- Lodash 提供 lodash-es 版本以支持 Tree Shaking。
- Moment.js 是一个体积较大的库，可以通过 moment/min/moment.min.js 使用压缩版本，或直接替换为较小的日期库如 dayjs。

### 移除不必要的 polyfill

- 如果使用了 Babel 进行编译，可以通过 @babel/preset-env 结合 useBuiltIns 选项只导入目标环境所需的 polyfill，以避免将所有 polyfill 导入。

```bash
npm install @babel/preset-env core-js
```

```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

### 图片优化

- 通过使用 image-webpack-loader 来压缩图片，减少图片资源的体积。

```bash
npm install image-webpack-loader --save-dev
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 75,
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.9],
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

### 移除 Moment.js 的本地化数据

- Moment.js 自带大量的本地化数据，往往不需要全部加载。可以通过 IgnorePlugin 移除未使用的本地化文件：

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};
```

### 压缩和分离 CSS

- 使用 MiniCssExtractPlugin 将 CSS 从 JavaScript 中分离出来，并与 optimize-css-assets-webpack-plugin 一起使用压缩 CSS。

```bash
npm install mini-css-extract-plugin optimize-css-assets-webpack-plugin --save-dev
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()],
  },
};
```

### 使用 Gzip 或 Brotli 压缩

- 通过 Webpack 的插件为打包后的资源文件进行压缩，可以极大减少文件体积。可以使用 compression-webpack-plugin 进行 Gzip 压缩，或使用 brotli-webpack-plugin 进行 Brotli 压缩。

```bash
npm install compression-webpack-plugin --save-dev
```

```js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
  ],
};
```

```bash
npm install brotli-webpack-plugin --save-dev
```

```js
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
  plugins: [
    new BrotliPlugin({
      asset: '[path].br[query]',
      threshold: 10240, // 文件大于10KB才压缩
      minRatio: 0.8,
    }),
  ],
};
```

### 总结

- 减少 Webpack 打包体积的关键策略包括：启用生产模式、Tree Shaking、按需加载、移除多余的库和 polyfill、使用精简版第三方库、压缩图片和代码、并且适时分离和压缩 CSS 和 JavaScript 文件。通过这些方法，可以显著减少输出文件的体积，提高应用的加载性能。
