# Three.js 中的 `BufferGeometry` 和 `Geometry` 有何区别？

在 Three.js 中，`BufferGeometry` 和 `Geometry` 都是用于表示 3D 物体的几何形状的类。它们之间有一些关键的区别，主要体现在性能和存储方式上。随着 Three.js 的发展，`BufferGeometry` 被推荐为更高效和现代的几何体表示方式，逐渐取代了 `Geometry`。

## 1. `Geometry` 和 `BufferGeometry` 的概述

- **`Geometry`**：是 Three.js 中早期的几何体类，它用于存储物体的顶点信息、面、法线、纹理坐标等。`Geometry` 是面向对象的方式，每个顶点、面和属性都会存储为独立的数组或对象，适合小型场景。
- **`BufferGeometry`**：是 Three.js 的最新几何体类，旨在提供更高效的性能，尤其是对于大型场景和复杂模型。它采用了 `TypedArray` 进行存储，数据更加紧凑，并通过 WebGL 高效传输。`BufferGeometry` 是面向数据的，通常用于高性能渲染。

## 2. 存储方式的区别

### 2.1 `Geometry` 的存储方式

`Geometry` 使用传统的面向对象的方式存储顶点、面等信息。每个顶点、面以及其他属性（如法线、颜色、纹理坐标）都作为数组或对象存储。

- 顶点数据（Position）：一个普通的 JavaScript 数组。
- 面数据（Faces）：一个包含三角形面的数组，每个面是一个包含三个顶点索引的数组。
- 法线和纹理坐标：分别是每个顶点的法线向量和纹理坐标。

这种存储方式适合于小型的、静态的几何体，但在处理大量顶点或复杂模型时会出现性能瓶颈。

### 2.2 `BufferGeometry` 的存储方式

`BufferGeometry` 使用 `TypedArray` 存储数据，这使得它能够更高效地与 WebGL 通信。`TypedArray` 是一种高效的数组存储方式，在内存中占用更少的空间，且可以快速传输到 GPU。

- 顶点数据、法线、颜色和纹理坐标等都作为缓冲区存储（`Float32Array` 等）。
- 顶点、法线、面、纹理坐标等属性被存储在不同的缓冲区中，减少了冗余数据的存储，提高了性能。

这种存储方式更适合用于处理复杂的动态场景或大规模的几何体。

## 3. 性能差异

- **`Geometry`**：由于其面向对象的存储方式和 JavaScript 数组的使用，`Geometry` 会占用更多的内存，并且在渲染复杂场景时，性能较差。
- **`BufferGeometry`**：通过 `TypedArray` 和缓冲区的方式，`BufferGeometry` 更加高效，能够显著减少内存占用，提升渲染性能，尤其是在处理大量顶点和动态几何体时。

## 4. 使用上的差异

### 4.1 `Geometry` 的创建

```javascript
const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(0, 0, 0));
geometry.vertices.push(new THREE.Vector3(1, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 1, 0));

geometry.faces.push(new THREE.Face3(0, 1, 2));
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

### 4.2 BufferGeometry 的创建

```javascript
const geometry = new THREE.BufferGeometry();

// 定义顶点数据
const vertices = new Float32Array([
  0,
  0,
  0, // 顶点1
  1,
  0,
  0, // 顶点2
  0,
  1,
  0, // 顶点3
]);

// 创建属性缓冲区并添加到 geometry 中
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

## 5. 为什么 BufferGeometry 更好？

- 内存效率：BufferGeometry 使用 TypedArray 存储顶点数据，比 Geometry 更加紧凑和高效。
- 性能优化：BufferGeometry 的数据结构更加适合 GPU 渲染，减少了传输的数据量，并提高了性能。
- WebGL 支持：BufferGeometry 直接与 WebGL 的渲染管线对接，更加高效。
- 适应复杂场景：BufferGeometry 可以处理大量顶点、面和动画，是处理复杂 3D 场景的理想选择。

## 6. 总结

- Geometry 是 Three.js 中的传统几何体类，适合小型、静态的场景，但在性能上存在瓶颈。
- BufferGeometry 是现代的几何体类，使用 TypedArray 存储数据，适合处理大规模或动态的 3D 场景，并且性能更高，内存占用更小。
- 三星官方推荐在 Three.js 项目中使用 BufferGeometry，特别是在需要优化性能时。
