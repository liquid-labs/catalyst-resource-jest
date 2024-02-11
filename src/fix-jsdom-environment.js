const JSDOMEnvironment = require('jest-environment-jsdom').default

const FixJSDOMEnvironment = class extends JSDOMEnvironment {
  constructor(...args) {
    super(...args)

    // FIXME https://github.com/jsdom/jsdom/issues/3363
    this.global.structuredClone = structuredClone
  }
}

// https://github.com/facebook/jest/blob/v29.4.3/website/versioned_docs/version-29.4/
module.exports = FixJSDOMEnvironment
