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

### extends 和 implements 有什么区别？

1. ##### extends 的作用

- 用于继承（interface）：extends 关键字用于类和接口的继承。
- 当一个类 extends 另一个类时，它继承了父类的所有属性和方法，并且可以添加或复盖（重写）父类的方法和属性。
- 接口也可以使用 extends 来继承其它接口，合并多个接口的定义。

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  makeSound() {
    console.log('Animal sound');
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  makeSound() {
    console.log('Bark');
  }
}
```

- 在这个例子中，Dog 类型继承了 Animal 类，并重写 makeSound 方法。
- extends 用于接口继承

```typescript
interface Person {
  name: string;
}

interface Employee extends Person {
  salary: number;
}
```

- 这里，Employee 继承了 Person 接口，所以 Employee 拥有 name 和 salary 两个属性。

2. ##### implements 的作用

- 用于实现(implements)：implements 关键字用于类的实现接口，它示于必现接口中的定义的所有属性和方法。
- implements 不涉及继承的具体实现，只要求类遵循接口的结构。

```typescript
interface Person {
  name: string;
  greet(): void;
}

class User implements Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}
```

- 在这个例子中，User 类实现了 Person 接口，必须提供 name 属性和 greet 方法。

3. ##### 组合类型

- 在 Typescript 中，类可以同时 extends 一个类并 implements 一个或多个接口。

```typescript
interface Movable {
  move(): void;
}
class Vehicle {
  speed: number = 0;
  accelerate() {
    this.speed += 10;
  }
}
class Car extends Vehicle implements Movable {
  move() {
    console.log('Car is moving');
  }
}
```

- Car 类继承了 Vehicle 类，并实现了 Movable 接口。

4. ##### 主要区别
   | 特性       | extends                                                  | implements                         |
   | ---------- | -------------------------------------------------------- | ---------------------------------- |
   | 用途       | 类继承其它类，或接口继承其它接口                         | 类实现接口，强制类遵守接口的强构   |
   | 继承的内容 | 类继承时继承父类的所有属性和方法，接口继承时合并所有成员 | 仅要求类实现接口中的属性和方法     |
   | 使用场景   | 用于类与类之间，接口与接口之间的继承关系                 | 用于类与接口的属性和方法           |
   | 方法重写   | 子类可以重写父类的方法                                   | 类必须完全实现接口中定义的所有方法 |
