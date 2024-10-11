# compiler 和 compilation 的作用是什么

- 在 Webpack 的构建过程中，compiler 和 compilation 是两个核心概念，它们分别承担着不同的职责，贯穿整个打包和编译流程。

### Compiler（编译器）

- compiler 代表整个 Webpack 的打包构建过程，包含了所有的配置和构建环境的相关信息。它是 Webpack 工作的核心引擎，管理着整个构建生命周期的执行。
- 职责：

1. 处理 Webpack 配置（如 entry、output、module 等）。
2. 监听文件系统的变化（尤其是在 watch 模式下）。
3. 启动和控制整个构建流程，包括从文件的解析到最终生成输出文件。
4. 触发所有的 Webpack 钩子（hooks），并协调多个插件的执行。

- 触发时机：compiler 实例的生命周期从启动构建（例如运行 webpack 命令）到整个构建结束（所有输出文件生成完毕）为止。
- 常见 Hooks：

1. beforeRun：在构建开始前触发。
2. run：在 Webpack 开始构建时触发。
3. emit：输出文件即将写入磁盘时触发。
4. done：构建过程完成时触发

```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('MyPlugin', (compiler) => {
      console.log('Webpack build started!');
    });
  }
}

module.exports = MyPlugin;
```

### Compilation（编译对象）

- compilation 代表一次具体的打包过程。每当 Webpack 进行一次打包操作时，都会生成一个 compilation 对象，保存与该次打包相关的详细信息。
- 职责：

1. 负责实际的模块构建，包括从入口文件开始递归解析依赖、加载模块、解析代码。
2. 生成模块间的依赖关系图，并最终生成输出的文件（如 JavaScript、CSS 等）。
3. 为每个模块应用相应的 loader 和插件，进行代码转换和优化。
4. 处理代码的优化（如 Tree Shaking、代码压缩）以及生成资源（Assets）供输出。

- 触发时机：每次 Webpack 开始一个新的构建流程时都会创建一个新的 compilation 实例。例如，在开发环境下，当文件变化时，Webpack 会重新创建 compilation 进行增量更新。
- 常见 Hooks：

1. buildModule：开始构建模块时触发。
2. seal：当 Webpack 确定所有模块都被构建后触发。
3. optimizeAssets：在所有资源生成完毕后，开始优化资源时触发。

```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
      compilation.hooks.buildModule.tap('MyPlugin', (module) => {
        console.log(`Building module: ${module.resource}`);
      });
    });
  }
}

module.exports = MyPlugin;
```

### Compiler 与 Compilation 的关系

- ompiler 是 Webpack 的总控，它掌管着整个构建流程的执行，是所有构建过程的入口。
- compilation 是 compiler 在每次构建过程中创建的对象，负责处理当前次构建中的所有模块、文件和依赖。
- 每当文件发生变化时，compiler 会触发新的 compilation，重新构建受影响的模块并生成新的输出。

### 总结

- compiler：代表 Webpack 的整个打包器，它负责处理全局的配置和控制整个打包流程。
- compilation：代表具体的一次构建过程，它负责解析模块、编译代码、生成资源文件等操作。
