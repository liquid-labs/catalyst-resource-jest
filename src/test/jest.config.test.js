/* global describe expect test */
const fsPath = require('node:path')

describe('jest.config.js', () => {
  test('supports override from package.json', async() => {
    const testDataPath = fsPath.join('src', 'test', 'data')
    const jestConfigPath = fsPath.join('..', 'jest.config.js')
    const initialCwd = process.cwd()
    try {
      process.chdir(testDataPath)
      const jestConfig = require(jestConfigPath)
      expect(jestConfig.collectCoverage).toBe(false)
    }
    finally {
      process.chdir(initialCwd)
    }
  })
})
