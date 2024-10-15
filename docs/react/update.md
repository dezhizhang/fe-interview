# componentWillUpdate 是否可以直接修改 state

## 1. componentWillUpdate 的作用

- componentWillUpdate 是 React 16 之前的一个生命周期方法，在组件接收到新的 `props` 或 `state` 之前被调用。它用于在组件更新前执行一些准备工作，比如读取现有的 DOM 状态，但 **不允许** 在这个阶段进行状态更新。

**注意**：从 React 16.3 开始，componentWillUpdate 已被废弃，建议使用 `getSnapshotBeforeUpdate` 或 `componentDidUpdate` 替代。

## 2. 为什么不能在 `componentWillUpdate` 中修改 `state`？

**不能直接修改 `state`**。原因如下：

- **无限循环风险**：在 `componentWillUpdate` 中调用 `setState()` 会触发组件的重新渲染，而重新渲染会再次进入 `componentWillUpdate`，这会导致无限循环，进而影响性能甚至导致浏览器崩溃。

- **生命周期设计原则**：`componentWillUpdate` 的设计是为了做**只读操作**，比如访问 DOM 状态或在更新前做一些数据准备。它不适合用于改变组件的状态。

## 3. 修改 `state` 的正确时机

- **在 `componentDidUpdate` 中修改**：状态更新应该放在组件已经更新完毕后进行，比如在 `componentDidUpdate` 中。
- **基于 `props` 更新 `state`**：如果需要基于 `props` 的变化修改 `state`，可以使用 `getDerivedStateFromProps` 静态方法，或在 `componentDidUpdate` 中处理。

## 4. 示例

### 错误用法：在 `componentWillUpdate` 中调用 `setState`

```javascript
componentWillUpdate(nextProps, nextState) {
  // 错误：不应该在这里调用 setState
  if (nextProps.someValue !== this.props.someValue) {
    this.setState({ someState: nextProps.someValue });
  }
}

```

### 正确用法：在 componentDidUpdate 中修改 state

```js
componentDidUpdate(prevProps, prevState) {
  // 正确：在组件更新后进行状态更新
  if (prevProps.someValue !== this.props.someValue) {
    this.setState({ someState: this.props.someValue });
  }
}

```

## 5. 小结

- 在 componentWillUpdate 中 不能 直接修改 state，因为这样会导致无限循环，违反 React 的生命周期设计原则。推荐使用 componentDidUpdate 或其他生命周期方法来进行状态更新。
