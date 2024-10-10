/*
 * :file description:
 * :name: /fe-interview/.dumirc.ts
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-10-10 20:20:45
 * :last editor: 张德志
 * :date last edited: 2024-10-10 21:05:26
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    mode: 'site',
    name: '前端面试',
    antd: {},
    base: '/',
    logo: false,
    history: { type: 'hash' },
    nav: [
      {
        title: 'ECMAScript',
        link: '/ecmascript',
      },
      {
        title: 'Typescript',
        link: '/typescript',
      },
      {
        title: 'Webgl',
        link: '/webgl',
      },
    ],
  },
});
