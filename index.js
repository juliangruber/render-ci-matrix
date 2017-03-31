'use strict'

const spinners = require('cli-spinners')
const chalk = require('chalk')
const ms = require('ms')

module.exports = () => {
  let frameIdx = 0

  return state => {
    let out = ''

    const frame = spinners.dots.frames[frameIdx]
    frameIdx = (frameIdx + 1) % spinners.dots.frames.length

    if (!state.repo) return `${chalk.gray(frame)} Loading repo`

    if (!state.build) {
      out += `${chalk.gray(frame)} Loading build`
      if (state.started && new Date() - state.started > ms('10s')) {
        out += chalk.yellow(
          `\nIt is taking unusually long to fetch your build.\nHave you pushed your commits yet?`
        )
      }
      return out
    }

    if (!state.commit.found) return `${chalk.gray(frame)} Looking for commit`

    let header = `\n${chalk.bold('Build')} #${state.build.number}`
    if (typeof state.success === 'boolean') {
      header = state.success ? chalk.green(header) : chalk.red(header)
    }

    out += header
    out += ` ${chalk.gray.bold(`${state.repo[0]}/${state.repo[1]}`)} ${chalk.gray(`#${state.commit.branch}`)}`
    out += `\n${chalk.blue.underline(state.link)}\n\n`

    if (!Object.keys(state.results).length) {
      return out + `  ${chalk.gray(frame)} Loading jobs`
    }

    Object.keys(state.results).forEach((os, i, arr) => {
      if (arr.length > 1) out += `${chalk.gray(os)}\n`

      Object.keys(state.results[os]).forEach(key => {
        const job = state.results[os][key]
        out += `  ${check(job, spinners.dots.frames[frameIdx])} ${job.name} ${chalk.gray(job.env || '')}`
        if (job.state === 'started') {
          out += ` ${chalk.white(`(${ms(new Date() - new Date(job.startedAt))})`)}`
        }
        out += '\n'
      })

      out += '\n'
    })

    return out
  }
}

const check = (job, frame) => {
  const out = job.state === 'failed' && !job.allowFailure
    ? chalk.red('×')
    : job.state === 'failed' && job.allowFailure
        ? chalk.gray('×')
        : job.state === 'passed'
            ? chalk.green('✓')
            : job.state === 'started' ? chalk.yellow(frame) : chalk.gray(frame)
  return out
}
