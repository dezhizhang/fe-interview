# 如何在 Webpack 中保证多个 Loader 按照顺序执行

在 **Webpack** 中，多个 Loader 的执行顺序是固定的，按照**从右到左**或**从下到上**的顺序执行。这意味着你可以通过 `use` 数组的配置来确保 Loaders 以你期望的顺序执行。

## 1. Loader 执行顺序

Webpack 中的 Loader 执行顺序遵循以下规则：
- **从右到左**：当使用数组配置 Loaders 时，数组中最后一个 Loader 先执行。
- **从下到上**：当你以链式的方式指定多个 Loader 时，Webpack 会从最底层的 Loader 开始执行。

### 示例 1：数组配置多个 Loader

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',    // 先执行 babel-loader
          'eslint-loader',   // 后执行 eslint-loader
        ],
      },
    ],
  },
};
```
在这个示例中，eslint-loader 会 先执行，而 babel-loader 会 后执行。因此，文件会先经过 ESLint 代码检查，然后再由 Babel 编译。
### 示例 2：使用对象的方式配置 Loader
你可以通过对象的方式为 Loader 提供选项，同时仍然确保执行顺序。
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',  // 先执行 babel-loader
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'eslint-loader',  // 后执行 eslint-loader
            options: {
              // eslint 配置选项
            },
          },
        ],
      },
    ],
  },
};

```
在这个配置中，尽管 Loader 有多个选项，但执行顺序依然遵循 从右到左 或 从下到上 的规则。

## 1. 常见的 Loader 执行顺序示例
### 解析 CSS 文件的顺序
处理 CSS 文件时，通常使用多个 Loader，比如 style-loader、css-loader 和 sass-loader，其执行顺序应该是：

- sass-loader 或 less-loader：将 SASS/SCSS 或 LESS 编译为普通 CSS。
- css-loader：处理 @import 和 url() 等语法，解析 CSS 文件。
- style-loader：将解析后的 CSS 注入到页面的 <style> 标签中。
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',    // 最后执行，将 CSS 注入到页面
          'css-loader',      // 解析 CSS 文件
          'sass-loader',     // 首先将 SCSS 编译成 CSS
        ],
      },
    ],
  },
};

```
在这个示例中，sass-loader 会 先执行，将 SCSS 编译为 CSS，然后 css-loader 解析 CSS 文件，最后 style-loader 将样式注入到页面中。
## 总结
- 在 Webpack 中，多个 Loader 的执行顺序为 从右到左 或 从下到上。
- 使用 use 数组可以明确定义 Loaders 的顺序。
- 当需要配置 Loader 选项时，可以使用对象形式，但执行顺序依然遵循从右到左的规则。


