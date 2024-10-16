# CSS 模块化方案

CSS 模块化是为了提高 CSS 的可维护性、可复用性和可读性，减少样式冲突和全局命名污染。以下是一些常见的 CSS 模块化方案：

## 1. CSS Modules

### 介绍

- CSS Modules 是一种将 CSS 文件视为模块的方案。每个 CSS 类都是局部的，防止命名冲突。

### 特点

- 默认局部作用域：每个类名会被自动转化为唯一的标识符。
- 通过导入 CSS 文件来使用样式。

### 使用示例

```css
/* styles.module.css */
.button {
  background-color: blue;
}
```

```js
import styles from './styles.module.css';

function Button() {
  return <button className={styles.button}>Click Me</button>;
}
```

## 2. Styled Components

### 介绍

- Styled Components 是一个基于 CSS-in-JS 的库，通过 JavaScript 来定义样式，并将其应用于组件。

### 特点

- 使用 ES6 和标签模板字面量编写 CSS。
- 支持动态样式和主题。

```js
import styled from 'styled-components';

const Button = styled.button`
  background-color: blue;
`;

function App() {
  return <Button>Click Me</Button>;
}
```
