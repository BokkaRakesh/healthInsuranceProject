// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const process = require('process');
  process.env.CHROME_BIN = require('puppeteer').executablePath();

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    browsers: ['HeadlessChrome'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--remote-debugging-port=9222',
          '--enable-logging',
          '--v=1', // Enable verbose logging
          '--disable-web-security',
        ],
      },
    },
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-html-detailed-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['progress', 'coverage-istanbul', 'htmlDetailed'],
    coverageIstanbulReporter: {
        reports: ['html'],
        dir: require('path').join(__dirname, '../../reports/coverage'),
        fixWebpackSourcePaths: true
    },
    htmlDetailed: {
        dir: '../../reports/units',
        splitResults: false,
        autoReload: false,
        showSuccess: true,
        showFailed: true,
        showSkipped: true,
        useHostedBootstrap: true,
        refreshTimeout: 3000
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    restartOnFileChange: true,
    browserConsoleLogOptions: {
      level: 'info',
      terminal: 'true',
    },
    captureTimeout: 210000,
    browserDisconnectTimeout: 210000,
    browserNoActivityTimeout: 210000,
    browserDisconnectTolerance: 2,
  });
};
