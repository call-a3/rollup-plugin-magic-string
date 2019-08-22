import { createFilter } from 'rollup-pluginutils'
import MagicString from 'magic-string'

export default function rollupPluginMagicString({ magic, ...options }) {
  if (!Object.prototype.isPrototypeOf.bind(Function.prototype)(magic)) {
    throw new TypeError('options.magic is required')
  }
  const filter = createFilter(options.include, options.exclude)
  return {
    name: 'magic-string',
    transform(code, id) {
      if (!filter(id)) return undefined
      const magicString = new MagicString(code)
      magic(code, id, magicString)
      const result = { code: magicString.toString() }
      if (options.sourcemap !== false) {
        result.map = magicString.generateMap({ hires: true })
      }
      return result
    },
  }
}

export function append(string, options = {}) {
  return rollupPluginMagicString({
    magic(_code, _id, magicString) {
      magicString.append(string)
    },
    ...options,
  })
}

export function prepend(string, options = {}) {
  return rollupPluginMagicString({
    magic(_code, _id, magicString) {
      magicString.prepend(string)
    },
    ...options,
  })
}

export function wrap(pre, post, options = {}) {
  return rollupPluginMagicString({
    magic(_code, _id, magicString) {
      magicString.prepend(pre)
      magicString.append(post)
    },
    ...options,
  })
}
