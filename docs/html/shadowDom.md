# 影子 DOM (Shadow DOM)

## 1. 定义

- 影子 DOM 是 Web 组件的一部分，允许开发者创建封装的 DOM 树，与主文档 DOM 树隔离。

## 2. 特性

- **封装性**：影子 DOM 可以隐藏实现细节，只暴露所需的 API 和样式，避免与外部样式或脚本冲突。
- **样式隔离**：影子 DOM 中的样式不会影响主文档中的元素，反之亦然，使得样式管理更加清晰。

## 3. 使用场景

- **Web 组件**：构建可重用的自定义元素，保持独立性和可维护性。
- **复杂 UI 组件**：如日期选择器、模态框等，减少样式冲突和 DOM 复杂性。

## 4. 基本用法

- 使用 JavaScript 的 `attachShadow` 方法创建影子根：

```javascript
const host = document.querySelector('#host');
const shadowRoot = host.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = '<p>Hello, Shadow DOM!</p>';
```

## 5. 注意事项

- 浏览器支持：影子 DOM 在现代浏览器中支持良好，但在某些旧版本中可能不兼容。
- 性能考虑：影子 DOM 的创建和管理可能会引入一定的性能开销，尤其在大量使用时。
