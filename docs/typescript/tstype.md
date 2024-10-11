# 你有用过哪些 ts 的高级类型？

- 作为 Typescript 的使用者，了解和应用 Typescript 的高级类型可以让代码具有表达性，灵活性和类型安全性。

1. ##### 交叉类型（intersection Types）

- 交叉类型（&）用于将多个类型合并为一个类型，表示必须同时满足所有类型的条件，常用于合并对像类型的定义。

```typescript
type Person = {
  name: string;
};

type Employee = {
  employeeid: number;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: 'tom',
  employeeid: 123,
};
```

2. ##### 联合类型（Union Types）

- 联合类型（|）允许一个值可以是几种不同类型中的一种，非常常见于处理可能有多种输入的场景。

```typescript
function fn(id: string | number) {
  console.log(id);
}

fn(123); // ok
fn('abc'); // ok
```

3. ##### 类型别名(Type Aliases)

- 类型别名（type） 用于给复杂的类型定义一个简洁的名称，除了对像类型，它也可以用于联合类型，交叉类型，函数等。

```typescript
type StringOrNumber = string | number;

function handleInput(input: StringOrNumber) {
  // 可以处理 string 或 number 类型
}
```

4. ##### 映射类型（Mapped Types）

- 映射类型用于基于一个对像类型创建另一个类型，允许我们批量修改对像的类型，常见的有 `Partial<T>`、`Readonly<T>` 等工具类型。

```typescript
type Person = {
  name: string;
  age: number;
};

type PartialPerson = Partial<Person>; // 所有属性变为可选
type ReadonlyPerson = Readonly<Person>; // 所有属性变为只读
```

5. ##### 条件类型（Conditional Types）

- 条件类型通过 T extends U ? X:Y 来根据某些条件选择不同的类型，它非常适合做类型推导和转换。

```typescript
type IsString<T> = T extends string ? 'Yes' : 'No';
type Test1 = IsString<string>; // 'Yes'
type Test2 = IsString<number>; // 'No'
```

6. ##### 索引类型（Index Types）

- 使用索引类型，可以从对像中获取属性的类型，常用于动态地访问对像类型的属性类型。

```typescript
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person; // 'name' | 'age'
type NameType = Person['name']; // string
```

7. ##### keyof 操作符

- keyof 操作符用于获取对像类型的所有键，返回一个联合类型，常用于限制函数参数为对像类型的属性

```typescript
function getPerson<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'tom', age: 30 };
const age = getPerson(person, 'age'); // 30
```

8. ##### infer 关键字

- infer 关键字用于在条件类型中推断类型，非常适合从复杂类型中提取某部分类型。

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getName() {
  return 'tom';
}

type NameType = ReturnType<typeof getName>; // string;
```

9.  ##### Exclude、Extract、NonNullable

- Typescrpt 提供了一些实用的条件工具函数，用于处理类型的过虑和提取
- `Exclude<T, U>`：从 `T` 中排除属于 `U` 的类型。
- `Extract<T,U>`：提取 `T` 中属于 `U` 的类型。
- `NoNummable<T>`：移除 `T` 中的 `null` 和 `undefined`。

```typescript
type T1 = Exclude<string | number | boolean, boolean>; // string | number
type T2 = Extract<string | number | boolean, boolean>; // boolean
type T3 = NonNullable<string | null | undefined>; // string
```

10. ##### Record 类型

- `Record<K,T> 用于创建一个对像类型，其键为类型 K，值为类型 T，它常用于将某个类型映射到一组键值对上。

```typescript
type PageInfo = {
  title: string;
};

type Page = 'home' | 'about' | 'count';

const pages: Record<Page, PageInfo> = {
  home: { title: 'Home Page' },
  about: { title: 'About Us' },
  contact: { title: 'Contact' },
};
```
