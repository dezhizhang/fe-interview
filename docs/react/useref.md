# 什么是 useRef

- useRef 是 React 提供的一个 Hook，用于创建一个可变的引用对象，并且在组件的整个生命周期内保持不变。与 useState 不同，useRef 的值的更新不会引发组件的重新渲染。

### 语法

```js
const refContainer = useRef(initialValue);
```

- initialValue：useRef 的初始值，可以是任何类型（null、数字、对像、Dom 元素等）。
- 返回值是一个带有 current 属性的对像：{current:initialValue}。

### 主要作用

- 访问 DOM 元素,可以将 ref 附加到 jsx 中的 DOM 元素上，用来直接访问该元素。
- 存储可变值，可以用于存储一个跨渲染周期保持不变的值，而不触发组件重新渲染。

```js
// 访问 DOM 元素
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null); // 创建一个ref

  const handleFocus = () => {
    inputRef.current.focus(); // 通过ref访问input元素并聚焦
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus the input</button>
    </div>
  );
}

export default TextInputWithFocusButton;
```

```js
// 存储可变值
import React, { useRef, useState } from 'react';

function Counter() {
  const countRef = useRef(0); // 使用useRef创建一个可变的countRef
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    countRef.current += 1; // 仅更新ref，不会触发重渲染
    setCount(count + 1); // 更新状态，触发重渲染
    console.log('CountRef:', countRef.current); // 打印最新的countRef值
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default Counter;
```

### 使用场景

- 访问 DOM 元素，通过 useRef 获取 DOM 元素的引用，进行操作（如聚集，滚动，测量尺寸等）。
- 存储跨渲染周期的值，useRef 可以存储一些不需要引起重新渲染的值（如计时器 id）,避免不必要的性能损耗
- 保存组件的某些状态，使用 useRef 可以保存某些组件生命周期中持续存在但不会影响渲染的值，比如缓存某个计算结果，访问上一轮渲染的值等。

### useRef vs useState

- useRef：更新 ref.current 不会触发组件重新渲染，它适合存储不影响 UI 的可变数据。
- useState：更新状态时会触发组件重新渲染，适合存储影响组件 UI 的数据。

### 总结

- useRef 是一个非常有用的 Hook,主要用于访问 DOM 元素或在不引发重新渲染的情况下存储可变数据。
- 它非常轻量，适合那些需要保持在渲染之间不变，但不想引起重新渲染的场景。
