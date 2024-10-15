# React 中 `props` 和 `state` 的区别

在 React 中，`props` 和 `state` 是两个用于管理组件数据的重要概念。虽然它们都用于控制组件的渲染和行为，但它们在使用方式和目的上有显著的区别。

## 1. 定义

### `props`

- **全称**: properties（属性）。
- **定义**: `props` 是组件的输入，是从父组件传递给子组件的数据。子组件只能通过 `props` 访问这些数据，不能直接修改。

### `state`

- **定义**: `state` 是组件内部的状态，是组件自己的数据。组件可以通过 `setState` 方法来更新自己的状态，从而触发重新渲染。

## 2. 可变性

### `props`

- **只读**: `props` 是只读的，子组件不能修改它们。父组件可以更新 `props`，从而影响子组件的行为。

### `state`

- **可变**: `state` 是可变的，组件可以通过 `setState` 方法来更新自己的状态。这种状态变化会导致组件重新渲染。

## 3. 数据流

### `props`

- **单向数据流**: `props` 通过单向数据流传递，数据从父组件流向子组件。子组件无法直接修改父组件的数据。

### `state`

- **内部管理**: `state` 是组件内部管理的数据，组件可以根据自己的逻辑自由修改状态。状态的变化通常与用户交互相关。

## 4. 用途

### `props`

- **传递数据**: 用于从父组件向子组件传递数据或回调函数。
- **配置组件**: 可以通过 `props` 传递参数来配置组件的行为。

### `state`

- **管理状态**: 用于管理组件内部的状态，比如用户输入、表单数据、加载状态等。
- **动态更新**: 可以根据用户交互或其他事件动态更新状态，以影响组件的渲染。

## 5. 示例

### 使用 `props`

```javascript
const ChildComponent = (props) => {
  return <div>{props.message}</div>;
};

const ParentComponent = () => {
  return <ChildComponent message="Hello, World!" />;
};
```

### 使用 `state`

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

## 总结

- props 是从父组件传递给子组件的数据，是只读的；而 state 是组件自身管理的可变数据。理解这两者之间的区别，有助于更好地设计和管理 React 组件。
