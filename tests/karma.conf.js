// process.env.CHROME_BIN = require('puppeteer').executablePath();

const conf = {
  browsers: [
    'ChromeHeadless'
    // 'ChromeHeadlessCustom'
  ],
  // customLaunchers: {
  //   ChromeHeadlessCustom: {
  //     base: 'ChromiumHeadless',
  //     flags: [
  //         '--no-sandbox',
  //         '--headless',
  //         '--disable-gpu',
  //         '--disable-translate',
  //         '--disable-extensions'
  //     ]
  //   }
  // },
  basePath: '..',
  colors: true,
  frameworks: [
    'qunit'
  ],
  plugins: [
    'karma-qunit',
    'karma-chrome-launcher'
  ],
  files: [
    'node_modules/jquery/dist/jquery.slim.js',
    'src/input-spinner.js',
    'tests/unit/unit.js'
  ],
  autoWatch: false,
  singleRun: true,
  concurrency: Infinity
};

module.exports = (config) => {
  config.set(conf);
};
