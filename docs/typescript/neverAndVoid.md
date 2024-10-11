# TypeScript 中 never 与 void 有什么区别？

- never 和 void 都是 TypeScript 中的特殊类型，它们在函数的返回类型定义中经常使用，但它们有着不同的含义和使用场景。

### never 类型

- never 表示那些永远不会有返回值的类型。它通常用于函数 不会正常结束，例如抛出异常或进入无限循环的情况。也就是说，凡是返回 never 的函数，是无法到达终点的函数。
- 使用场景：

1. 抛出异常的函数。
2. 死循环的函数。
3. 在类型保护（type guard）中用作不可能的情况。

```ts
// 抛出异常
function throwError(message: string): never {
  throw new Error(message); // 这个函数永远不会有返回
}
// -------------------------------------------
// 死循环
function infiniteLoop(): never {
  while (true) {} // 无限循环，永远不会有返回值
}
// -------------------------------------------
// 类型保护中的不可能情况
// 在类型保护（type guard）中，如果通过逻辑你确定某种情况不可能发生，可以使用 never 来表示不可能的类型。
type Foo = string | number;

function checkFoo(value: Foo) {
  if (typeof value === 'string') {
    console.log("It's a string");
  } else if (typeof value === 'number') {
    console.log("It's a number");
  } else {
    const unreachable: never = value; // 这里使用 `never`，因为这个分支理论上永远不会触发
  }
}
```

### void 类型

- void 表示没有返回值的类型。它通常用于函数，函数执行完毕后不会返回任何值，但仍然会正常结束。void 通常用于那些执行某种操作但不返回结果的函数。
- 使用场景：

1. 函数没有返回值，通常只是执行操作（例如输出内容）。

```ts
function logMessage(message: string): void {
  console.log(message); // 这个函数没有返回值，但会正常结束
}
```

- void 类型与 undefined 有时可以互换使用。在没有 strictNullChecks 时，void 表示函数的返回值是 undefined 或不返回任何内容。

### 主要区别

| 特性                   | never                                               | void                                                        |
| :--------------------- | :-------------------------------------------------- | :---------------------------------------------------------- |
| 表示的含义             | 永远不会有返回值（包括函数无法正常结束的情况）。    | 没有返回值，但函数可以正常结束。                            |
| 适用场景               | 函数抛出异常、死循环或类型保护中的不可能情况。      | 执行一些操作但没有返回结果的函数。                          |
| 编译器行为             | TypeScript 编译器会推断这个函数不应该有任何返回点。 | 编译器允许该函数结束时没有返回值。                          |
| 是否可以赋值 undefined | 能赋值为 undefined。                                | void 函数的返回值通常是 undefined，但可以赋值给 undefined。 |
| 示例                   | 抛出异常或无限循环的函数。                          | 打印日志或不返回值的函数。                                  |

### 总结

- never 用于表示函数永远不会返回，通常是因为抛出异常或进入无限循环，无法到达函数的结束点。
- void 用于表示函数没有返回值，意味着函数执行后不会返回任何结果，但可以正常结束。
- 两者的区别在于 void 表示可以结束但没有返回值，never 则表示永远不会结束或不会正常返回。
