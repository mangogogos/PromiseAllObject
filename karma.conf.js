module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            { pattern: 'src/**/*.ts' }
        ],
        preprocessors: {
            'src/**/*.ts': ['karma-typescript']
        },
        reporters: ['dots', 'karma-typescript'],
        browsers: ['ChromeHeadless'],
        karmaTypescriptConfig: {
            tsconfig: 'tsconfig.json'
        },
        singleRun: true
    });
};
