# 如何在 WebGL 中编写并编译着色器？

在 WebGL 中，编写并编译着色器（Shader）是渲染图形的重要步骤。着色器是使用 GLSL（OpenGL Shading Language）编写的代码，包含两种类型：**顶点着色器**和**片元着色器**。每种着色器需要编写、编译并链接到 WebGL 程序中。

## WebGL 着色器编写与编译的基本步骤

1. **编写 GLSL 代码**：编写顶点着色器和片元着色器的 GLSL 代码。
2. **创建着色器对象**：使用 `gl.createShader` 创建 WebGL 着色器对象。
3. **设置着色器源码**：通过 `gl.shaderSource` 将 GLSL 代码绑定到着色器对象。
4. **编译着色器**：使用 `gl.compileShader` 编译着色器源码。
5. **检查编译状态**：检查编译是否成功，如失败则输出错误日志。
6. **创建和链接 WebGL 程序**：将顶点着色器和片元着色器链接到一个 WebGL 程序中。

### 示例：顶点着色器和片元着色器代码

```javascript
// 顶点着色器代码
const vertexShaderSource = `
    attribute vec4 a_Position; // 接收顶点位置
    void main() {
        gl_Position = a_Position; // 设置顶点位置
    }
`;

// 片元着色器代码
const fragmentShaderSource = `
    precision mediump float; // 指定浮点数精度
    uniform vec4 u_Color; // 接收片元颜色
    void main() {
        gl_FragColor = u_Color; // 设置片元颜色
    }
`;
```

## 详细步骤代码示例

### 1. 创建着色器对象并设置源码

```js
function createShader(gl, type, source) {
  const shader = gl.createShader(type); // 创建着色器
  gl.shaderSource(shader, source); // 设置着色器源码
  gl.compileShader(shader); // 编译着色器

  // 检查编译是否成功
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('着色器编译错误:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader); // 删除着色器
    return null;
  }
  return shader;
}

// 创建顶点着色器和片元着色器
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource,
);
```

### 2. 创建 WebGL 程序并链接着色器

```js
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram(); // 创建 WebGL 程序
  gl.attachShader(program, vertexShader); // 附加顶点着色器
  gl.attachShader(program, fragmentShader); // 附加片元着色器
  gl.linkProgram(program); // 链接程序

  // 检查链接状态
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('程序链接错误:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// 创建并链接 WebGL 程序
const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program); // 使用链接好的程序
```

### 3. 设置顶点和片元数据并启动绘制

```js
// 获取属性和 uniform 变量位置
const positionLocation = gl.getAttribLocation(program, 'a_Position');
const colorLocation = gl.getUniformLocation(program, 'u_Color');

// 创建顶点缓冲区并传入数据
const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]),
  gl.STATIC_DRAW,
);

// 启用顶点属性并设置指针
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

// 设置片元颜色
gl.uniform4f(colorLocation, 1.0, 0.0, 0.0, 1.0); // 设置为红色

// 绘制三角形
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

## 总结

在 WebGL 中编写并编译着色器的步骤包括：

- 编写 GLSL 代码。
- 创建、设置源码并编译着色器。
- 创建并链接 WebGL 程序。
- 使用编译后的程序渲染图形。
