# 如何定义、导入和导出模块

- 在 TypeScript 中，模块化是一个重要的概念，它使得代码组织、重用和维护变得更加容易。以下是如何在 TypeScript 中定义、导入和导出模块的详细说明。

### 定义模块

- 在 TypeScript 中，每个文件都是一个模块。要定义模块，只需在一个文件中定义变量、函数、类等，然后通过导出这些元素使它们在其他文件中可用。

```ts
// mathUtils.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// 也可以导出类、接口等
export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}
```

### 导出模块

- 在 TypeScript 中，有两种导出方式：命名导出和默认导出。

1. ##### 命名导出

- 命名导出允许你导出多个变量或函数。

```ts
// user.ts
export const name = 'John Doe';
export const age = 30;

export function greet() {
  console.log(`Hello, ${name}`);
}
```

2. ##### 默认导出

- 默认导出用于导出一个模块的主要内容，每个模块只能有一个默认导出。

```ts
// logger.ts
export default function log(message: string): void {
  console.log(message);
}
```

### 导入模块

- 在其他文件中，可以使用 import 语句导入模块中导出的内容。

```ts
// main.ts
import { add, subtract, Calculator } from './mathUtils';

const sum = add(5, 3);
console.log(`Sum: ${sum}`);

const calculator = new Calculator();
console.log(`Product: ${calculator.multiply(4, 5)}`);
```

### 模块解析

- TypeScript 允许使用不同的模块解析策略。在 tsconfig.json 中，可以配置模块解析方式，例如：

```json
{
  "compilerOptions": {
    "module": "commonjs", // 可选值: "commonjs", "esnext", "amd", "umd", "system", "es6" 等
    "target": "es6"
  }
}
```
