# Three.js 中的 `AnimationMixer`

在 Three.js 中，`AnimationMixer` 是用于管理和控制动画的核心对象，它可以处理多个动画剪辑（`AnimationClip`）并将它们应用于一个或多个 3D 对象上。`AnimationMixer` 允许你实现复杂的动画逻辑，例如动画的播放、暂停、混合、切换等。

## 1. `AnimationMixer` 的基本概念

`AnimationMixer` 是 Three.js 提供的一种机制，用于控制多个动画剪辑的播放。它可以绑定到一个对象上，并通过 `AnimationClip` 来控制该对象的动画。一个对象（如 `Mesh` 或 `Skeleton`）可以同时有多个动画剪辑，它们可以在不同的时间播放，甚至可以混合在一起。

## 2. `AnimationMixer` 的创建

通常，`AnimationMixer` 是在加载 3D 模型后创建的。当你使用 `GLTFLoader` 加载模型时，模型中通常会包含多个动画剪辑。你可以从这些剪辑中选择并创建一个 `AnimationMixer`。

```javascript
const mixer = new THREE.AnimationMixer(model); // 绑定到模型上
```

## 3. AnimationClip 和 AnimationMixer

- AnimationClip 是包含具体动画数据的对象，例如一个角色的跑步动画，或者物体的旋转动画。
- AnimationMixer 通过控制这些 AnimationClip 来播放和调整动画。
- 创建动画剪辑（AnimationClip）

```javascript
const clip = new THREE.AnimationClip('run', -1, [
  new THREE.KeyframeTrack('.position', [0, 1], [0, 10, 0, 0, 0, 10]),
]);
```

### 创建并使用 AnimationMixer

```javascript
const mixer = new THREE.AnimationMixer(mesh);
mixer.clipAction(clip).play();
```

## 4. AnimationMixer 的方法

- AnimationMixer 提供了多种方法来控制动画的播放和混合：

- clipAction(clip)：获取指定的 AnimationClip 对应的 AnimationAction，并返回它。这是控制动画的核心方法。
- update(deltaTime)：更新 AnimationMixer，通常在每一帧调用，用来根据时间推进动画。
- stopAllAction()：停止所有动画。
- setTime(time)：将 AnimationMixer 的时间设置为指定的时间，适用于控制动画播放的进度。
- getRoot()：获取动画控制的根对象。
  示例

```javascript
// 创建一个动画混合器并绑定到对象上
const mixer = new THREE.AnimationMixer(mesh);

// 获取动画剪辑的动作并播放
const action = mixer.clipAction(clip);
action.play();

// 在每一帧更新动画
function animate() {
  requestAnimationFrame(animate);
  const deltaTime = clock.getDelta(); // 获取帧间隔时间
  mixer.update(deltaTime); // 更新动画
  renderer.render(scene, camera);
}

animate();
```

## 5. AnimationAction 和 AnimationMixer 的交互

AnimationAction 是从 AnimationClip 获取的对象，用于控制该动画的具体播放行为。每个 AnimationAction 都有自己的状态（如播放、暂停、混合等）。AnimationMixer 负责更新并执行这些 AnimationAction。

### 控制动画播放的例子

```javascript
const action = mixer.clipAction('run'); // 获取"run"动画的动作
action.play(); // 播放动画
action.setLoop(THREE.LoopRepeat, Infinity); // 设置动画循环播放
```

## 6. 动画混合

AnimationMixer 允许将多个动画混合在一起，这对于制作过渡效果（如从行走到跑步）非常有用。通过设置 crossFadeTo 方法，可以平滑地过渡两个动画剪辑。

示例：混合两个动画

```javascript
const action1 = mixer.clipAction('walk');
const action2 = mixer.clipAction('run');

// 混合动画，过渡持续1秒
action1.fadeOut(1);
action2.fadeIn(1);
action2.play();
```

## 7. 结束语

AnimationMixer 是 Three.js 中强大的动画控制工具，允许开发者在 3D 场景中创建、管理和控制动画。通过与 AnimationClip 和 AnimationAction 配合使用，AnimationMixer 提供了高效、灵活的动画播放、暂停、过渡和混合功能。

## 常用方法总结：

clipAction(clip)：获取动画剪辑的动作。
play()：播放动画。
pause()：暂停动画。
fadeIn(duration)：渐变地播放动画。
fadeOut(duration)：渐变地停止动画。
update(deltaTime)：在每一帧调用，更新动画进度。
