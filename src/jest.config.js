// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const fsPath = require('node:path')
const readFileSync = require('node:fs').readFileSync

let pkg
if (process.env.SRJ_SKIP_PACKAGE_CUSTOMIZATIONS !== 'true') {
  // we expect to execute from the 'test-staging' subdir, so we drop down one; otherwise, we look for
  // SRJ_CWD_PACKAGE_DIR to tell us where to look
  const packagePath = process.env.SRJ_CWD_REL_PACKAGE_DIR === undefined
    ? fsPath.resolve(process.cwd(), '..', 'package.json')
    : fsPath.resolve(process.env.SRJ_CWD_REL_PACKAGE_DIR, 'package.json')

  try {
    const packageContents = readFileSync(packagePath, { encoding : 'utf8' })
    try {
      pkg = JSON.parse(packageContents)
    }
    catch (e) {
      if (e instanceof SyntaxError) {
        throw new SyntaxError(e.message + ` (file: ${packagePath})`)
      }
      else { throw e }
    }
  }
  catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error(`"Could not locate '${packagePath}' to load package-level configuration customizations. By default, we look one direcotry belowe the current working directory (default is to run from './test-staging/'). Consider setting environment var 'SRJ_CWD_REL_PACKAGE_DIR' to set the directory of the package relative to the test process working dir (usually the package root directory; so set to '.' if 'package.json' is in the package root) or set 'SRJ_SKIP_PACKAGE_CUSTOMIZATIONS' to (the string) 'true' to skip loading package customizations altogether.`)
    }
    else { throw e }
  }
} // if (process.env.SRJ_SKIP_PACKAGE_CUSTOMIZATIONS !== 'true')

const config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after the first failure
  // bail: false,

  // Respect "browser" field in package.json when resolving modules
  // browser: false,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/var/folders/x7/dkrqh9dd6yd4kx0xs6st40980000gn/T/jest_dx",

  // Automatically clear mock calls and instances between every test
  // clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage : true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom : ['**/*.{js,cjs,mjs,jsx}'],

  // The directory where Jest should output its coverage files
  coverageDirectory : 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns : [
    '/node_modules/',
    '/index.[mc]?jsx?',
    '/test/',
    '/_tests_/',
    '\\.test\\.[^.]+\\.[mc]?jsx?',
    '/test-data/',
    '<rootDir>/test-staging/',
    '<rootDir>/dist/',
    '<rootDir>/qa/',
    '<rootDir>/coverage/'
  ],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters : [
    'json',
    'text',
    'html',
    //     "lcov",
    'clover'
  ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: null,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files usin a array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: null,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "node"
  // ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "always",

  // A preset that is used as a base for Jest's configuration
  // preset: null,

  // Run tests from one or more projects
  // projects: null,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: null,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // By using '--config=' in our command the root gets set to the dir of the
  // config file. This behavior is documented and intended, though also pretty
  // inexplicable.
  rootDir : process.cwd(),

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // The path to a module that runs some code to configure or set up the testing framework before each test
  // setupTestFrameworkScriptFile: null,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  snapshotResolver : fsPath.join(__dirname, 'jest-snapshot-resolver.js'),

  // The test environment that will be used for testing
  // TODO: support 'jsdom'
  testEnvironment : 'node',

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  testMatch : [
    '**/__tests__/**/*.{js,mjs,cjs,jsx}',
    '**/?(*.)+(spec|test).{js,mjs,cjs,jsx}'
  ]

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // The regexp pattern Jest uses to detect test files
  // testRegex: "",

  // This option allows the use of a custom results processor
  // testResultsProcessor: null,

  // This option allows use of a custom test runner
  // testRunner: "jasmine2",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "about:blank",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: null,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: null,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
}

if (process.env.SRJ_SKIP_PACKAGE_CUSTOMIZATIONS !== 'true' && pkg._sdlc) {
  const { jestConfig, jestCoverageGlobs } = pkg._sdlc

  Object.assign(config, jestConfig)
  if (jestCoverageGlobs !== undefined) {
    config.collectCoverageFrom.push(...jestCoverageGlobs)
  }
}

if (config.testEnvironment === 'jsdom') {
  config.testEnvironment = fsPath.join(__dirname, 'fix-jsdom-environment.js')
}

module.exports = config
