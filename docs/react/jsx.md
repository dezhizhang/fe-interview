# 如果不使用 JSX,react 可以正常工作吗

- 是的，React 可以在不使用 JSX 的情况下正常工作。JSX 只是 React 的一种语法糖，用于更简洁地描述 UI 结构。实际上，React 在底层使用普通的 JavaScript 函数来构建和渲染组件，所以不使用 JSX 时，你仍然可以通过直接调用 React.createElement 来创建 React 组件和元素。

### 使用 JSX

```js
const element = <h1>Hello, world!</h1>;
```

### 不使用 JSX 的等效代码

```js
const element = React.createElement('h1', null, 'Hello, world!');
```

- React.createElement 是 React 内部用来创建虚拟 DOM 元素的函数。它的第一个参数是元素类型（例如 'h1'），第二个参数是属性对象（这里为 null，表示没有属性），第三个参数是子元素内容（这里是 'Hello, world!'）。

- 尽管不使用 JSX 仍然可以让 React 正常工作，但 JSX 提供了更加简洁、直观的语法，尤其是在定义复杂 UI 结构时，代码会更加清晰。因此，虽然不是必需的，但大多数开发者选择使用 JSX 来提高代码的可读性和开发效率。
