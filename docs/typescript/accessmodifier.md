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

