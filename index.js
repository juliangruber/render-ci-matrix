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

    if (!state.build) return `${chalk.gray(frame)} Loading build`

    if (!state.commit.id) return `${chalk.gray(frame)} Looking for commit`

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
        out += `  ${check(job, spinners.dots.frames[frameIdx])} ${job.config.language}: ${job.version} ${chalk.gray(job.config.env || '')}`
        if (job.state === 'started') {
          out += ` ${chalk.white(`(${ms(new Date() - new Date(job.started_at))})`)}`
        }
        out += '\n'
      })

      out += '\n'
    })

    return out
  }
}

const check = (job, frame) => {
  const out = job.state === 'failed' && !job.allow_failure
    ? chalk.red('×')
    : job.state === 'failed' && job.allow_failure
        ? chalk.gray('×')
        : job.state === 'passed'
            ? chalk.green('✓')
            : job.state === 'started' ? chalk.yellow(frame) : chalk.gray(frame)
  return out
}
