# 命名空间与模块的区别？

- 在 TypeScript 中，命名空间 和 模块 都是组织代码的方式，它们帮助开发者将代码划分为不同的逻辑单元，避免命名冲突。但它们在使用方式、应用场景以及与 JavaScript 的兼容性方面有显著的区别。

### 命名空间（Namespace）

- 命名空间（以前称为内部模块）用于在 TypeScript 中将代码组织为一个逻辑分组，并且这些分组可以跨多个文件进行使用。命名空间主要用于处理全局范围内的代码划分，适合大型应用程序中组织代码的结构，但不适用于模块化加载系统。
  特点：
- 全局作用域：命名空间的成员在编译后是暴露在全局作用域中的，不会被封装。
- 内部使用：主要用于组织代码、避免命名冲突，特别是没有模块加载系统时的情况。
- 使用 namespace 关键字：通过 namespace 关键字来定义命名空间。

```ts
namespace MathOperations {
  export function add(x: number, y: number): number {
    return x + y;
  }

  export function subtract(x: number, y: number): number {
    return x - y;
  }
}

// 使用命名空间中的方法
console.log(MathOperations.add(5, 3)); // 输出: 8
console.log(MathOperations.subtract(10, 4)); // 输出: 6
```

特性和应用场景：

- 命名空间的成员：通过 export 关键字将成员（如函数、类、变量）导出，使得外部代码可以访问它们。
- 避免全局命名冲突：多个类或函数可以放在同一个命名空间下，避免了命名冲突。
- 大型应用的代码组织：命名空间常用于没有模块加载系统的项目中，以组织代码和避免全局作用域污染。
  跨文件的命名空间：
- 命名空间可以分布在多个文件中，通过 ///<reference path="..." /> 标签引入。

```ts
// math.ts
namespace MathOperations {
  export function multiply(x: number, y: number): number {
    return x * y;
  }
}
//-------------------------------------------------------
// app.ts
/// <reference path="math.ts" />
console.log(MathOperations.multiply(2, 3)); // 输出: 6
```

### 模块（Modules）

- 模块 是 TypeScript 的现代代码组织方式，支持 模块化加载，与 ES6 的模块系统兼容。模块通过文件级别的隔离和导入导出机制，使得代码可以在不同文件之间复用，并且模块的成员不会泄露到全局作用域。
  特点：
- 文件作用域：每个模块都有自己的作用域，模块中的变量、函数、类等不会泄露到全局作用域。
- 外部模块系统：模块是基于文件的代码分隔方式，模块内容通过 import 和 export 语法进行导入和导出。
- 现代模块加载系统：模块主要用于与现代模块加载系统配合（如 CommonJS、ES6 模块、AMD 等）。

```ts
//math.ts:
export function add(x: number, y: number): number {
  return x + y;
}

export function subtract(x: number, y: number): number {
  return x - y;
}
//--------------------------------------------------
//app.ts:
import { add, subtract } from './math';

console.log(add(5, 3)); // 输出: 8
console.log(subtract(10, 4)); // 输出: 6
```

特性和应用场景：

- 文件级模块作用域：每个模块都是独立的作用域，不会污染全局命名空间，减少了命名冲突的风险。
- 模块化加载：与现代模块系统（如 ES6 模块、CommonJS、AMD）兼容，支持按需加载模块，使得代码分片和按需加载更容易。
- 代码复用：模块化促进了代码的复用和封装，通过 export 和 import，可以灵活地共享代码。

默认导出和命名导出：

- 模块支持 默认导出（default export） 和 命名导出（named export）。

```ts
// 命名导出：
export function multiply(x: number, y: number): number {
  return x * y;
}
//--------------------------------------------------
//默认导出：
export default function multiply(x: number, y: number): number {
  return x * y;
}
//--------------------------------------------------
import multiply from './math'; // 对应默认导出
import { multiply } from './math'; // 对应命名导出
```

### 区别总结

| 特性            | 命名空间（Namespace）                            | 模块（Modules）                             |
| :-------------- | :----------------------------------------------- | :------------------------------------------ |
| 语法            | 使用 namespace 关键字                            | 使用 export 和 import 关键字                |
| 作用域          | 全局作用域或与其他命名空间共享                   | 件作用域，隔离在模块内部                    |
| 导入方式        | 通过 ///<reference path="..." /> 引入文件        | 通过 import 引入模块                        |
| 应用场景        | 用于没有模块加载系统的全局代码组织               | 适用于现代模块系统（如 ES6、CommonJS、AMD） |
| 代码拆分        | 不能直接支持按需加载                             | 支持代码按需加载和分片                      |
| 命名冲突防止    | 可以通过组织命名空间来避免，但仍然暴露全局作用域 | 通过模块作用域自动防止命名冲突              |
| JavaScript 兼容 | 不会生成模块化的 JavaScript                      | 与现代 JavaScript 模块系统兼容              |

### 选择使用命名空间还是模块？

- 命名空间 更适合没有模块加载系统的项目，或是在旧的代码库中使用全局变量的场景。
- 模块 是现代 TypeScript 和 JavaScript 开发的首选方式，因为它与 ES6 模块标准兼容，支持模块化加载和按需加载，适合构建大型应用程序。
