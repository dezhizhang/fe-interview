# 使用 Node.js 计算图片的 MD5 哈希值

在 Node.js 中，计算文件（如图片）的 MD5 哈希值，可以使用内置的 `crypto` 模块来实现。以下是一个简单的代码示例，演示如何计算图片文件的 MD5 哈希值。

## 代码实现

1. 使用 `fs` 模块读取文件
2. 使用 `crypto` 模块计算 MD5 哈希值

```javascript
const fs = require('fs');
const crypto = require('crypto');

/**
 * 计算文件的 MD5 哈希值
 * @param {string} filePath - 文件路径
 * @returns {Promise<string>} - 返回文件的 MD5 哈希值
 */
function calculateMD5(filePath) {
  return new Promise((resolve, reject) => {
    // 创建一个 hash 实例
    const hash = crypto.createHash('md5');
    const stream = fs.createReadStream(filePath);

    stream.on('data', (data) => {
      hash.update(data); // 逐块更新 hash 值
    });

    stream.on('end', () => {
      const md5 = hash.digest('hex'); // 获取 MD5 值
      resolve(md5);
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
}

// 示例调用
const filePath = 'path/to/your/image.jpg'; // 替换为你的图片路径
calculateMD5(filePath)
  .then((md5) => {
    console.log(`图片的 MD5 值: ${md5}`);
  })
  .catch((err) => {
    console.error('计算 MD5 时出错:', err);
  });
```

## 代码说明

- crypto.createHash('md5')：创建一个 MD5 哈希对象，用于后续计算。
- fs.createReadStream(filePath)：以流的方式读取图片文件，避免一次性将文件加载到内存中，适合处理较大的文件。
- hash.update(data)：在流的每个数据块中更新哈希值。
- hash.digest('hex')：计算并返回最终的 MD5 哈希值，格式为 16 进制的字符串。

## 运行方式

- 将代码保存到 .js 文件中。
- 替换 filePath 为你要计算 MD5 的图片路径。
- 使用 Node.js 运行该文件：
