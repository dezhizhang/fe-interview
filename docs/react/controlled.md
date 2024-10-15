# React 中受控组件和非受控组件的区别

## 1. 受控组件（Controlled Components）

### 定义

受控组件是指其表单元素的值由 React 组件的状态（`state`）控制的组件。在受控组件中，表单数据的状态由组件内部管理，用户输入会更新组件的状态，从而影响组件的渲染。

### 特点

- **单向数据流**：用户输入的数据通过事件处理函数更新组件的状态，确保数据流动的可控性。
- **状态同步**：表单元素的值与组件的状态保持同步，方便进行验证、条件渲染和其他逻辑处理。
- **使用`value`和`onChange`属性**：

```js
import React, { useState } from 'react';

function ControlledComponent() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={value} // 受控属性
      onChange={handleChange} // 事件处理
    />
  );
}
```

## 2. 非受控组件（Uncontrolled Components）

### 定义

非受控组件是指其表单元素的值不由 React 组件的状态控制，而是直接由 DOM 元素本身维护。在非受控组件中，用户输入的数据通过 ref 获取，而不是通过 React 的状态管理。

### 特点

- **直接访问 DOM**：使用 ref 来访问表单元素的值，减少了 React 状态的管理，适合简单的表单场景。
- **更少的状态管理 DOM**：不需要将输入值保存在组件的状态中，从而简化了组件的逻辑
- **使用 ref 属性**：

```js
import React, { useRef } from 'react';

function UncontrolledComponent() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('输入的值: ' + inputRef.current.value); // 直接访问 DOM
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} /> {/* 非受控属性 */}
      <button type="submit">提交</button>
    </form>
  );
}
```

## 3. 主要区别

| 特性     |                 受控组件 |     非受控组件     |
| :------- | -----------------------: | :----------------: |
| 数据管理 |       通过组件的状态管理 | 直接访问 DOM 元素  |
| 数据同步 |         表单值与状态同步 | 状态与表单值不同步 |
| 事件处理 |   使用 onChange 更新状态 |  使用 ref 获取值   |
| 适用场景 | 复杂表单和需要验证的场景 | 简单表单或临时输入 |

## 4. 小结

- 受控组件 提供了更好的状态管理和数据流控制，适用于复杂的表单和需要实时反馈的场景。
- 非受控组件 则更简单、灵活，适合处理临时输入或不需要频繁状态更新的场合。根据具体的应用场景选择合适的组件类型，可以提高代码的可读性和维护性。
