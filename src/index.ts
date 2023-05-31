import fs from 'fs'
import path from 'path'
import type { Plugin, IndexHtmlTransformResult } from 'vite'

interface Html {
  enable?: boolean
  toMeta?: boolean
  toConsole?: boolean
  toGlobal?: boolean
}

interface Json {
  enable?: boolean
  fileName: string
}

interface VitePluginVersionInput {
  name?: string
  version?: string
  html?: Html
  json?: Json
}

export const vitePluginVersionOutput: (input?: VitePluginVersionInput) => Plugin = (input = {}) => {
  const {
    name = process.env['npm_package_name'],
    version = getTimestamp(),
    html = { enable: true, toMeta: true, toConsole: true, toGlobal: true },
    json = { enable: true, fileName: 'version.json' }
  } = input
  let config: any

  function getTimestamp(): string {
    return new Date().getTime().toString()
  }

  const writeVersion = (versionFile: string, content: string) => {
    fs.writeFile(versionFile, content, (err) => {
      if (err) throw err
    })
  }

  return {
    name: 'vite-plugin-version-output',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    async transformIndexHtml() {
      const els: IndexHtmlTransformResult = []

      if (!html?.enable) return els

      const printName = `${name?.replace(/((?!\w).)/g, '_')?.toLocaleUpperCase?.()}_VERSION`
      const printInfo = `${printName}: ${version}`

      html.toMeta && els.push({
        tag: 'meta',
        injectTo: 'head-prepend',
        attrs: {
          name: printName,
          content: printInfo,
        },
      })
      html.toConsole && els.push({
        tag: 'script',
        injectTo: 'body',
        children: `console.log("${printInfo}")`
      })
      html.toGlobal && els.push({
        tag: 'script',
        injectTo: 'body',
        children: `__${printName}__ = "${version}"`
      })

      return els
    },

    buildStart() {
      if (!json?.enable) return

      const file = path.resolve(config.root, config.publicDir, json.fileName)
      const content = JSON.stringify({ version })
      writeVersion(file, content)
    }
  }
}
