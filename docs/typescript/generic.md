

# 泛型有什么作用？

- 泛型（Generics）是一种为代码提供灵活性和复用性的工具，通过使用泛型，可以编写能够处理多种类型的代码，而不需要重复编写类似的逻辑。泛型允话在运行时处理具体类型之前，保持类型的灵活性，但依然能提供类型安全的支持。
- 泛型的作用：  
  1）提高代码复用性，泛型允许编写通用函数、类和接口，避免重复编写相似的代码。  
  2）类型安全，在使用泛型时，类型会在编译时进行类型检查，确保不会发生类型错误。  
  3）灵活性，泛型支持在不确定具体类型的情况下定义代码逻辑，但一旦确定类型，仍能保持类型的约束。

1. ##### 泛型函数

- 泛型函数允话编写可以用于多个类型函数，而不必为每个类型单独编写函数。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const output1 = identity<string>('hello'); // 指定类型为 string
const output2 = identity<number>(123); // 指定类型为 number
```

2. ##### 泛型接口

- 泛型接口允许定义一个通过的接口，接口的具体类型由使用者在定义时指定。

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

const stringResponse: ApiResponse<string> = {
  data: 'hello world',
  status: 200,
};

const numberResponse: ApiResponse<number> = {
  data: 123,
  status: 200,
};
```

3. ##### 泛型类

- 泛型同样可以应用于类，允许你创建可以操作不同类型数据的类。

```typescript
class GenericNumber<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
  add(x: T, y: T): T {
    // 假设 T 能够进行加法运算
    return x;
  }
}

const number = new GenericNumber<number>(10);
console.log(number.add(10, 20));

const str = new GenericNumber<string>('Hello');
console.log(str.value); // "Hello"
```

4. ##### 泛型约束

- 有时可能需要对泛型参数进行约束，以确保它具有某个属性或方法。

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
logLength('hello'); // OK，字符串有 length 属性
logLength([1, 2, 3]); // OK，数组有 length 属性
// logLength(123);     // Error，number 没有 length 属性
```

5. ##### 多个类型参数

- 泛型不仅限于单个类型参数，还可以使用多个类型参数，适用于处理及多种类型场景。

```typescript
function merge<T, U>(obj1: T, obj2: T): T & U {
  return { ...obj1, obj2 };
}

const result = merge({ name: 'Alice' }, { age: 30 });
console.log(result);
```

5. ##### 泛型工具类型

- TypeScript 内置了一些泛型工具类型，用来简化常见的类型操作，比如：

`Partial<T>`：将某个类型的所有属性变为可选。  
`Readonly<T>`：将某个类型的所有属性变为只读。  
`Record<K, T>`：构造一个对象类型，其键为类型 `K`，值为类型 `T`。  
`Pick<T, K>`：从类型 T 中选择属性 `K`组成新的类型。

```typescript
interface User {
  id: number;
  name: string;
  age: number;
}

type PartialUser = Partial<User>; // 所有属性变为可选
type ReadonlyUser = Readonly<User>; // 所有属性变为只读
type NameOnly = Pick<User, 'name'>; // 只保留 name 属性
```

