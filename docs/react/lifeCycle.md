# React 组件生命周期概述

React 组件生命周期指的是组件在其存在期间经历的不同阶段。组件生命周期可以分为三个主要阶段：**挂载（Mounting）**、**更新（Updating）**和**卸载（Unmounting）**。在这些阶段中，React 提供了一系列生命周期方法，使开发者可以在特定时机执行特定操作。

## 1. 挂载阶段（Mounting）

挂载阶段是指组件被创建并插入到 DOM 中的过程。这个阶段的主要生命周期方法包括：

- **constructor(props)**:

  - 初始化组件状态和绑定方法。

- **static getDerivedStateFromProps(props, state)**:

  - 在组件接收到新的 props 时调用，返回更新的状态或 `null`。

- **render()**:

  - 返回要渲染的 JSX，必须实现。

- **componentDidMount()**:
  - 组件挂载后调用，适合进行网络请求和 DOM 操作。

### 示例

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('Component did mount');
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}
```

## 2. 更新阶段（Mounting）

更新阶段发生在组件的状态或 props 改变时。这个阶段的主要生命周期方法包括：

- **static getDerivedStateFromProps**:

  - 在更新时也会调用

- **shouldComponentUpdate(nextProps, nextState)**:

  - 控制组件是否重新渲染，返回 true 或 false。

- **render()**:

  - 重新渲染组件。

- **getSnapshotBeforeUpdate(prevProps, prevState)**:

  - 在 DOM 更新之前调用，返回的值作为参数传递给 componentDidUpdate()。

- **componentDidUpdate(prevProps, prevState, snapshot)**:
  - 组件更新后调用，适合进行后续操作

```js
class MyComponent extends React.Component {
  state = { count: 0 };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.count !== this.state.count; // 控制更新
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

## 3. 卸载阶段（Unmounting）

卸载阶段是指组件从 DOM 中移除的过程。这个阶段的主要生命周期方法包括：

- **componentWillUnmount()**:
  - 组件卸载前调用，适合进行清理操作，如取消订阅或清理定时器。

```js
class MyComponent extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      console.log('Running...');
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval); // 清理定时器
  }

  render() {
    return <div>My Component</div>;
  }
}
```

## 3. 错误处理（Error Handling）

React 还提供了用于处理组件错误的生命周期方法：

- **static getDerivedStateFromError(error)**:
  - 当组件抛出错误时调用，更新状态以呈现备用 UI。
- **componentDidCatch(error, info)**:
  - 捕获错误后调用，用于记录错误信息。

```js
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true }; // 更新状态以呈现备用 UI
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## 小结

- React 组件的生命周期提供了一系列方法，允许开发者在组件的不同阶段执行特定的操作。了解这些生命周期方法有助于更好地管理组件的状态和副作用，提高应用的可维护性和性能。随着 React 16.3 版本后引入的 Hooks，开发者也可以使用函数组件的方式进行状态管理和副作用处理，提供了更多的灵活性和简洁性。
