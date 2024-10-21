# Webpack 中的文件监听原理

## 1. 基础原理：文件系统的轮询（Polling）

Webpack 使用 Node.js 的 `fs.watch` 和 `fs.watchFile` 来监听文件的变化。两者的区别是：

- **`fs.watch`**：通过事件驱动的方式监听文件或目录的变化。一旦文件发生变化，会触发相应的事件。性能较好，因为它是事件驱动的。
- **`fs.watchFile`**：通过轮询定期检查文件状态（如修改时间、大小等）。如果不支持事件驱动，Webpack 会使用轮询来监听文件变化。

## 2. 轮询机制

Webpack 默认使用一种 **轮询机制** 来检查文件的变化：

- 每隔一段时间（`aggregateTimeout`，默认为 200ms），Webpack 会检查一次文件的最后修改时间。
- 如果文件的修改时间发生变化，Webpack 就会重新打包构建。

**轮询机制的关键点**：

- 可以通过 `watchOptions.poll` 设置轮询间隔时间。
- 轮询机制适用于不支持事件驱动的文件系统。

## 3. 监听机制中的优化

Webpack 在文件监听时进行了一些性能优化，以减少不必要的文件检查和打包开销：

- **Debouncing**：当文件发生多次变化时，Webpack 会等待一段时间（`aggregateTimeout`），确保文件稳定后再触发重新构建。
- **文件系统缓存**：Webpack 缓存文件的状态（如时间戳），减少不必要的磁盘 I/O 操作。
- **依赖树监听**：Webpack 只监听与当前打包过程相关的文件（入口文件及其依赖的模块），不会监听整个项目中的所有文件。

## 4. 监视的配置

在 Webpack 的配置文件中，可以自定义监听行为：

```javascript
module.exports = {
  watch: true, // 启用文件监听
  watchOptions: {
    aggregateTimeout: 300, // 文件变化后延迟300ms再重新打包
    poll: 1000, // 每秒轮询一次文件变化（以毫秒为单位）
    ignored: /node_modules/, // 忽略 node_modules 目录中的文件
  },
};
```

## 5. 使用场景

文件监听功能广泛用于开发模式（mode: 'development'）中，配合 webpack-dev-server 或 webpack-hot-middleware 实现实时更新（如热模块替换 HMR），让开发者不需要手动刷新页面或重新启动服务器。
