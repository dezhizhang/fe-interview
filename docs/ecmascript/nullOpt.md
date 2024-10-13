# 空值合并运算符 (`??`)

空值合并运算符（Nullish Coalescing Operator）是 ECMAScript 中引入的一种新运算符，专门用于处理 `null` 和 `undefined` 的情况。它的符号是 `??`，其作用是：**当左侧的操作数为 `null` 或 `undefined` 时，返回右侧的操作数；否则返回左侧的操作数**。

## 语法

```js
let result = a ?? b;
```

- 如果 a 是 null 或 undefined，则返回 b；
- 如果 a 不是 null 或 undefined，则返回 a。

```js
let user;
let defaultUser = 'Guest';

console.log(user ?? defaultUser); // 输出: "Guest"

user = 'John';

console.log(user ?? defaultUser); // 输出: "John"
```

## 与逻辑 OR (||) 的区别

空值合并运算符和逻辑 OR (||) 运算符的行为有所不同：

- || 会在左侧操作数为假值（如 false、0、'' 等）时返回右侧的值；
- ?? 只在左侧为 null 或 undefined 时返回右侧的值。

```js
let a = 0;
let b = a || 42; // 由于 a 是 0，逻辑 OR 返回 42
console.log(b); // 输出: 42

let c = a ?? 42; // 由于 a 不是 null 或 undefined，空值合并运算符返回 a
console.log(c); // 输出: 0
```

## 应用场景

- 设置默认值：当变量可能是 null 或 undefined 时，可以使用 ?? 设置默认值。

```js
let username = null;
let displayName = username ?? 'Guest';
console.log(displayName); // 输出: 'Guest'
```

- 避免误判假值：在需要保留 false、0、'' 等假值作为有效输入时，?? 可以避免使用默认值。

```js
let count = 0;
let displayCount = count ?? 10; // 空值合并运算符不会覆盖 count，因为它是有效值
console.log(displayCount); // 输出: 0
```

## 总结

- ?? 只会在操作数为 null 或 undefined 时，才返回右侧的值；
- 与逻辑 OR (||) 不同，它不会将 false、0、'' 等假值误判为需要使用默认值的情况。
