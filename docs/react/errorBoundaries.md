# React 中的 Error Boundaries

Error Boundaries 是 React 16 引入的一种机制，用于捕获组件树中发生的 JavaScript 错误，防止整个应用崩溃，并提供更优雅的错误处理方式。

## 1. 什么是 Error Boundaries

Error Boundaries 是一种 React 组件，它能捕获其子组件树中发生的错误，并渲染出备选的 UI。它们只捕获生命周期方法、构造函数和渲染过程中的错误，而不捕获异步代码、事件处理函数和服务器端渲染中的错误。

## 2. 使用 Error Boundaries

要创建一个 Error Boundary 组件，需要实现 `componentDidCatch` 和 `getDerivedStateFromError` 这两个生命周期方法：

- **`getDerivedStateFromError`**:
  这个静态方法在子组件抛出错误时调用。它可以根据错误更新状态。

- **`componentDidCatch`**:
  这个方法在捕获错误后调用，可以用于记录错误信息或进行其他错误处理。

### 示例

```js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新状态以渲染备用 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你可以将错误日志上报给服务器
    console.error('Error logged:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 备用 UI
      return <h1>出错了!</h1>;
    }

    return this.props.children;
  }
}

// 使用 Error Boundary
const App = () => (
  <ErrorBoundary>
    <MyComponent />
  </ErrorBoundary>
);
```

## 3. Error Boundaries 的限制

##### 1. 不能捕获:

- 事件处理函数中的错误
- 异步代码中的错误（如 setTimeout、Promise 等）
- 服务器端渲染中的错误
- Error Boundaries 本身的错误

##### 2. 只能包裹子组件:

- Error Boundaries 只能捕获它们子组件树中发生的错误，不能捕获自己内部的错误。

## 4. 总结

- Error Boundaries 提供了一种优雅的方式来处理组件中的错误，确保应用的健壮性和用户体验。通过使用 Error Boundaries，开发者可以更好地控制错误处理逻辑，并为用户提供清晰的反馈信息。
