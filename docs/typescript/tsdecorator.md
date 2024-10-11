# 请说说你对 TS 中装饰器的理解

- 在 TypeScript 中，装饰器（Decorators）是一种特殊的语法，用于在类及其成员（如属性、方法、访问器）上添加元数据或修改行为。它们可以用于函数和类的注解，也可以用于动态修改类的行为。装饰器的核心概念是在不改变类本身逻辑的前提下，增强类的功能或控制类的行为。

### 装饰器的基本概念

- 装饰器本质上是一种函数，它可以应用到类、方法、访问器、属性或者参数上。装饰器在编译时执行，并且可以访问被装饰元素的元数据，从而对其进行操作或修改。装饰器通常用于元编程、依赖注入、日志记录、权限控制等场景。

- TypeScript 中的装饰器可以应用在以下四个地方：

1. 类装饰器：作用于整个类。
2. 方法装饰器：作用于类的方法。
3. 访问器装饰器：作用于属性的 getter 和 setter。
4. 属性装饰器：作用于类的属性。
5. 参数装饰器：作用于方法的参数。

### 启用装饰器

- 在 TypeScript 中使用装饰器，首先需要在 tsconfig.json 中启用 "experimentalDecorators" 选项：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### 类装饰器

- 类装饰器用于修改或增强整个类。它的形式是接受一个类构造函数作为参数，可以返回一个新的类或修改类的行为。

```ts
// 定义一个简单的类装饰器
function Logger(constructor: Function) {
  console.log(`Creating new instance of ${constructor.name}`);
}

@Logger
class Person {
  constructor(public name: string) {}
}

// 创建一个 Person 实例，触发装饰器
const john = new Person('John');
```

- 在上面的例子中，@Logger 是一个装饰器，它记录了类的创建过程。在 Person 类上应用了 @Logger 装饰器后，每当实例化这个类时，控制台都会输出类名。

### 方法装饰器

- 方法装饰器用于修改或增强类的方法。它接收三个参数：类的原型、方法的名称以及方法的属性描述符。通过装饰器，可以修改方法的行为或属性描述符。

```ts
// 定义一个方法装饰器
function LogMethod(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(
      `Calling ${propertyName} with arguments: ${JSON.stringify(args)}`,
    );
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // 输出: Calling add with arguments: [2,3]
```

- 在这个例子中，@LogMethod 是一个方法装饰器，它拦截了 add 方法的调用并记录了参数信息，之后再执行原始方法逻辑。

### 访问器装饰器

- 访问器装饰器用于装饰类的 getter 或 setter 方法。它与方法装饰器类似，但只能用于访问器。

```ts
// 定义一个访问器装饰器
function CheckAge(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
) {
  const originalSetter = descriptor.set;

  descriptor.set = function (value: number) {
    if (value < 0) {
      throw new Error('Age cannot be negative');
    }
    originalSetter?.call(this, value);
  };
}

class User {
  private _age: number = 0;

  @CheckAge
  set age(value: number) {
    this._age = value;
  }

  get age(): number {
    return this._age;
  }
}

const user = new User();
user.age = 25; // 正常设置
// user.age = -5;  // 抛出错误: Age cannot be negative
```

- 在这个例子中，@CheckAge 是一个访问器装饰器，它确保年龄不能设置为负数。

### 属性装饰器

- 属性装饰器用于类的属性，主要用于元数据的记录，不能修改属性的行为。属性装饰器接收两个参数：类的原型和属性名称。

```ts
// 定义一个属性装饰器
function ReadOnly(target: any, propertyKey: string) {
  console.log(`Setting up property: ${propertyKey}`);
}

class Car {
  @ReadOnly
  model: string;

  constructor(model: string) {
    this.model = model;
  }
}
```

- 在上面的例子中，@ReadOnly 是一个属性装饰器，它不能改变属性本身的行为，但可以记录属性的元数据或添加其他额外逻辑。

### 参数装饰器

- 参数装饰器用于装饰方法的参数，它接收三个参数：类的原型、方法名以及参数的位置索引。参数装饰器通常用于依赖注入等场景。

```ts
// 定义一个参数装饰器
function LogParam(target: any, propertyKey: string, parameterIndex: number) {
  console.log(
    `Parameter of ${propertyKey} at index ${parameterIndex} is being decorated`,
  );
}

class CarService {
  getCar(@LogParam carId: number) {
    console.log(`Fetching car with ID: ${carId}`);
  }
}

const service = new CarService();
service.getCar(123); // 输出: Parameter of getCar at index 0 is being decorated
```

- 在这个例子中，@LogParam 是一个参数装饰器，用于记录方法参数的信息。

### 装饰器工厂

- 装饰器工厂是一个返回装饰器的函数，可以接受参数，从而让装饰器更加灵活。

```ts
// 定义一个装饰器工厂
function Log(message: string) {
  return function (constructor: Function) {
    console.log(message);
  };
}

@Log('Logging for the User class')
class User {
  constructor(public name: string) {}
}
```

- 在这个例子中，@Log('Logging for the User class') 是一个装饰器工厂，它允许传递参数，灵活控制装饰器的行为。

### 装饰器的应用场景

- 依赖注入：装饰器常用于标注类的依赖关系，便于自动注入。
- 权限控制：可以在方法级别添加权限验证逻辑。
- 日志记录：通过装饰器对类或方法的调用进行日志记录。
- 元数据管理：可以使用装饰器为类添加元数据，用于框架或库的扩展。

### 总结

- 装饰器 是 TypeScript 中的一种增强功能，可以为类和类的成员添加元数据或修改其行为。
- 它可以应用在类、方法、属性、访问器、参数上，并通过函数的形式实现。
- 装饰器工厂 提供了更灵活的方式，通过函数传参控制装饰器行为。
- 常见的使用场景包括：依赖注入、日志记录、权限控制、元数据注解等。
