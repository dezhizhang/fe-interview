# 你是怎么优化你的 ts 代码的？

- 在 Typescript 项目中，优化代码可以提升代码的可读书、可维护性、类型安全性以及性能，以下一些我们常用的优化方法。

1. ##### 合理使用类型注解

- 避免过度使用类型注解；typescript 的类型推断机制非常强大，很多时候不需要手动添加类型注解。
- 在关键地方明确注解；比如函数参数、返回值类型、复杂对像结构等，让代码更直观。

```typescript
const age = 30;

function add(a: number, b: number): number {
  return a + b;
}
```

2. ##### 使用高级类型提高类型表过力

- 利于联合类型和交叉类型等高级类型，减少代码冗余和类型冲突。
- 使用条件类型和映射类型来处理更杂复的类型需求

```typescript
type User = { id: number; name: string };
type Admin = User & { isAdmin: boolean };

// 使用联合类型处理多个可能的输入
function getId(user: User | Admin): number {
  return user.id;
}
```

3. ##### 避免使用 any,使用更精确的类型

- any 类型会破坏类型安全性，应尽可能逸免，如果需要类型灵活性，可以使用 unknon 或联合类型。
- unknow 提供比 any 更严格的类型检测，因为在使用之前必须先进行类型检查

```typescript
let data: unknown;
if (typeof data === 'string') {
  console.log(data.toUpperCase());
}

//
let flexible: any; // 避免any,减少潜在的类型错误
```

4. ##### 利用 TypeScript 内置工具类型

- TypeScript 提供了话多有用的工具类型，如 `Partial<T>`、`Readonly<T>`、`Record<K,T>`,`Pick<T,K>` 等，它们可以帮助简化类型定义并提高代码的可复用性。

```typescript
interface User {
  name: string;
  age: number;
  address: string;
}
// 将 User 类型的所有属性变为可选
type PartialUser = Partial<User>;

// 只从User中选择特定属性
type NameOnly = Pick<User, 'name'>;
```

5. ##### 合理使用类型别名(Type Aliaes) 和接口(Interface)

- 类型别名和接口都可以用于定义对像的形像，通常在定义复杂类型和联合类型时使用 type,而在扩展对像时使用 interface。
- 保持接口类型与类型别名的简单性，避免定义过于复杂的嵌套结构。

```typescript
type Response = Success | Failure;

interface Success {
  success: 'success';
  data: string;
}

interface Failure {
  status: 'failure';
  error: string;
}
```

6. ##### 避免重复代码

- 当某个类型定义或代码片段重复时，使用类型别名泛型进行抽象。
- `泛型`能够在类、函数或接口中定义可复用的、与类型无关的代码。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

const response: ApiResponse<string> = { data: 'Hello', status: 200 };
```

7. ##### 严格的 ESLint 和 TSLint 配置

- 使用 ESLint 或 TSLint 配合 TypeScript 进行静态代码检测，确保代码风格一致、没有隐藏的类型错误。
- 开启 TypeScript 编译器的严格模式（strict:true），这会打开一系列严格的类型检查。

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

8. ##### 优化类型推断

- 在函数或类中，尽量依赖 TypeScript 的类型推断机制，而不是手动指定返回类型，让 Typescript 自动推断出最合适的类型。

```typescript
// 自动推断返回类型 number
function add(a: number, b: number) {
  return a + b;
}
// 若有必要，可以显示添加类型注解以确保返回类型
function addWithType(a: number, b: number): number {
  return a + b;
}
```

9. ##### 使用模块化、分离逻辑

- 将代码拆分成多个模块，避免单文件代码过于复杂，保持类型声明和逻辑分离，确保每个文件只做一件事。
- 模块化有助于增加代码的可读性和可维护性。

```typescript
// user.ts
export interface User {
  id: number;
  name: string;
}

// userService.ts
import { User } from './user';

export function getUser(id: number): User {
  return { id, name: 'tom' };
}
```

10. ##### 使用 readonly 防止意外修改

- 当对像或数组不应被修改时，使用 readonly 限制修改，以确保数据的不可变性，提高代码的安全性。

```typescript
interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: 'tom' };
```

11. ##### 合理使用类型守卫

- 使用类型守卫（typeof、instance、in 等）确保处理不同类型时，Typescript 能正确推断类型，提高代码安全性和可维护性。

```typescript
function logValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

11. ##### 使用 never 类型处理不可能发生的情况

- 使用 never 来标记那些不应该发生的分支，确保代码在类型上是穷尽的，并且避免意外的情况。

```typescript
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

type Animal = 'cat' | 'dog';

function speak(animal: Animal) {
  switch (animal) {
    case 'cat':
      console.log('Meow');
      break;
    case 'dog':
      console.log('Bark');
      break;
    default:
      assertNever(animal); // 确保不会传入未处理的情况
  }
}
```
