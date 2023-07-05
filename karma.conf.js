// Karma configuration
// Generated on Sat Jul 28 2018 10:13:04 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
    config.set({
  
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
  
  
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],
  
  
      // list of files / patterns to load in the browser
      files: [
        'jasmine.config.js',
        {
          pattern: "https://use.fontawesome.com/releases/v5.7.2/css/all.css",
          type: "css",
          served: true,
          nocache: false
        },
        {
          pattern: "../app/web/index.js",
          watched: true,
          included: true,
          served: true,
          nocache: true 
        },
        {
          pattern: "../app/web/styles/admin/default/index.css",
          watched: true,
          included: true,
          served: true,
          nocache: true 
        },
        'tests/**/*.js',
        {
          pattern: "../app/web/vendors/require.min.js",
          watched: false,
          included: true,
          served: true,
          nocache: false
        },
        
      ],
  
      // list of files / patterns to exclude
      exclude: [
        
      ],
  
  
      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
      },
  
  
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress'],
  
  
      // web server port
      port: 9876,
  
  
      // enable / disable colors in the output (reporters and logs)
      colors: true,
  
  
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,
  
  
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
  
  
      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome'],
  
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false,
  
      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity,
      proxies: {
        '/site': {
          'target': 'http://jsc.com',
          'changeOrigin': true
        }
      },
    })
  }
  