# rollup-plugin-magic-string

[![Travis](https://img.shields.io/travis/call-a3/rollup-plugin-magic-string.svg)](https://travis-ci.org/call-a3/rollup-plugin-magic-string)
[![Codecov](https://img.shields.io/codecov/c/github/call-a3/rollup-plugin-magic-string.svg)](https://codecov.io/gh/call-a3/rollup-plugin-magic-string)
[![David](https://img.shields.io/david/call-a3/rollup-plugin-magic-string.svg)](https://david-dm.org/call-a3/rollup-plugin-magic-string)
[![David Dev](https://img.shields.io/david/dev/call-a3/rollup-plugin-magic-string.svg)](https://david-dm.org/call-a3/rollup-plugin-magic-string?type=dev)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Greenkeeper badge](https://badges.greenkeeper.io/call-a3/rollup-plugin-magic-string.svg)](https://greenkeeper.io/)

string mutation plugin for rollup

## Usage

```bash
# npm
npm install -D rollup-plugin-magic-string

# yarn
yarn add -D rollup-plugin-magic-string
```

```js
import * as magicString from 'rollup-plugin-magic-string'
```

## Common Usage

All methods has an optional last argument `options` which is an object and contains key `include` and `exclude`.

It can be used to filter files as you like. For example you can wrapper your html template as following:

```js
insert.transform(
  (code, id) =>
    `export default ${JSON.stringify(`<!--add some comments-->${code}`)}`,
  {
    include: '**/*.html',
  },
)
```

## Append

Appends a string onto the contents.

```js
insert.append('world') // Appends 'world' to the contents of every file
```

## Prepend

Prepends a string onto the contents.

```js
insert.prepend('Hello') // Prepends 'Hello' to the contents of every file
```

## Wrap

Wraps the contents with two strings.

```js
insert.wrap('Hello', 'World') // prepends 'hello' and appends 'world' to the contents
```

## Transform

Calls a function with the contents of the file.

```js
insert.transform((code, id) => code.toUpperCase())
```
