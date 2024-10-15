# Redux 的三个原则

Redux 是一个用于管理应用状态的库，它遵循以下三个核心原则，这些原则帮助确保应用的状态管理是可预测和一致的。

## 1. **单一数据源（Single Source of Truth）**

- **描述**：整个应用的状态被存储在一个对象树中，保存在单一的 Redux Store 中。所有的组件都可以从这个 Store 中获取所需的状态。
- **优势**：
  - 使得状态管理变得简单，便于调试和测试。
  - 可以在整个应用中轻松地共享状态。

### 示例

```javascript
import { createStore } from 'redux';

// 一个简单的 reducer
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
};

// 创建 Redux Store
const store = createStore(reducer);
```

## 2. **状态是只读的（State is Read-Only）**

- **描述**：唯一改变应用状态的方法是触发一个 action。这个 action 是一个描述发生了什么的普通对象。通过这种方式，应用的状态管理变得更可预测和可追踪。
- **优势**：
  - 强制遵循这种规则可以避免直接修改状态，确保所有状态更改都是可追溯的。
  - 更容易调试和维护应用程序。

```js
// 定义一个 action
const addTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: todo,
});

// 触发 action
store.dispatch(addTodo('Learn Redux'));
```

## 3. **使用纯函数来描述状态变化（Changes are Made with Pure Functions）**

- **描述**：为了描述状态的变化，Redux 使用纯函数（reducer）。这些函数接收先前的状态和 action，并返回新的状态。纯函数的特点是相同的输入总是返回相同的输出，不会产生副作用。
- **优势**：
  - 使得状态变化的逻辑可预测，并可以很容易地进行测试。
  - 可以利用时间旅行（time travel）等功能，便于开发和调试。

```js
// 纯函数示例
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload]; // 返回新的状态
    default:
      return state; // 返回原始状态
  }
};
```

### 小结

- 这三个原则是 Redux 的核心理念，通过遵循这些原则，可以实现更加可维护、可预测和可调试的状态管理。Redux 在大型应用中尤其有用，帮助开发者管理复杂的状态流。
