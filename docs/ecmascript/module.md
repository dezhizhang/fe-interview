# ES6 的 module 体系

- ES6(ESCAScript2015)引入了官方的模块系统，称为 ES6 Modules,它是 javascript 中原生模块的解决方案，相比于之前的模块化规范（CommonJS 和 AMD），ES6 的模块系统具有更强的静态性和灵活性。

### ES6 模块的核心特性

1. ##### 静态加载

- ES6 模块是静态加载，这意味着模块依赖关系在编译阶段就确定了，与 CommonJS 动态加载不同，ES6 模块在编译时就知道模块依赖关系，能够进行更好的优化（如 tree-shaking）。
- Tree-shaking：ES6 模块的静态特性使得编译器可以分析哪些模块被使用，未使用的部分将被“摇”掉，从而减少代码体积。这在前端打包工具如 Webpack 中尤为重要。

2. ##### 导入和导出

- ES6 模块使用 import 和 export 关键字来管理模块的导入和导出。
- export 用于导出模块的内容，可以是函数、变量、类等。
- import 用于导入其他模块的内容。

```js
// module.js
//命名导出（Named Export）：允许从模块中导出多个值。
export const a = 10;
export function foo() {
  return 'Hello';
}

// main.js
import { a, foo } from './module.js';
console.log(a); // 10
console.log(foo()); // 'Hello'
//----------------------------------
//默认导出（Default Export）：每个模块只能有一个默认导出，导入时可以自由命名。
// module.js
export default function () {
  return 'I am default';
}

// main.js
import myFunc from './module.js';
console.log(myFunc()); // 'I am default'
```

3. ##### 模块是单例的

- 每个模块在首次加载后会被缓存，后续对该模块的引用都是相同的实例（类似于单例模式）。即：每个模块只会被执行一次，后续的 import 引用的都是已经导出的结果。

```js
// module.js
let counter = 0;
export function increment() {
  counter++;
  console.log(counter);
}

// main.js
import { increment } from './module.js';
increment(); // 1
increment(); // 2
```

- 即使多次导入相同模块，counter 依然保留了状态。

4. ##### 模块的作用域

- ES6 模块具有独立的模块作用域，模块内部的变量、函数等默认都是局部的，不会污染全局作用域。这与 script 标签加载 JavaScript 不同，后者可能污染全局变量。

```js
// module.js
const privateVar = 'I am private';
export const publicVar = 'I am public';

// main.js
import { publicVar } from './module.js';
console.log(publicVar); // 'I am public'
console.log(privateVar); // Uncaught ReferenceError: privateVar is not defined
```

### 动态导入

- ES6 的 import 语法默认是静态导入的，导入时模块立即被执行。然而，ES2020 引入了动态导入（import()），这是一种异步的模块加载方式，通常用于按需加载模块。

```js
// 动态导入
import('./module.js')
  .then((module) => {
    console.log(module.default());
  })
  .catch((err) => console.error('Failed to load module', err));
```

- 按需加载：在用户交互时（如点击按钮）才加载特定的模块。
- 分包加载：减少初始加载时间，提升页面性能。

### 与 CommonJS 的区别

- 虽然 ES6 Modules 和 CommonJS 都用于模块化，但它们有一些重要区别：

1. ##### 导入导出方式

- CommonJS：模块是动态加载的，使用 require 和 module.exports

```js
// CommonJS
const module = require('./module');
module.someFunction();
```

- ES6 Modules：模块是静态加载的，使用 import 和 export

```js
import { someFunction } from './module.js';
someFunction();
```

2. ##### 执行时机

- CommonJS：模块的依赖关系和执行顺序在运行时确定，因此是动态的。
- ES6 Modules：依赖关系在编译时就确定，因此是静态的，编译器可以提前优化。

3. ##### 单个导出对象 vs. 多个导出成员

- CommonJS 导出的是单个对象，所有导出都通过 module.exports 对象。

```js
// module.js (CommonJS)
module.exports = {
  a: 10,
  foo: function () {
    return 'Hello';
  },
};
```

- ES6 Modules 可以导出多个值（命名导出或默认导出）。

```js
// module.js (ES6)
export const a = 10;
export function foo() {
  return 'Hello';
}
```

4. ##### 导入方式的差异

- CommonJS：支持在运行时动态导入模块。
- ES6 Modules：导入是静态的（但通过 import() 可以实现动态导入）。

### 兼容性问题与解决方案

- 由于 ES6 模块在浏览器中的支持较晚，许多老旧的浏览器不支持直接通过 script 加载 ES6 模块。为此，打包工具（如 Webpack、Rollup）可以将 ES6 模块转换为兼容的格式。
- Babel：通过 Babel 转译 ES6 模块语法为 CommonJS，支持在旧浏览器中运行。
- Webpack：通过代码分割（Code Splitting）和 import() 实现按需加载。

### 模块的默认严格模式

- ES6 模块默认在严格模式（strict mode）下运行。即使不显式声明 "use strict";，模块内部也会自动启用严格模式。
- 禁用一些不安全的功能（如全局变量的隐式创建）。
- 防止 this 指向 undefined。

### 使用场景与优势

- 前端模块化：在大型前端项目中，模块化开发可以让代码更清晰、易于维护，ES6 Modules 提供了原生的模块化支持，取代了之前的 UMD、CommonJS 等模块化标准。
- Tree-shaking 和性能优化：由于 ES6 模块是静态结构，编译工具可以进行树摇（Tree-shaking）优化，只打包实际使用到的代码，提升性能。
- 代码复用：通过模块导入导出，可以轻松复用功能模块。

### 总结

- ES6 模块体系是 JavaScript 语言中重要的模块化机制，它带来了静态加载、Tree-shaking、模块作用域等特性，极大地提升了 JavaScript 代码的可维护性和性能。在现代 JavaScript 开发中，ES6 Modules 已成为模块化开发的标准。
