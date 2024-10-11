# 在 TS 中如何实现继承

- 在 TypeScript 中，继承 是通过 class 关键字以及 extends 关键字来实现的。继承允许一个类基于另一个类进行扩展，从而重用其属性和方法。这是面向对象编程的重要特性之一，它支持代码的重用和组织。

### 类的继承

- 使用 extends 关键字可以让一个类继承另一个类。继承后，子类可以访问父类中的所有属性和方法。

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log('Some generic sound');
  }
}

// Dog 类继承了 Animal 类
class Dog extends Animal {
  constructor(name: string) {
    super(name); // 调用父类的构造函数
  }

  // 重写父类的方法
  makeSound(): void {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog('Buddy');
dog.makeSound(); // 输出: Woof! Woof!
```

- Dog 类通过 extends 关键字继承了 Animal 类。
- 在 Dog 类的构造函数中，使用 super 关键字调用父类的构造函数，确保父类的属性 name 被正确初始化。
- Dog 类还重写了 Animal 类的 makeSound 方法，使得 Dog 类可以有自己的实现。

### super 关键字

- super 关键字用于访问父类的属性和方法。它既可以在构造函数中调用父类的构造函数，也可以在子类中调用父类的方法。

```ts
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number): void {
    console.log(`${this.name} moved ${distance} meters.`);
  }
}

class Bird extends Animal {
  constructor(name: string) {
    super(name); // 调用父类的构造函数
  }

  move(distance: number): void {
    console.log('Flying...');
    super.move(distance); // 调用父类的 move 方法
  }
}

const bird = new Bird('Sparrow');
bird.move(10); // 输出: Flying... \n Sparrow moved 10 meters.
```

- 在这个例子中，Bird 类调用了父类 Animal 的 move 方法。super.move(distance) 调用的是父类的 move 方法，而 Bird 类的 move 方法则在其基础上添加了更多逻辑。

### 继承的访问修饰符

- public：默认修饰符，允许在类的内部和外部都能访问。
- protected：允许在类内部和子类中访问，但不能在类的外部访问。
- private：仅允许在类的内部访问，不能在子类或外部访问。

```ts
class Animal {
  public name: string;
  protected age: number;
  private type: string;

  constructor(name: string, age: number, type: string) {
    this.name = name;
    this.age = age;
    this.type = type;
  }

  describe(): void {
    console.log(`${this.name} is a ${this.type}.`);
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, 'Dog');
  }

  getAge(): void {
    console.log(`${this.name} is ${this.age} years old.`); // 可以访问 protected 成员
    // console.log(this.type);  // 错误：无法访问 private 成员
  }
}

const dog = new Dog('Buddy', 5);
dog.describe(); // 输出: Buddy is a Dog.
dog.getAge(); // 输出: Buddy is 5 years old.
// console.log(dog.age);  // 错误：无法从外部访问 protected 成员
```

### 总结

- 继承 是通过 extends 关键字实现的，子类继承父类的属性和方法。
- super 关键字用于调用父类的构造函数和方法。
- 访问修饰符 控制类的成员访问权限，public、protected 和 private 决定了类的属性或方法的可见性。
- 抽象类 可以定义抽象方法，必须在子类中实现，无法直接实例化抽象类。
