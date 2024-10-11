# extends 和 implements 有什么区别？

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
