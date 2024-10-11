# tsconfig.json 有什么作用？

- 在 TypeScript 中，tsconfig.json 文件用于配置 TypeScript 编译器（tsc）的行为。它定义了项目的编译选项、文件的包含和排除规则等信息，指导 TypeScript 编译器如何编译代码。该文件是以 JSON 格式编写的，适合项目级别的配置。

### tsconfig.json 的作用

- 配置编译选项：通过 compilerOptions 配置编译器行为，比如指定 ECMAScript 目标版本、模块系统、是否生成 source map 等。
- 文件包含和排除规则：可以通过 include 和 exclude 指定哪些文件应该被编译，哪些文件应该被忽略。
- 项目根目录的标识：如果项目目录中存在 tsconfig.json 文件，TypeScript 编译器会将其目录作为项目的根目录。

### tsconfig.json 的基本结构

```json
{
  "compilerOptions": {
    "target": "es6", // 编译后的 JavaScript 版本
    "module": "commonjs", // 模块系统（如 ES6 模块、CommonJS）
    "strict": true, // 启用所有严格类型检查选项
    "esModuleInterop": true, // 启用 ES 模块互操作性，允许默认导入 CommonJS 模块
    "outDir": "./dist", // 输出目录
    "rootDir": "./src", // 源文件的根目录
    "sourceMap": true // 生成 source maps 文件
  },
  "include": ["src/**/*"], // 包含哪些文件进行编译
  "exclude": ["node_modules", "dist"] // 排除哪些文件或目录
}
```

### tsconfig.json 中的重要配置项

1. ##### compilerOptions（编译器选项）

- target：指定编译后输出的 ECMAScript 版本。例如，es5、es6、es2020 等。
- module：指定模块系统，如 commonjs、esnext、amd 等。
- strict：启用所有的严格类型检查，包括 noImplicitAny、strictNullChecks 等。建议开启，以确保更严格的类型检查。
- esModuleInterop：启用 ES 模块和 CommonJS 模块的互操作性，允许通过 import 语法导入 CommonJS 模块。
- outDir：指定编译后文件的输出目录。
- rootDir：指定源文件的根目录，TypeScript 编译器会根据这个路径保留目录结构。
- sourceMap：是否生成 .map 文件，用于调试 TypeScript 代码。

2. #### 文件包含和排除规则

- include：定义需要编译的文件或目录。可以使用通配符来匹配文件或目录，如 "src/\*_/_" 表示包含 src 目录下的所有文件。
- exclude：指定不参与编译的文件或目录，常见的排除项包括 node_modules 和编译后的 dist 目录。

3. #### 其他常用的编译选项

- lib：指定编译时要包含的库文件。例如，lib: ["es6", "dom"] 包含 ES6 和 DOM API 的类型定义。
- declaration：生成 TypeScript 的类型声明文件（.d.ts），通常用于发布 TypeScript 库时生成类型定义文件。
- noImplicitAny：禁止在没有显式类型声明时，自动推断 any 类型。开启后，所有未明确类型的变量将引发编译错误。
- skipLibCheck：跳过对库文件（如 node_modules 中的 .d.ts 文件）的类型检查，以加快编译速度。
- baseUrl 和 paths：设置模块解析的基础路径和路径别名，便于管理大型项目中的导入路径。

```json
"compilerOptions": {
  "baseUrl": "./",
  "paths": {
    "@components/*": ["src/components/*"]
  }
}

```

### tsconfig.json 的作用总结

- 简化编译命令：无需手动为每次编译指定编译选项，可以通过 tsconfig.json 自动配置编译器。
- 组织项目文件：通过 include、exclude 以及 files 来组织项目的文件结构，使得编译器只编译所需文件。
- 提升代码质量：通过开启严格模式（如 strict、noImplicitAny 等）以及类型检查规则，提高代码的类型安全性和质量。
- 项目配置共享：多个开发者可以通过同一个 tsconfig.json 文件共享项目的编译配置，确保所有人使用一致的编译环境。
