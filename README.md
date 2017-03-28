
# render-ci-matrix

Render a CI results matrix to the terminal.

![screenshot](screenshot.png)

## Usage

Use this code to create the output above:

```js
const render = require('render-ci-matrix')()

process.stdout.write(render({
  repo: ['juliangruber', 'render-ci-results'],
  build: {
    id: 13,
    number: 42
  },
  commit: {
    id: '123456',
    branch: 'master'
  },
  success: true,
  link: 'https://travis-ci.org/juliangruber/render-ci-results/builds/13',
  results: {
    osx: {
      foo: {
        version: '6',
        config: {
          language: 'node_js',
          env: 'FOO=bar'
        },
        started_at: Date.now() - 1000,
        state: 'started'
      },
      bar: {
        version: '1.0',
        config: {
          language: 'ruby'
        },
        state: 'queued'
      },
      beep: {
        version: '5.2',
        config: {
          language: 'php'
        },
        started_at: Date.now() - 10000,
        state: 'started'
      }
    },
    linux: {
      boop: {
        version: '1.0',
        config: {
          language: 'golang'
        },
        state: 'queued'
      }
    }
  }
}))
```

## Installation

```bash
$ npm install render-ci-matrix
```

## Related

- __[travis-watch](https://github.com/juliangruber/travis-watch)__ &mdash; Stream live travis test results of the current commit to your terminal!

## License

MIT
