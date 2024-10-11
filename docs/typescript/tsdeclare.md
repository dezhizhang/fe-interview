# TypeScript 中的 Declare 关键字有什么作用？

- declare 关键字用于声明已经存在但当前 TypeScript 文件中不可见的变量、函数、类、模块等。这通常用于告诉 TypeScript 编译器某些内容是在其它地方定义的，避免编译时报错。
  declare 关键字本身不会生成任何 JavaScript 代码，它仅用于类型检查，表示你已经知道该对像的存在，但它的定义不在当前文件中。

### 声明全局变量

- 当在 TypeScript 文件中使用一个来自外部环境，（如浏览器、Nodejs 环境或第三方库）的全局变量时，如果 TypeScript 编译器无法识别该变量，就可以使用 declare 来告诉 TypeScript 这个变量已经存在。

```ts
declare var JQuery: any;
jQuery('#id').hide(); // 假设 jQuery 是全局变量
```

- 这里，declare var Jquery:any;告诉 TypeScript 编译器，全局变量 JQuery 存在于运行时，但它不会将此变量生成到输出的 JavaScript 中，它仅用于编译时的类型检查。

### 声明外部模块

- 当你使用非 TypeScript 模块（如没有类型声明的第三方 JavaScript 库时），可以使用 declare module 来为这些模块声明类型

```ts
declare module 'lodash' {
  export function chunk<T>(array: T[], size: number): T[][];
}
```

### 声明全局类型或接口

- 在某些情况下，你可能需要扩展全局对像（如 Window、 Document）, 这里你可以使用 declare 来扩展它们的类型。

```ts
declare global {
  interface Window {
    myCustomProperty: string;
  }
}
window.myCustomProperty = 'hello world';
```

- 这里我们使用 declare global 来扩展 Window 接口告诉 TypeScript 编译器 window 对象上存在一个 myCustomProperty 属性。

### 声明外部函数

- 当你使用 JavaScript 库中的全局函数时，可以用 declare function 来告诉 TypeScript 这个函数的签名是什么。

```ts
declare function alert(message: string): void;
alert('hello world');
```

- 这声明了全局 alter 函数，并定义了它的参数和返回类型，这样 TypeScript 在你使用了 alert 函数时能够进行类型检查。

### 声明外部类

- 有时你可能需要引用已经存在但 TypeScript 并不直接知道类，这里可以使用 declare class。

```ts
declare class Greeter {
  constructor(message: string);
  greet(): void;
}

let greeter = new Greeter('Hello');
greeter.greet();
```

- 这里的 declare class 告诉 TypeScript 有一个名为 Greeter 的类，并描述了它的构造函数和方法。

### 声明命名空间

- 当你在一个模块或命名空间下使用一些第三方库，或者将现有的 JavaScript 代码转换为 TypeScript 时，可以用 declare namespace 来声明该模块或命名空间。

```ts
declare namespace myNamespace {
  function myFunction(): void;
}
myNamespace.myFunction();
```

- 这声明了一个 myFunction 命名空间，并且其中一个 myFunction 函数。

### declare 与 d.ts 文件

- 通常，declare 关键字会与 类型声明文件（.d.ts 文件）一起使用。这些文件专门用于为 JavaScript 库、全局变量、外部模块等提供类型信息，而不生成实际的 JavaScript 代码。
- 例如，使用第三方库时，你可以编写或引用 .d.ts 文件：

```typescript
declare module 'lodash' {
  export function chunk<T>(array: T[], size: number): T[][];
}
```
