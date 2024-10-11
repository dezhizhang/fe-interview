# 说说你对 TypeScript 的了解，它和 JS 有什么关系？

### typescript 的核心特点

- 类型系统；TypeScript 提供静态类型系统，帮助开发者编写代码时检测类型错误，这使得代码更状态且便用调试。
- 编译到 javascript：TypeScript 代码在运行前会编译为标准的 javaScript,意味着它可以在所有支持 javascript 的环境中运行，包括浏览器、Nodejs 等。
- ECMAScript 规范的超级：TypeScript 完全兼容所有 javscript 代码，因为它是 javascript 的一个超集，可以在 TypeScript 文件中写普通的 javascript，并逐步引入类型系统。
- 现代语法：TypeScript 支持 ECMAScript 的最新特性（如 async/await、装饰器、模块等），即使目标运行环境不支持这些特性，TypeScipt 也可以将其编译为兼容的 javascript。

### 超级关系

- TypeScript 和 JavaScript 的超集，这意味着所有合法的 JavaScript 代码都是合法的 TypeScript 代码，可以把现有的 JavaScript 项目直接转换为 TypeScript 项目，只需将文件后缀改为 `.ts`然后逐步添加类型。

### 静态类型检查

- JavaScript 是一种动态类型语言，意味着变量的类型在运行时才确定，而 TypeScript 提供了静态类型检查，使得变量的类型可以在编译时检查，从而提前发现潜在的错误。

```js
let name = 'tom';
name = 123; // 不会抛出错误，但可能会导致 bug

let name: string = 'tom';
// name = 123; // 报错：不能将 number 赋值给 string 类型
```

### 编译过程

- JavaScript 是一种解析性语言，直接在运行时执行，而 Typescript 需要经过一个编译过程（通过 TypeScrit 编译器 tsc） 将 .ts 直接编译为 JavaScript。

### 类型推断

- 即使你不显示地声明类型，TypeScript 也能通过类型推断自动为变量、函数等推断出合理的类型。

```js
let age = 25;
```

### 类型系统和静态检查

- TypeScript 的类型系统可以帮助开发者在编译时发现潜在的错误，比如类型不匹配、函数调用错误、对像属性缺失等，而不是等到运行时才暴露这些问题，对于大型项目尤为重要。

```ts
interface User {
  id: number;
  name: string;
}

function greet(user: User) {
  console.log(`Hello, ${user.name}`);
}
greet({ id: 1, name: 'Alice' }); // 正确
// greet({ id: 1 });  // 错误：缺少 name 属性
```
