const render = require('.')()

process.stdout.write(
  render({
    repo: ['juliangruber', 'render-ci-results'],
    build: {
      id: 13,
      number: 42
    },
    commit: {
      found: true,
      branch: 'master'
    },
    success: true,
    link: 'https://travis-ci.org/juliangruber/render-ci-results/builds/13',
    results: {
      osx: {
        foo: {
          name: 'node 6',
          env: 'FOO=bar',
          startedAt: Date.now() - 1000,
          state: 'started'
        },
        bar: {
          name: 'ruby 1.0',
          state: 'queued'
        },
        beep: {
          name: 'php 5.2',
          startedAt: Date.now() - 10000,
          state: 'started'
        }
      },
      linux: {
        boop: {
          name: 'golang 1.0',
          state: 'queued'
        }
      }
    }
  })
)
