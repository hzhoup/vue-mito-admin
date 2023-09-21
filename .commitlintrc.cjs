const fs = require('node:fs')
const path = require('node:path')
const { execSync } = require('node:child_process')

const apps = fs.readdirSync(path.resolve(__dirname, 'apps'))
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))
const scopes = [...apps, ...packages]

const gitStatus = execSync('git status --porcelain || true').toString().trim().split('\n')

const scopeComplete = gitStatus
  .find(r => ~r.indexOf('M  packages'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/packages%%((\w|-)*)/)?.[1]

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scopes]
  },
  prompt: {
    scopes,
    allowCustomScopes: true,
    defaultScope: scopeComplete,
    customScopesAlign: !scopeComplete ? 'top' : 'bottom'
  }
}
