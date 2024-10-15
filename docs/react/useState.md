# React 中的 `useState`

`useState` 是 React 中用于在函数组件中添加状态的 Hook。它使函数组件能够拥有状态管理的能力，允许组件在状态变化时重新渲染。

## 语法

```javascript
const [state, setState] = useState(initialState);
```

- initialState: 状态的初始值，可以是任何类型，例如对象、数组、字符串、数字等。
- state: 当前的状态值。
- setState: 用于更新状态的函数。

## 特性

- 支持多个状态: 可以在一个组件中多次调用 useState 来管理多个状态：

```js
const [name, setName] = useState('Alice');
const [age, setAge] = useState(25);
```

- 惰性初始化: 如果初始状态的计算比较复杂，可以使用函数形式的 initialState

```js
const [state, setState] = useState(() => {
  // 复杂的计算
  return initialValue;
});
```

- 状态合并: 与类组件不同，useState 不会自动合并状态。如果状态是对象，更新时需要手动合并

```js
const [user, setUser] = useState({ name: 'Alice', age: 25 });

const updateName = (newName) => {
  setUser((prevUser) => ({ ...prevUser, name: newName }));
};
```

### 小结

- useState 是 React 中用于管理状态的基本 Hook，使得函数组件能够拥有和管理状态。通过 useState，开发者可以轻松处理状态变化，提高组件的交互性和动态性。
