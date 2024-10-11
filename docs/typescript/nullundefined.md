# null 与 undefined 有什么区别？

- 在 TypeScript 中，null 和 undefined 是两种不同的原始数据类型，它们在表示缺失值或未定义值时有着不同的含义和用途。

### null

- 是一个表示**“无值”或“空值”**的特殊对象
- 它通常用于表示一个变量已被显式赋值为无效或空

### undefined

- undefined 是一个表示**“未定义”**的特殊类型，表示变量已经声明，但尚未赋值
- 当你访问一个未初始化的变量或对象属性时，会得到 undefined

### 类型

- null 的类型是 null。
- undefined 的类型是 undefined。

### 用法和场景

- null 通常用于函数的返回值或对象属性，表示该属性或返回值明确为空。

```ts
let user: { name: string; age: number | null } = { name: 'John', age: null };
```

- undefined 多用于变量尚未初始化的情况，或对象中不存在某个属性

```ts
function example() {
  // 没有返回值
}

const result = example(); // result 是 undefined
```

### 相等性比较

```ts
console.log(null == undefined); // 输出: true
console.log(null === undefined); // 输出: false
```

### 总结

- null 表示**“无值”**，通常用于表示一个变量被显式赋值为空。
- undefined 表示**“未定义”**，用于表示变量已声明但尚未赋值。
- 在相等性比较中，null 和 undefined 在 == 比较时相等，但在 === 比较时不相等。
- 使用 strictNullChecks 选项时，你可以控制 null 和 undefined 是否可赋值给其他类型，从而增强代码的类型安全性。
