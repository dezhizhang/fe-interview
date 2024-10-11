# 请说说你对 TS 中类的理解

- 在 TypeScript 中，类（class）是面向对象编程的核心特性之一。它扩展了 JavaScript 的 class 概念，同时引入了类型系统、访问修饰符等增强功能，使得类的定义更加严格和灵活，适合大型项目中的代码组织和维护。

### 类的基本结构

- 一个类由属性和方法组成。可以通过构造函数（constructor）来初始化类的实例。

```ts
class Person {
  // 属性
  name: string;
  age: number;

  // 构造函数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // 方法
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`,
    );
  }
}

const person = new Person('John', 30);
person.greet(); // 输出: Hello, my name is John and I'm 30 years old.
```

### 访问修饰符

- TypeScript 中的类可以使用访问修饰符来控制属性和方法的可见性。主要有以下三种修饰符：

1. public：默认的修饰符，类的属性或方法可以在任何地方访问。
2. private：私有的属性或方法只能在类的内部访问，不能被实例对象或子类访问。
3. protected：受保护的属性或方法可以在类的内部和子类中访问，但不能通过实例访问。

```ts
class Employee {
  public name: string; // 公共的，任何地方都可以访问
  private salary: number; // 私有的，只有类内部可以访问
  protected position: string; // 受保护的，子类可以访问

  constructor(name: string, salary: number, position: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
  }

  // 公共方法
  public displayInfo(): void {
    console.log(`${this.name} works as ${this.position}.`);
  }

  // 私有方法
  private calculateBonus(): number {
    return this.salary * 0.1;
  }
}

const emp = new Employee('Alice', 10000, 'Developer');
emp.displayInfo(); // 输出: Alice works as Developer.
// emp.salary;  // 错误: salary 是私有属性
// emp.calculateBonus();  // 错误: calculateBonus 是私有方法
```

### 继承与多态

- TypeScript 支持类的继承，子类可以继承父类的属性和方法，重写父类的方法，实现面向对象编程中的多态。

```ts
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public makeSound(): void {
    console.log(`${this.name} is making a sound.`);
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name); // 调用父类的构造函数
  }

  // 重写父类方法
  public makeSound(): void {
    console.log(`${this.name} is barking.`);
  }
}

const dog = new Dog('Buddy');
dog.makeSound(); // 输出: Buddy is barking.
```

### 抽象类

- TypeScript 中的抽象类（abstract）不能被实例化，只能被继承。抽象类通常作为其他类的基类，它可以包含抽象方法，抽象方法必须在子类中实现。

```ts
abstract class Vehicle {
  public abstract move(): void; // 抽象方法，没有方法体

  public stop(): void {
    console.log('The vehicle has stopped.');
  }
}

class Car extends Vehicle {
  public move(): void {
    console.log('The car is moving.');
  }
}

const car = new Car();
car.move(); // 输出: The car is moving.
car.stop(); // 输出: The vehicle has stopped.
```

### 接口与类的实现

- TypeScript 中的接口（interface）可以用来定义类的结构。类可以实现一个或多个接口，必须实现接口中定义的所有属性和方法。

```ts
interface Flyable {
  fly(): void;
}

class Airplane implements Flyable {
  public fly(): void {
    console.log('The airplane is flying.');
  }
}

const plane = new Airplane();
plane.fly(); // 输出: The airplane is flying.
```

### 静态属性和方法

- 类的静态属性和方法可以在不创建实例的情况下直接通过类名来访问

```ts
class MathUtils {
  static PI: number = 3.14;

  static calculateArea(radius: number): number {
    return this.PI * radius * radius;
  }
}

console.log(MathUtils.PI); // 输出: 3.14
console.log(MathUtils.calculateArea(5)); // 输出: 78.5
```

### 类的泛型

- TypeScript 中的类也可以使用泛型，允许定义可以处理不同类型的类。

```ts
class Box<T> {
  private content: T;

  constructor(content: T) {
    this.content = content;
  }

  public getContent(): T {
    return this.content;
  }
}

const stringBox = new Box<string>('Hello');
console.log(stringBox.getContent()); // 输出: Hello

const numberBox = new Box<number>(123);
console.log(numberBox.getContent()); // 输出: 123
```

### 类的装饰器（Decorators）

- TypeScript 支持类装饰器，这是一种特殊的语法用于修改类的行为。装饰器在类或类的成员上使用，通常用于元编程、依赖注入等高级场景。

```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class SealedClass {
  constructor(public name: string) {}
}
```

### 总结

1. 类 是面向对象编程的核心，它包含了属性、方法、构造函数等基本概念。
2. 访问修饰符（如 public、private、protected）控制属性和方法的可见性。
3. TypeScript 支持继承、多态和抽象类，增强了代码的可扩展性和重用性。
4. 接口可以为类提供结构定义，支持多个接口的实现。
5. 静态属性和方法可以让类在不实例化的情况下调用某些方法或属性。
6. 泛型类使得类能够处理不同类型的数据。
7. 类装饰器提供了元编程功能，允许修改类的行为。
