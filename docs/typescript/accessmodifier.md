# TypeScript 中支持的访问修饰符有哪些？

-在 TypeScript 中，访问修饰符（Access Modifiers）用于控制类中成员（属性和方法）的可访问性。它们决定了类的属性或方法是可以从外部访问，还是只能在类的内部或继承类中使用。TypeScript 支持三种访问修饰符：

### public 修饰符

- 默认值：如果没有显式声明修饰符，成员会被默认视为 public。
- 访问范围：public 成员可以在类的内部、子类以及类的外部访问。

```typescript
class Person {
  public name: string; // 默认是 public，即使不写 public

  constructor(name: string) {
    this.name = name;
  }

  public greet() {
    console.log(`Hello, ${this.name}`);
  }
}

let person = new Person('Alice');
console.log(person.name); // 访问 public 属性: 输出 "Alice"
person.greet(); // 访问 public 方法: 输出 "Hello, Alice"
```

- 在上面的例子中，name 和 greet 方法都是 public，因此它们可以在类的外部直接访问。

### private 修饰符

- 访问范围：private 成员只能在声明它的类内部访问，不能被类的外部或子类访问。
- 实例化后无法访问：private 属性或方法无法在类的实例化对象外部调用。

```ts
class Car {
  private model: string;

  constructor(model: string) {
    this.model = model;
  }

  private logModel() {
    console.log(`Car model: ${this.model}`);
  }

  public showModel() {
    this.logModel(); // 类内部可以访问私有方法
  }
}

let car = new Car('Tesla');
// console.log(car.model);      // 错误: 'model' 是私有属性
// car.logModel();              // 错误: 'logModel' 是私有方法
car.showModel(); // 输出: "Car model: Tesla"
```

- 在上面的例子中，model 属性和 logModel 方法被定义为 private，它们只能在 Car 类的内部访问，不能从外部或子类中访问。

### protected 修饰符

- 访问范围：protected 成员可以在类内部和继承的子类中访问，但不能在类的实例化对象或类的外部直接访问。
- 子类可访问：子类可以继承并访问父类中的 protected 成员。

```ts
class Animal {
  protected species: string;

  constructor(species: string) {
    this.species = species;
  }

  protected makeSound() {
    console.log(`${this.species} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor() {
    super('Dog');
  }

  public bark() {
    console.log(`${this.species} barks!`); // 子类可以访问 protected 属性
    this.makeSound(); // 子类可以调用 protected 方法
  }
}

let dog = new Dog();
dog.bark(); // 输出: "Dog barks!" 和 "Dog makes a sound."
// console.log(dog.species);  // 错误: 'species' 是受保护的
```

- 在这个例子中，species 和 makeSound 都是 protected 的，它们只能在 Animal 类和继承自 Animal 的子类（如 Dog）内部使用。类的外部无法访问这些成员。

### readonly 修饰符

- 虽然 readonly 不是严格的访问修饰符，但它常用于定义只能被读取但不能被修改的属性。这种属性只能在声明时或构造函数内进行初始化，之后不可修改。

```ts
class Book {
  readonly title: string;

  constructor(title: string) {
    this.title = title;
  }

  public getTitle() {
    return this.title;
  }
}

let book = new Book('TypeScript Handbook');
console.log(book.title); // 输出: "TypeScript Handbook"
// book.title = "New Title";  // 错误: 'title' 是只读属性
```

- readonly 关键字可以与其他访问修饰符一起使用，如 public readonly 或 private readonly。

### 访问修饰符对比

| 修饰符    | 类内部访问 | 子类访问 | 类的外部访问 |
| --------- | ---------- | -------- | ------------ |
| public    | ✔          | ✔        | ✔            |
| protected | ✔          | ✔        | ✘            |
| private   | ✔          | ✘        | ✘            |
