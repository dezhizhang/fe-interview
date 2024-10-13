# Tree Shaking

Tree Shaking 是 JavaScript 应用程序中的一种**死代码消除**技术，主要用于删除那些**未被实际使用的代码**，从而减小最终生成的打包文件体积。这个术语来源于树的摇动过程，就像通过摇动树来掉落无用的叶子一样，Tree Shaking 通过分析代码依赖性来移除无用的部分。

## Tree Shaking 的工作原理

Tree Shaking 的核心是**静态分析**。它分析 JavaScript 中的模块依赖关系，发现和移除那些**未被使用（未引用）**的代码。

### 基本要求：

1. **ES6 模块（ESM）**：Tree Shaking 依赖于 ES6 模块语法 (`import` 和 `export`)，因为 ES6 模块是静态的，可以在编译时确定依赖关系。相比之下，CommonJS（如 `require` 和 `module.exports`）的动态特性使得 Tree Shaking 难以实现。

   - 通过 `export` 导出的内容如果没有被任何地方 `import`，就会被标记为未使用代码。

2. **静态分析**：编译器会在编译过程中分析模块间的依赖关系，而不是在运行时执行代码。这使得编译器能够确定哪些代码实际上从未被调用或引用。

### Tree Shaking 的工作流程：

1. **代码分割**：工具如 Webpack 或 Rollup 在打包代码时，会首先通过 `import` 和 `export` 语句将整个应用的模块结构进行分解。
2. **依赖分析**：编译器会分析每个模块的导出内容，检测导出的代码是否被其他模块引用。
3. **移除未使用代码**：根据依赖分析，未被引用的导出代码将被移除，不会包含在最终的打包文件中。

## Tree Shaking 的局限性

1. **动态特性限制**：Tree Shaking 只能应用于静态分析的场景，不能有效地处理**动态导入**或**动态赋值**的代码。例如，使用 `eval()` 或 `require()` 动态导入的模块不能被完全摇掉。

2. **副作用（Side Effects）**：如果模块或文件中存在副作用（例如全局变量的修改、日志记录等），Tree Shaking 可能不会移除这些代码。为了更好地处理副作用，可以在 `package.json` 中通过 `sideEffects` 字段告知打包工具哪些模块是无副作用的。

```js
   {
     "name": "my-library",
     "version": "1.0.0",
     "sideEffects": false
   }
```

2. **CommonJS 不支持**：CommonJS 模块（require 和 module.exports）由于其动态特性，通常不能很好地支持 Tree Shaking。

## 使用 Tree Shaking 的工具

### 1 Webpack

Webpack 是一个常用的 JavaScript 模块打包工具，支持 Tree Shaking。它通过 mode: 'production' 启用 Tree Shaking，并结合 Terser 等压缩工具进一步优化代码。

```js
// webpack.config.js
module.exports = {
  mode: 'production', // 启用 tree-shaking
  // 其他配置
};
```

### 1 Rollup

- Rollup 是另一个支持 Tree Shaking 的打包工具，通常在构建 JavaScript 库时使用。它天然支持 ES6 模块，并且在打包时能有效地进行 Tree Shaking。

```js
// rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  treeshake: true,
};
```

## Tree Shaking 的优点

- 减小打包体积：通过删除未使用的代码，显著减小最终打包文件的大小，加快加载速度和提升性能。
- 提升性能：减少不必要的代码可以减少浏览器的解析和执行时间，提升应用的响应速度。

## 小结

- Tree Shaking 是现代前端打包工具中不可或缺的技术，能够通过静态分析和移除未使用的代码来优化最终的打包体积。它依赖于 ES6 模块语法和静态分析，因此要充分利用 Tree Shaking 的优势，需要确保代码库是模块化且无副作用的。
