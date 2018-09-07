# rollup-plugin-magic-string

[![Travis](https://img.shields.io/travis/call-a3/rollup-plugin-magic-string.svg)](https://travis-ci.org/call-a3/rollup-plugin-magic-string)
[![Codecov](https://img.shields.io/codecov/c/github/call-a3/rollup-plugin-magic-string.svg)](https://codecov.io/gh/call-a3/rollup-plugin-magic-string)
[![Greenkeeper badge](https://badges.greenkeeper.io/call-a3/rollup-plugin-magic-string.svg)](https://greenkeeper.io/)
[![David](https://img.shields.io/david/call-a3/rollup-plugin-magic-string.svg)](https://david-dm.org/call-a3/rollup-plugin-magic-string)
[![David Dev](https://img.shields.io/david/dev/call-a3/rollup-plugin-magic-string.svg)](https://david-dm.org/call-a3/rollup-plugin-magic-string?type=dev)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

string mutation plugin for rollup

## Installing

```bash
# npm
npm install -D rollup-plugin-magic-string

# yarn
yarn add -D rollup-plugin-magic-string
```

## Usage

The default functionality gives you a magic-string object from the code of a module and allows you to perform any operations that [magic-string](https://github.com/Rich-Harris/magic-string) supports.

Most often, you'll want to perform one of these very common operations. This module provides shortcut access to these, and thanks to magic-string, they are fully source-map supported.

### **Append**: Append a string to the end of (a) module(s).

```js
import { append } from 'rollup-plugin-magic-string'

export default {
  // ... rollup config here
  plugins: [append('THE END' /*, [options] */)],
}
```

### **Prepend**: Prepends a string to (a) module(s).

```js
import { prepend } from 'rollup-plugin-magic-string'

export default {
  // ... rollup config here
  plugins: [prepend('Hi there\n\n' /*, [options] */)],
}
```

### **Wrap**: Wraps the contents between two strings.

```js
import { wrap } from 'rollup-plugin-magic-string'

export default {
  // ... rollup config here
  plugins: [wrap('THE GAME', 'Ha, made you lose!')],
}
```

## Direct magic-string access

The above are useful shorthands, however as mentioned this plugin really gives you access to any operation that [magic-string](https://github.com/Rich-Harris/magic-string) supports:

```js
import magicString from 'rollup-plugin-magic-string'

rollup({
  plugins: [
    magicString(
      /* options = */ {
        // `magic` MUST be a function and is required
        magic(code, id, string) {
          // `code` is the source code of a module
          // `id` is the id of that module
          // `string` is an instance of MagicString that wraps `code`

          // you can now use `string` to do all kinds of string manipulations
          string.overwrite(0, 5, 'ABC').indent('  ')
        },
        // The options `include`, `exclude` and `sourceMap` are also supported
        // and behave as you would expect from a rollup plugin.
      },
    ),
  ],
})
```
