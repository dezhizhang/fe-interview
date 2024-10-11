# 在 TS 中 Omit 类型有什么作用

- 在 TypeScript 中，Omit 是一个内置的工具类型，用于从一个类型中排除一个或多个指定的属性。它可以帮助我们创建新的类型，同时避免重复定义类似的结构，并且能够灵活地排除不需要的属性。

### Omit 的定义

- Omit<T, K> 的基本结构是：

1. T：表示源类型。
2. 表示要从 T 中排除的属性名，可以是单个属性或属性的联合类型。

- Omit<T, K> 实际上是基于 Pick 和 Exclude 组合的工具类型，它从类型 T 中排除 K 中指定的属性，并返回一个新的类型。

### 如何使用 Omit

- 假设我们有一个接口 User，但是我们想要创建一个新类型，其中不包含某些属性，比如 age。

```ts
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type UserWithoutAge = Omit<User, 'age'>;

const user: UserWithoutAge = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  // age: 25  // 错误：`age` 属性已被 Omit 排除
};
```

- UserWithoutAge 是基于 User 类型的新类型，但通过 Omit 排除了 age 属性。
- 当你创建 user 对象时，不能再包含 age 属性。

### 排除多个属性

- Omit 允许你排除多个属性，方式是将属性名以联合类型的方式传入。

```ts
type UserWithoutAgeAndEmail = Omit<User, 'age' | 'email'>;

const user: UserWithoutAgeAndEmail = {
  id: 1,
  name: 'Bob',
  // age: 30,      // 错误：`age` 属性已被 Omit 排除
  // email: "bob@example.com"  // 错误：`email` 属性已被 Omit 排除
};
```

- 在这个例子中，UserWithoutAgeAndEmail 是一个基于 User 类型的新类型，但 age 和 email 属性都被排除了。

### Omit 的实际应用场景

- 删除敏感信息：假设你在处理用户数据时，不希望某些敏感信息（例如密码、身份信息等）暴露出来，Omit 可以帮助你排除这些属性。
- 创建简化的类型：在表单或者视图中，可能你只需要一部分类型信息，而 Omit 可以帮助你从一个大型类型中移除不需要的部分。
- 扩展已有的类型：如果你要基于某个类型进行修改，而不想重复定义，可以用 Omit 来创建新类型，然后再做额外扩展。

```ts
interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

type PublicUserInfo = Omit<FullUser, 'password'>;

const publicUser: PublicUserInfo = {
  id: 1,
  name: 'Charlie',
  email: 'charlie@example.com',
  age: 28,
  // password: "secret"  // 错误：`password` 属性已被 Omit 排除
};
```

- 在这个示例中，PublicUserInfo 类型基于 FullUser，但移除了敏感的 password 属性，因此在暴露给外部时，不会泄露密码。

### Omit 与 Pick 的对比

- Omit：从一个类型中排除指定的属性。
- Pick：从一个类型中选择指定的属性。
- Omit<User, 'age'> 会返回一个 User 类型，排除掉 age。
- Pick<User, 'name' | 'email'> 则返回只包含 name 和 email 的类型。

### 总结

- Omit 是 TypeScript 的一个工具类型，用于从已有类型中排除一个或多个属性。
- 通过 Omit<T, K>，你可以灵活创建新类型，尤其适用于从复杂类型中剥离不必要或敏感的属性。
- 它与 Pick 相反，一个用于排除属性，另一个用于选择属性。
