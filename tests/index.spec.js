import { rollup } from 'rollup'
import hypothetical from 'rollup-plugin-hypothetical'

import * as rollupPluginMagicString from '..'

test('should throw if mandatory option "magic" is missing or is not a function', () => {
  expect(() =>
    rollupPluginMagicString.default({}),
  ).toThrowErrorMatchingSnapshot()
  expect(() =>
    rollupPluginMagicString.default({ magic: true }),
  ).toThrowErrorMatchingSnapshot()
})

test('should execute custom magic-string operations correctly', async () => {
  const bundle = await rollup({
    input: './test/transform.js',
    plugins: [
      hypothetical({
        files: {
          './test/transform.js': `import template from './template.html'

export default {
  template,
}
`,
          './test/template.html': `<div class="test">
  <%- msg %>
</div>
`,
        },
      }),
      rollupPluginMagicString.default({
        magic(code, _id, magicString) {
          const wrappedCode = JSON.stringify(code)
          magicString
            .overwrite(0, code.length, wrappedCode)
            .prependLeft(0, 'export default ')
        },
        include: '**/*.html',
      }),
    ],
  })

  const { code, map } = await bundle.generate({ format: 'es', sourcemap: true })

  expect(code).toMatchSnapshot()
  expect(map).not.toBeFalsy()
})

test('should append code correctly', async () => {
  const bundle = await rollup({
    input: './test/append.js',
    plugins: [
      hypothetical({
        files: {
          './test/append.js': `const append = {}
`,
        },
      }),
      rollupPluginMagicString.append('export default append'),
    ],
  })

  const { code, map } = await bundle.generate({ format: 'es', sourcemap: true })

  expect(code).toMatchSnapshot()
  expect(map).not.toBeFalsy()
})

test('should prepend code correctly', async () => {
  const bundle = await rollup({
    input: './test/prepend.js',
    plugins: [
      hypothetical({
        files: {
          './test/prepend.js': `export default prepend()
`,
        },
      }),
      rollupPluginMagicString.prepend('const prepend = () => {}\n'),
    ],
  })

  const { code, map } = await bundle.generate({ format: 'es', sourcemap: true })

  expect(code).toMatchSnapshot()
  expect(map).not.toBeFalsy()
})

test('should wrap code correctly', async () => {
  const bundle = await rollup({
    input: './test/wrap.js',
    plugins: [
      hypothetical({
        files: {
          './test/wrap.js': `const wrapped = wrap()
`,
        },
      }),
      rollupPluginMagicString.wrap(
        'const wrap = () => {}\n',
        'export default wrapped',
      ),
    ],
  })

  const { code, map } = await bundle.generate({ format: 'es', sourcemap: true })

  expect(code).toMatchSnapshot()
  expect(map).not.toBeFalsy()
})
test('should not output a sourcemap when disabled', async () => {
  const bundle = await rollup({
    input: './test/wrap.js',
    plugins: [
      hypothetical({
        files: {
          './test/wrap.js': `const wrapped = wrap()
`,
        },
      }),
      rollupPluginMagicString.wrap('(function(){', '})()', {
        sourcemap: false,
      }),
    ],
  })

  const { map } = await bundle.generate({ format: 'es', sourcemap: false })

  expect(map).toBeFalsy()
})
