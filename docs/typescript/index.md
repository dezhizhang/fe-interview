# Typescript 系列面试题

### interface 和 type 到底有什么区别？

- interface 和 type 都可以用来定义对像的形状或类型别名，但它们之间有一些重要区别和特性。

1. ##### 用途和语法

- interface：主要用于定义对像的结构，可以扩展（extend）来实现（implements）其它接口，通常用于定义类的形状。

```typescript
interface Person {
  name: string;
  age: number;
}
```

- type：可以定义任何类型别名，不限于对像，还包括联合类型、原始类型、函数等。

```typescript
type Person = {
  name: string;
  age: number;
};
```

2. ##### 扩展性

- interface：可以通过 extends 来扩展多个接口，这使提接口特别适合设计系统中的层次结构。

```typescript
interface Person {
  name: string;
}
interface Employee extends Person {
  salary: number;
}
```

- type：也可以通过交叉类型（&）来合并类型，但不像 interface 那样有语法上的扩展支持。

```typescript
type Person = {
  name: string;
};

type Employee = Person & {
  salary: number;
};
```

3. ##### 实现(implements)

- interface：可以用于类的 implements，用于确保类符合接口的结构

```typescript
interface Person {
  name: string;
  age: number;
}

class User implements Person {
  name = 'tom';
  age = 18;
}
```

- type：无法直接被 implements,但可以用来定义类的成员或使用在其它场景中。

4. ##### 合并声明

- interface：支持声明合并，如果定义了多个同名的接口，它们会自动合并

```typescript
interface Person {
  name: string;
}

interface Person {
  age: number;
}

// 合并后
// interface Person {
//   name: string;
//   age: number;
// }
```

- type：不支持声明合并,如果定义了两个同名的 type,会报错。

5. ##### 高级类型

- type：可以使用联合类型，交叉类型，条件类型等高级类型功能，能够处理复杂类理。

```typescript
type StringOrNumber = string | number;
```

6. ##### 场景推荐

- interface：更适合定义对像结构，特别是需要在扩展和面向对像设计时。
- type：用于需要更灵活和复杂类型组合场景，如联合类型，交叉类型。

7. ##### 总结

- 如果需要声明对像结构，并且可能进行扩展或合并，优先使用 interface。
- 如果需要处理更复杂的类型（如联合类型，交叉类型），则使用 type。
