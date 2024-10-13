# ES module、export、import 的作用 分别有什么作用？

- 在 JavaScript 的 ES6 模块化系统 中，module、export 和 import 各自发挥着特定的作用。它们共同构建了模块化的基础，方便开发者分割代码、复用功能、组织项目。

### Module（模块）

- module 代表一个独立的代码单元或文件。在 JavaScript 中，每个文件都可以视为一个模块。模块有自己的作用域，模块中的变量、函数、类等内容默认是私有的，除非显式通过 export 导出。
- 模块化的作用是帮助代码进行分离和组织，避免全局命名空间污染，使代码更易于维护。
- 每个模块可以导出所需的内容，并通过 import 语句在其他模块中使用。
- 独立作用域：模块中的变量和函数不会污染全局作用域
- 封装：模块只暴露出导出的内容，其他部分保持私有

### Export（导出）

- export 用于将模块内的变量、函数、类等内容暴露出去，使其他模块可以导入并使用这些内容。
- export 有两种主要形式：命名导出（Named Export） 和 默认导出（Default Export）。

```js
//命名导出允许导出多个值，每个导出都带有自己的名称，导入时需要通过相同的名称引用。
export const PI = 3.14159;
export function add(x, y) {
  return x + y;
}

// 每个模块只能有一个默认导出，通常用于导出模块的主要功能。导入时可以使用任何名称来引用。
export default function () {
  return 'I am the default export';
}
```

### Import（导入）

- import 用于从其他模块中引入通过 export 导出的内容，以便在当前模块中使用。可以从多个模块导入内容，也可以根据需要按需导入。

```js
// 命名导入必须使用与导出的名称匹配的标识符，或使用 as 进行重命名。
import { PI, add as sum } from './module.js';
console.log(PI); // 3.14159
console.log(sum(2, 3)); // 5

// 导入默认导出时，可以自由命名导入的内容。
import myDefaultFunc from './module.js';
console.log(myDefaultFunc()); // 'I am the default export'

// 导入所有内容
// 可以使用 * as 语法将所有导出的内容作为一个对象整体导入。
import * as math from './module.js';
console.log(math.PI); // 3.14159
console.log(math.add(2, 3)); // 5
```

### 总结

- module：每个文件都是一个模块，模块有独立的作用域，可以封装代码。
- export：用于从模块中导出内容，暴露给其他模块使用，分为命名导出和默认导出。
- import：用于从其他模块中导入通过 export 暴露出来的内容，允许模块之间共享功能。
