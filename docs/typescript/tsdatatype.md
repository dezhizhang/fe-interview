# TS 有哪些内置数据类型？

- TypeScript 提供了与 JavaScript 相同的基础数据类型，并在此基础上扩展了一些类型检查功能。以下是 TypeScript 的主要内置数据类型：

### boolean

- 布尔类型，表示 true 或 false 的值。

```ts
let isDone: boolean = true;
```

### number

- 所有数字，无论是整数还是浮点数，都是 number 类型。TypeScript 也支持十进制、十六进制、二进制和八进制字面量。

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### string

- 字符串类型，表示文本数据。可以使用双引号 (")、单引号 (') 或反引号（`）来定义。

```ts
let color: string = 'blue';
let sentence: string = `Hello, my name is ${name}`;
```

### array

数组类型。可以使用两种方式来定义数组：

- 使用元素类型后跟 []。
- 使用 Array<元素类型> 泛型。

```ts
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

### tuple

- 元组类型允许定义一个已知元素数量和类型的数组。各元素的类型可以不同。

```ts
let tuple: [string, number];
tuple = ['hello', 10]; // 正确
// tuple = [10, "hello"];  // 错误
```

### enum

- 枚举类型用于定义一组命名的常量。默认情况下，枚举中的元素从 0 开始编号，但可以手动指定值。

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Status {
  Active = 1,
  Inactive,
  Pending,
}
let s: Status = Status.Inactive; // 值为 2
```

### any

- any 类型表示任意类型，允许对任何类型的值进行操作，而不会有类型检查。通常在动态获取某些值或需要兼容旧代码时使用。

```ts
let notSure: any = 4;
notSure = 'a string';
notSure = false;
```

### unknown

- unknown 是一种更安全的 any 类型。你可以将任意类型的值赋给 unknown，但在对 unknown 类型的变量执行操作时，必须先进行类型检查或类型断言。

```ts
let uncertain: unknown = 4;
uncertain = 'maybe a string';

// 需要进行类型检查
if (typeof uncertain === 'string') {
  console.log(uncertain.length); // 可以操作
}
```

### void

- void 表示没有任何类型，通常用于没有返回值的函数。

```ts
function warnUser(): void {
  console.log('This is a warning message');
}
```

### null 和 undefined

TypeScript 中有两种表示不存在或未定义的原始数据类型：

- null：表示一个空值。
- undefined：表示一个未定义的值。
- 默认情况下，null 和 undefined 是所有类型的子类型，也就是说，你可以将它们赋值给其他类型的变量。但是在严格模式下（strictNullChecks），它们只能赋值给各自的类型。

```ts
let n: null = null;
let u: undefined = undefined;
```

### never

- never 类型表示那些永远不会有值的类型。通常用于表示会抛出异常或根本不会有返回值的函数。

```ts
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

### object

- object 类型表示非原始类型，也就是除了 number、string、boolean、symbol、null 或 undefined 之外的类型。

```ts
let obj: object = { name: 'John', age: 25 };
```

### symbol

- symbol 是 ES6 引入的一种新的原始类型，表示唯一且不可变的值，通常用于对象的属性键。

```typescript
const sym1 = Symbol();
const sym2 = Symbol('key');
```

### bigint

- bigint 是一种表示大整数的类型，可以表示比 number 类型更大范围的整数。通过在数字后面加 n 或者使用 BigInt() 函数来创建 bigint 值。

```ts
let big: bigint = 100n;
let anotherBig = BigInt(123456789012345678901234567890);
```

### 类型组合（联合类型和交叉类型）

```ts
//联合类型允许一个变量可以是多种类型之一，通过使用 | 运算符定义。
let value: number | string;
value = 42; // 正确
value = 'hello'; // 正确
//----------------------------------------------------
//交叉类型将多个类型合并为一个类型，要求必须满足所有参与的类型。
type Person = { name: string };
type Employee = Person & { salary: number };
let employee: Employee = { name: 'John', salary: 5000 };
```

### 总结

- TypeScript 提供了丰富的内置数据类型，包括基础的 boolean、number、string 等，扩展的 tuple、enum、any、unknown 等，以及更复杂的联合类型和交叉类型。这些类型帮助开发者在编写代码时进行类型检查，减少错误，提升代码的健壮性和可维护性。
