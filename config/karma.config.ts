// Karma configuration
// Generated on Mon Mar 06 2017 23:28:09 GMT+0200 (FLE Standard Time)
import { karmaWebpackConfig } from './webpack-karma.config';

module.exports = (config) => {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '..',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        plugins: [
            'karma-jasmine', 'karma-coverage-istanbul-reporter',
            'karma-chrome-launcher', 'karma-webpack',
            'karma-sourcemap-loader'
        ],


        // list of files / patterns to load in the browser
        files: [
            'src/test.ts',
        ],

        mime: {
            'text/x-typescript': ['ts']
        },


        // list of files to exclude

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.ts': ['webpack', 'sourcemap']
        },

        webpack: karmaWebpackConfig,

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage-istanbul'],

        coverageIstanbulReporter: {
            reports: ['text-summary', 'html'],
            fixWebpackSourcePaths: true,
            dir: './coverage',
            'report-config': {
                html: {
                    subdir: 'html'
                }

            }
        },


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


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
        concurrency: Infinity
    })
};