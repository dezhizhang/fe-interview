# WebGL 中 `drawArrays` 和 `drawElements` 的区别

在 WebGL 中，`drawArrays` 和 `drawElements` 是两种用于绘制图形的函数，它们都可以将顶点数据传输给 GPU，但使用方式和适用场景不同。

## 1. `drawArrays`

- **使用方式**：`gl.drawArrays(mode, first, count)`
- **作用**：根据顶点缓冲区中存储的数据直接绘制图形。
- **参数**：
  - `mode`：绘图模式，例如 `gl.TRIANGLES`、`gl.LINES` 等。
  - `first`：从缓冲区的第几个顶点开始绘制。
  - `count`：要绘制的顶点数量。
- **适用场景**：适合绘制没有顶点重复的简单图形，例如一个独立的三角形或一个四边形。
- **特点**：`drawArrays` 直接从缓冲区顺序读取顶点数据，每个顶点在绘制中只能使用一次。

**示例**：

```javascript
// 设置顶点数据（绘制一个三角形）
const vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5]);

// 将顶点数据传入缓冲区
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 绘制三角形
gl.drawArrays(gl.TRIANGLES, 0, 3);
```

### 2. drawElements

- 使用方式：gl.drawElements(mode, count, type, offset)
- 作用：根据索引缓冲区（ELEMENT_ARRAY_BUFFER）中定义的顶点索引顺序绘制图形。  
  参数：
- mode：绘图模式，例如 gl.TRIANGLES、gl.LINES 等。
- count：要绘制的顶点索引数。
- type：索引数据的类型，通常为 gl.UNSIGNED_SHORT。
- offset：索引缓冲区中的起始位置。
- 适用场景：适合绘制包含重复顶点的复杂图形，如立方体或多边形。
- 特点：drawElements 通过索引来访问顶点数据，允许多个图形共享同一个顶点，从而减少顶点数据的冗余，提高渲染效率。

```js
// 设置顶点数据（定义一个正方形的顶点）
const vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5]);

// 设置顶点索引（定义正方形的两个三角形）
const indices = new Uint16Array([
  0,
  1,
  2, // 第一个三角形
  2,
  3,
  0, // 第二个三角形
]);

// 传入顶点数据
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 传入索引数据
const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

// 使用索引缓冲区绘制正方形
gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
```

## 总结

| 特性     |               drawArrays               | drawElements                             |
| :------- | :------------------------------------: | ---------------------------------------- |
| 数据来源 |               顶点缓冲区               | 顶点缓冲区 + 索引缓冲区                  |
| 数据冗余 |          每个顶点需要定义一次          | 重复顶点可通过索引复用                   |
| 适用场景 |       简单图形或顶点无重复的图形       | 复杂图形，顶点重复较多的模型             |
| 性能     | 简单图形效率高，但数据量较大时不够高效 | 通过索引复用顶点，节省内存，提高渲染效率 |

drawArrays 适用于简单的、没有重复顶点的图形，而 drawElements 更适合复杂的模型和具有重复顶点的结构，如立方体。drawElements 通过索引复用顶点数据，可以显著减少内存消耗，提高渲染效率。
