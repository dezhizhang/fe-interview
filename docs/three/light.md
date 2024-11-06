# Three.js 中的光源类型

在 Three.js 中，光源是渲染 3D 场景的基础，它们影响着物体的颜色、亮度和阴影效果。Three.js 提供了几种常见的光源类型，每种类型具有不同的特性和用途。以下是 Three.js 中常用的光源类型：

## 1. **AmbientLight（环境光）**

- **作用**：环境光是全局均匀的光源，能够照亮场景中的所有物体。它没有方向性，所有物体都受到相同强度的照亮。
- **特点**：不产生阴影，光照强度均匀。
- **使用场景**：用于模拟大气光照效果或基础光照。

```javascript
const ambientLight = new THREE.AmbientLight(0x404040, 1); // 灰色环境光，强度为 1
scene.add(ambientLight);
```

## 2. DirectionalLight（定向光）

- 作用：定向光模拟来自远距离的平行光线，光线具有方向性，因此可以产生阴影。它的光源位置在场景中并不重要，重要的是它的光照方向。
- 特点：光线是平行的，适用于模拟太阳光或远处的光源。
- 使用场景：适用于阳光、月光等照明效果。

```js
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色定向光，强度为 1
directionalLight.position.set(5, 5, 5); // 设置光源位置
scene.add(directionalLight);
```

## 3. PointLight（点光源）

- 作用：点光源从一个点发出，光线向四周扩散。随着距离的增加，光线强度会衰减。点光源通常用于模拟灯泡、火把等局部光源。
- 特点：光线向各个方向发散，光强度会随距离衰减，可以产生阴影。
- 使用场景：适用于模拟小范围的光源，如灯泡、蜡烛等。

```javascript
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // 白色点光源，强度为 1，最大有效距离为 100
pointLight.position.set(10, 10, 10); // 设置光源位置
scene.add(pointLight);
```

### 4. SpotLight（聚光灯）

- 作用：聚光灯模拟集中照射的光源，像一个聚焦的圆锥形光束。聚光灯有一个光束角度和衰减范围，常用于舞台照明或突出显示某个物体。
- 特点：可以设置光束角度、衰减和阴影。适合需要聚焦照射的场景。
- 使用场景：用于模拟舞台灯光、手电筒等光源。

```javascript
const spotLight = new THREE.SpotLight(0xffffff, 1); // 白色聚光灯，强度为 1
spotLight.position.set(10, 10, 10); // 设置光源位置
spotLight.angle = Math.PI / 4; // 设置光束的角度
spotLight.penumbra = 0.1; // 设置边缘模糊度
scene.add(spotLight);
```

## 5. HemisphereLight（半球光）

作用：半球光模拟从上方向下发出的光源。它具有两个颜色，一个来自上半球（天顶），另一个来自下半球（地面）。通常用于模拟自然的环境光。
特点：具有上下不同的光照强度，常用于模拟天空和地面之间的光照差异。
使用场景：适用于模拟日光或环境光效果。

```javascript
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // 白色天空光，暗灰色地面光，强度为 1
scene.add(hemisphereLight);
```

## 6. LightProbe（光探针）

- 作用：光探针是一种高级光源，用于模拟环境中的光照。它能够采样周围的环境光，提供全方位的照明效果。
- 特点：常与 PBR（物理渲染）材料结合使用，适用于真实感强的渲染。
- 使用场景：用于高质量的全局照明和反射效果。

```javascript
const lightProbe = new THREE.LightProbe();
scene.add(lightProbe);
```

## 7. RectAreaLight（矩形区域光）

- 作用：矩形区域光源是一种矩形的平面光源，适用于模拟长方形灯管等光源。它在 PBR 渲染中非常常见。
- 特点：可以模拟更自然的光照效果，适用于大面积的光源。
- 使用场景：用于模拟大面积的人工光源。

```javascript
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 1, 10, 10); // 白色矩形区域光，强度为 1，长宽为 10
rectAreaLight.position.set(10, 10, 10); // 设置光源位置
scene.add(rectAreaLight);
```

## 总结

- AmbientLight：用于全局均匀照亮场景，无法产生阴影。
- DirectionalLight：模拟来自远方的平行光，具有方向性，能产生阴影。
- PointLight：从一点发出并向四周扩散，适用于模拟小范围的光源。
- SpotLight：聚焦的光束，适用于局部照明效果。
- HemisphereLight：模拟自然环境的上下光照，适合日光或天空光照。
- LightProbe：高级全局照明工具，适用于反射和环境光。
- RectAreaLight：矩形区域光源，适用于大面积的均匀光照。
