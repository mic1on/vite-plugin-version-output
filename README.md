# vite-plugin-version-output

> Automatically insert the version in your project

<p align="center">
  <img src="https://img.shields.io/npm/dm/vite-plugin-version-output.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vite-plugin-version-output"><img src="https://img.shields.io/npm/v/vite-plugin-version-output.svg" alt="Version"></a>
  <a href="https://github.com/vuejs/vite-plugin-version-output/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vite-plugin-version-output.svg" alt="License"></a>
</p>

## Install
```sh
pnpm install -D vite-plugin-version-output
# OR yarn add -D vite-plugin-version-output
# OR npm install -D vite-plugin-version-output
```

## Usage
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { vitePluginVersionOutput } from 'vite-plugin-version-output'

export default defineConfig({
  plugins: [
    vitePluginVersionOutput({
      // name: 'test-app',
      // version: '0.0.1',
      json: {
        enable: true,
        fileName: 'version.json'
      },
      html: {
        enable: true,
        toMeta: true,
        toConsole: true,
        toGlobal: true
      },
    })
  ],
})
```

## Config

`vite-plugin-version-output` can be print application version in the `Console` or add `<meta>` in HTML element.

- `name` - application name (`name in package.json` by default)
- `version` - application version (`version in package.json` by default)
- `html` - HTML output config
  - `enable` - enable HTML output (`true` by default)
  - `ifMeta` - add \<meta name="application-name" content="{APPNAME_VERSION}: {version}"> in the \<head> (`true` by default)
  - `ifConsole` - print info in the Console (`true` by default)
  - `ifGlobal` - set a variable named *\`\_\_${APPNAME}\_VERSION\_\_\`* in the window. (`true` by default)
- `json` - JSON output config
  - `enable` - enable JSON output (`true` by default)
  - `fileName` - output file name (`version.json` by default)
Then you can use `vite-plugin-version-output` ! 🎉

## Thanks
- [vite-plugin-version-mark](https://github.com/ZhongxuYang/vite-plugin-version-mark)
