# Three.js 中的 `Material` 有哪些种类？

在 Three.js 中，`Material` 类是定义 3D 物体外观的关键部分，决定了物体的颜色、表面效果、光照响应等特性。Three.js 提供了多种类型的材质，每种材质适用于不同的渲染需求。以下是一些常见的 `Material` 类型及其特点。

## 1. `MeshBasicMaterial`

- **简介**：`MeshBasicMaterial` 是最简单的材质，它不会受到光照的影响，因此它总是保持一个固定的颜色或纹理。适用于不需要光照影响的物体，如背景、UI 元素等。
- **用途**：常用于不可见的背景、纹理绘制或调试。
- **特点**：
  - 不响应光照。
  - 性能开销较小。
  - 适用于平面图像或简单的物体。

```javascript
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
```

## 2. MeshLambertMaterial

- 简介：MeshLambertMaterial 是一个基础的漫反射材质，适用于较为简单的光照计算。它模拟了物体表面的光照与反射，常用于不需要高级光照效果的物体。
- 用途：适用于非高光、非镜面反射的场景。
  特点：
- 适用于较为简单的光照模型。
- 无镜面高光。
- 性能较好，适合大多数常见场景。

```javascript
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
```

## 3. MeshPhongMaterial

- 简介：MeshPhongMaterial 允许更复杂的光照计算，支持高光反射效果。它使用 Phong 模型计算镜面反射和漫反射，适用于表现光泽表面（如金属、塑料等）。
- 用途：用于模拟具有高光和反射的表面，如金属、光滑表面等。
  特点：
- 支持镜面高光。
- 支持光照和反射效果。
- 性能相对较高，但比 MeshLambertMaterial 要慢。

```javascript
const material = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  shininess: 30,
});
```

## 4. MeshStandardMaterial

- 简介：MeshStandardMaterial 是基于物理渲染（PBR, Physically Based Rendering）模型的材质，适用于高质量的渲染，能够更真实地模拟光照与物体表面之间的交互。它可以模拟物体的金属度、粗糙度等物理属性。
- 用途：适用于现代高质量渲染，常用于游戏、虚拟现实（VR）和高保真渲染应用。
  特点：
- 基于 PBR 模型，支持更高质量的渲染效果。
- 支持金属度和粗糙度参数，能够模拟更真实的光照反应。
- 适合现代渲染引擎，支持实时全局光照。

```javascript
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  metalness: 0.5,
  roughness: 0.5,
});
```

## 5. MeshPhysicalMaterial

- 简介：MeshPhysicalMaterial 是 MeshStandardMaterial 的扩展，增加了更多的物理属性，比如清晰度、透明度、折射等。适用于更复杂的渲染需求，如透明材质、水面、玻璃等。
- 用途：适用于需要高度物理准确性的场景，如玻璃、水面、镜面效果等。
  特点：
- 提供更详细的物理属性，支持透明度、折射等效果。
- 适用于复杂的物理效果，如折射和透明材质。
- 性能相对较高，但比 MeshStandardMaterial 要重。

```javascript
const material = new THREE.MeshPhysicalMaterial({
  color: 0x00ff00,
  metalness: 0.5,
  roughness: 0.5,
  transmission: 1, // 玻璃效果
  thickness: 0.1, // 玻璃厚度
});
```

## 6. MeshToonMaterial

- 简介：MeshToonMaterial 是一种适用于卡通渲染风格的材质，具有基于灯光的渐变色，常用于制作卡通渲染效果。
- 用途：适用于动画、卡通风格的场景。
  特点：
- 支持卡通渲染效果。
- 简化的光照模型，呈现平滑的颜色渐变。
- 可以创建色块清晰的风格，避免过度的光照计算。

```javascript
const material = new THREE.MeshToonMaterial({ color: 0x00ff00 });
```

## 7. LineBasicMaterial

- 简介：LineBasicMaterial 是一种用于线条的材质，通常用于渲染简单的线条或路径。
- 用途：适用于绘制 3D 线条、路径或边框。
  特点：
- 用于渲染线条，不适用于渲染固体物体。
- 支持颜色、透明度、线宽等属性。

```javascript
const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
```

## 8. LineDashedMaterial

- 简介：LineDashedMaterial 是一种用于渲染虚线的材质，扩展自 LineBasicMaterial，可以用于渲染分隔线或样式化的路径。
- 用途：适用于虚线、轮廓等效果。
  特点：
- 支持虚线模式，可以控制虚线的长度和间隔。
- 适用于需要分隔的线条或标记。

```javascript
const material = new THREE.LineDashedMaterial({
  color: 0x00ff00,
  dashSize: 3,
  gapSize: 1,
});
```

## 9. PointsMaterial

- 简介：PointsMaterial 用于渲染点（例如粒子效果）。可以设置点的大小、颜色、透明度等属性。
- 用途：适用于粒子系统、星空背景、烟雾等效果。
  特点：
- 用于渲染粒子和点。
- 支持点的颜色、大小和透明度设置。

```javascript
const material = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.1 });
```

## 10. ShaderMaterial

- 简介：ShaderMaterial 允许你使用自定义的 GLSL 着色器代码来创建材质。这为开发者提供了最大的灵活性，可以实现任何自定义的效果。
- 用途：适用于需要完全自定义渲染效果的场景，如特殊的视觉效果、后期处理等。
  特点：
- 允许自定义顶点着色器和片元着色器。
- 可以实现任何自定义的渲染效果。

```javascript
const material = new THREE.ShaderMaterial({
  vertexShader: `...`,
  fragmentShader: `...`,
});
```

总结

## Three.js 提供了多种类型的 Material，每种材质适用于不同的场景需求。常见的材质类型包括：

- MeshBasicMaterial：适用于不受光照影响的物体。
- MeshLambertMaterial：适用于简单的光照效果。
- MeshPhongMaterial：适用于有高光反射的物体。
- MeshStandardMaterial：基于物理渲染的现代材质，适用于高质量渲染。
- MeshPhysicalMaterial：扩展的物理材质，适用于透明或折射材质。
- MeshToonMaterial：卡通渲染材质，适用于卡通风格。
- LineBasicMaterial 和 LineDashedMaterial：用于渲染线条和虚线。
- PointsMaterial：用于渲染粒子系统。
- ShaderMaterial：完全自定义的着色器材质。
