# var、let 和 const 的区别

- 在 JavaScript 中，var、let 和 const 是用于声明变量的关键字。它们之间的主要区别在于作用域、变量提升、可变性以及是否允许重复声明。下面详细解释这些区别：

### 作用域

1. ##### var

- var 声明的变量是 函数作用域 或 全局作用域。如果在函数内部使用 var，该变量只能在该函数内访问；如果在函数外部使用，则该变量在全局范围内有效。
- var 变量在其声明之前是可以访问的（即使未赋值），这被称为 变量提升。

```js
function example() {
  console.log(a); // undefined
  var a = 10;
  console.log(a); // 10
}
example();
```

2. ##### let 和 const

- let 和 const 声明的变量是 块作用域，这意味着它们只能在包含它们的代码块（如 if、for 循环等）中访问。

```js
if (true) {
  let b = 20;
  const c = 30;
  console.log(b); // 20
  console.log(c); // 30
}
console.log(b); // ReferenceError: b is not defined
console.log(c); // ReferenceError: c is not defined
```

### 变量提升

1. ##### var

- var 声明的变量会被提升到函数的顶部（或全局顶部），但赋值不会被提升。

2. ##### let 和 const

- let 和 const 也会被提升，但在声明之前访问它们会导致 ReferenceError，这称为 暂时性死区 (Temporal Dead Zone)。

```js
console.log(x); // undefined (var)
var x = 5;

console.log(y); // ReferenceError: y is not defined
let y = 10;

console.log(z); // ReferenceError: z is not defined
const z = 15;
```

### 可变性

- var 和 let 声明的变量是可变的，可以被重新赋值。

```js
var d = 5;
d = 10; // 允许

let e = 15;
e = 20; // 允许
```

- const 声明的变量是 常量，一旦赋值后不能被重新赋值。需要注意的是，const 只保证对变量的绑定是不可变的，而如果是对象或数组，内容仍然可以被修改。

```js
const f = 25;
// f = 30; // TypeError: Assignment to constant variable.

const obj = { key: 'value' };
obj.key = 'newValue'; // 允许，obj 的内容可以被修改
```

### 重复声明

- var 可以在同一作用域内重复声明变量，不会抛出错误。

```js
var g = 1;
var g = 2; // 允许
```

- let 和 const 不允许在同一作用域内重复声明变量，会抛出 SyntaxError。

```js
let h = 3;
// let h = 4; // SyntaxError: Identifier 'h' has already been declared

const i = 5;
// const i = 6; // SyntaxError: Identifier 'i' has already been declared
```

### 总结

- 作用域：var 是函数作用域或全局作用域，let 和 const 是块作用域。
- 变量提升：var 会被提升并初始化为 undefined，而 let 和 const 会被提升但在声明前不可访问。
- 可变性：var 和 let 可以重新赋值，const 不可重新赋值，但对象内容可变。
- 重复声明：var 可以重复声明，let 和 const 不允许重复声明。
