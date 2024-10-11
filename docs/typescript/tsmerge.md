# 如何将多个 ts 文件合并为一个 js 文件？

- 要将多个 TypeScript 文件（.ts 文件）合并成一个 JavaScript 文件（.js 文件），可以通过 TypeScript 编译器 tsc 来实现，结合 tsconfig.json 配置文件，或者直接使用模块打包工具（如 Webpack 或 Rollup）来处理。下面是几种常见的实现方式：

### 使用 TypeScript 编译器（tsc）和 tsconfig.json

- 在项目根目录创建 tsconfig.json 文件，并设置 outFile 选项来指定输出的合并文件名

```json
{
  "compilerOptions": {
    "module": "system", // 必须使用 System 或 AMD 模块
    "outFile": "./dist/output.js", // 指定合并后的输出文件路径
    "target": "es5", // 可根据需要指定目标 ECMAScript 版本
    "strict": true // 启用严格模式
  },
  "include": [
    "./src/**/*.ts" // 指定要编译的 TypeScript 文件
  ]
}
```

- 注意：为了使 outFile 生效，module 选项必须设置为 system 或 amd，而不是 commonjs 或 esnext，因为 outFile 仅在 System 和 AMD 模块系统中支持合并。

### 使用 Webpack 打包工具

- 如果你的项目比较复杂，或者需要处理依赖、模块、代码压缩等功能，建议使用 Webpack 这样的打包工具。Webpack 能将多个 .ts 文件打包为一个 .js 文件，并且能够处理现代模块系统（如 commonjs、es6 模块等）。

1. ##### 安装 Webpack 和相关依赖

```bash
npm install --save-dev webpack webpack-cli typescript ts-loader
```

2. ##### 创建 Webpack 配置文件

- 在项目根目录下创建 webpack.config.js 文件

```ts
const path = require('path');

module.exports = {
  entry: './src/index.ts', // 入口文件，指定合并的起点
  output: {
    filename: 'bundle.js', // 输出的合并文件名
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'], // 可解析的文件类型
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 匹配所有 .ts 文件
        use: 'ts-loader', // 使用 ts-loader 进行编译
        exclude: /node_modules/,
      },
    ],
  },
};
```

3. ##### 创建 tsconfig.json 配置文件

- 你还需要在项目根目录下创建 tsconfig.json 文件来配置 TypeScript 编译器：

```json
{
  "compilerOptions": {
    "module": "esnext", // 使用 ES 模块
    "target": "es5", // 输出目标版本
    "strict": true
  },
  "include": [
    "./src/**/*.ts" // 指定编译的文件
  ]
}
```

4. ##### 打包项目

```bash
npx webpack --config webpack.config.js
```

### 使用 Rollup 打包工具

- Rollup 是一个专注于打包 ES6 模块的工具，它也支持将多个 .ts 文件合并为一个 .js 文件。

1. ##### 安装 Rollup 和相关依赖

```bash
npm install --save-dev rollup rollup-plugin-typescript2 typescript
```

2. ##### 创建 Rollup 配置文件

```js
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts', // 入口文件
  output: {
    file: './dist/bundle.js', // 输出的合并文件名
    format: 'cjs', // 输出为 CommonJS 模块
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }), // 使用 TypeScript 插件
  ],
};
```

3. ##### 创建 tsconfig.json

- 与前面类似，在项目根目录下创建 tsconfig.json 配置文件：

```json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es5",
    "strict": true
  },
  "include": [
    "./src/**/*.ts"
  ]
}s
```

4. ##### 打包项目

```bash
npx rollup -c
```

- 这会将所有的 .ts 文件打包为一个 bundle.js 文件，输出到 dist 目录下。

### 总结

- 如果项目较简单且使用 TypeScript 自带工具，你可以通过 tsc 和 tsconfig.json 中的 outFile 配置来合并多个 .ts 文件。
- 对于更复杂的项目，使用 Webpack 或 Rollup 这样的打包工具可以实现更强大的功能，不仅能合并 .ts 文件，还能处理依赖、优化输出文件、支持现代模块化系统等。
