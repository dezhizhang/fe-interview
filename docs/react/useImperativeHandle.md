# 什么是 useImperativeHandle

- useImperativeHandle 是 React 中的一个 Hook，允许你自定义对父组件暴露的子组件实例的引用。当父组件通过 ref 获取子组件时，通常只能访问子组件的 DOM 元素或组件实例。但是，使用 useImperativeHandle，你可以将特定的属性和方法暴露给父组件，控制父组件对子组件的交互。

```js
useImperativeHandle(ref, createHandle, [deps]);
```

- ref：由父组件传入的 ref 对象，通常使用 forwardRef 将 ref 传递给子组件。
- createHandle：一个返回自定义对象的函数，该对象包含你希望暴露给父组件的属性或方法。
- deps：依赖项数组，类似于 useEffect 的依赖数组，用于控制何时更新暴露的对象。

### 什么时候使用

- 需要向父组件暴露比默认的 DOM 操作或组件实例更多的功能。
- 父组件可能需要控制子组件的某些内部方法或状态，而不仅仅是访问 DOM 节点。

### 如何使用

```js
import React, { useImperativeHandle, useRef, forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  // 使用 useImperativeHandle 自定义暴露给父组件的行为
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus(); // 自定义 focus 方法
    },
    clear: () => {
      inputRef.current.value = ''; // 自定义 clear 方法
    },
  }));

  return <input ref={inputRef} />;
});
```

- forwardRef 必须使用：useImperativeHandle 只能与 forwardRef 一起使用，因为它依赖于子组件能够接收到父组件的 ref。
- 不常见的场景：通常我们直接操作 DOM 时并不需要 useImperativeHandle，因为 ref 本身已经提供了访问 DOM 元素的能力。这个 Hook 更适用于需要对外暴露组件内部逻辑或方法的场景。

### 工作机制

- 默认情况下，当父组件向子组件传递 ref 时，ref 将指向子组件的 DOM 元素或类组件实例。
- useImperativeHandle 允许你重写 ref 的指向对象，使得父组件可以通过 ref 访问到自定义的方法或属性，而不仅仅是 DOM 或组件实例。

### 使用场景

- 控制子组件内部逻辑：父组件需要调用子组件内部的非 DOM 方法，比如重置、启用/禁用某个功能。
- 增强封装：useImperativeHandle 可以帮助你更好地封装组件内部逻辑，并只暴露必要的功能。

### 总结

- useImperativeHandle 是一个用于自定义子组件 ref 的 Hook，主要用于父组件需要访问子组件的某些方法或属性而不仅仅是 DOM 时。它配合 forwardRef 一起使用，确保父组件能够获得你自定义的引用对象。
