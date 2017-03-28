const render = require('.')()

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
