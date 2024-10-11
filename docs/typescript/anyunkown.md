# any 和 unkown 有什么区别

- 在 TypeScript 中，any 和 unknown 都可以表示任意类型，但它们的使用场景和安全性存在明显的区别。any 允许最大限度的灵活性，而 unknown 则提供了更强的类型安全性。

### any 类型

- 特点：any 类型允许你对值执行任何操作，而不会有类型检查错误。使用 any 类型后，TypeScript 编译器不会对该值做任何静态类型检查。
- 优势：极大的灵活性，可以快速跳过类型检查，尤其是在处理第三方库、遗留代码或者需要临时禁用类型检查时。
- 劣势：any 会让你失去 TypeScript 提供的类型安全保障，可能引发运行时错误而没有编译时提示。

```ts
let value: any;
value = 'Hello'; // 可以是字符串
value = 42; // 可以是数字
value = {}; // 可以是对象

// 没有类型检查，可以调用任意方法或访问属性
value.someNonExistentMethod(); // 不会有任何编译错误，但可能在运行时崩溃
```

### unknown 类型

- 特点：unknown 是 TypeScript 3.0 引入的一个更安全的任意类型。和 any 不同的是，unknown 在没有进行类型断言或类型检查之前，你不能对 unknown 类型的值执行任何操作。
- 优势：相比于 any，unknown 提供了更强的类型安全性。你必须在对值使用之前明确地检查它的类型，从而避免潜在的运行时错误。
- 劣势：在使用 unknown 时，你需要手动添加类型检查代码，这增加了一些额外的工作量。

```ts
let value: unknown;
value = 'Hello'; // 可以是字符串
value = 42; // 可以是数字
value = {}; // 可以是对象

// 无法直接调用方法或访问属性，需要类型检查
// value.someNonExistentMethod();  // 直接调用会编译错误

if (typeof value === 'string') {
  // 通过类型检查后才能调用字符串的方法
  console.log(value.toUpperCase());
}
```

### unknown 和类型断言

- 你可以通过类型断言或类型检查将 unknown 类型转换为一个更具体的类型，之后再安全地使用它。

```ts
let value: unknown = 'Hello';

// 使用类型断言
let strValue: string = value as string;
console.log(strValue.toUpperCase());

// 或者使用类型检查
if (typeof value === 'number') {
  console.log(value.toFixed(2)); // 只有在确定类型为 number 时才可以调用 number 方法
}
```

### any 和 unknown 的主要区别

| 比较项       | any                                            | unknown                                        |
| :----------- | :--------------------------------------------- | :--------------------------------------------- |
| 类型检查     | 没有任何类型检查，允许对值执行任何操作。       | 在使用前需要类型检查或类型断言。               |
| 安全性       | 非常不安全，可能导致运行时错误。               | 更安全，必须确认类型后才能操作，避免潜在错误。 |
| 常见使用场景 | 快速处理动态数据或绕过类型检查（如第三方库）。 | 需要处理未知类型的数据，确保类型安全。         |
| 类型推断     | 不提供类型推断和自动类型检查。                 | 必须明确类型才能使用，提供更好的推断支持。     |

### 使用场景和建议

- any：适合在类型不确定且不关心类型的场景下使用，比如处理遗留代码、与不严格的 API 交互时。应该尽量少用，因为它会带来潜在的类型安全问题。
- unknown：推荐在处理类型不确定的数据时使用 unknown，因为它要求你在使用之前进行类型检查，这提供了更好的类型安全和明确性。

### 总结

- any 和 unknown 都可以表示任意类型，但 any 允许不受限制的操作，失去了类型检查的保护，容易导致运行时错误。
- unknown 提供了类型安全性，要求在使用之前进行类型检查或断言，适合在不确定数据类型的场景中使用。
- 推荐尽量使用 unknown 而非 any，以便充分利用 TypeScript 的类型检查优势，保证代码的健壮性和安全性。