// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const crew = require('serenity-js/lib/stage_crew');

exports.config = {

    capabilities: {
        'browserName': 'chrome'
    },

    directConnect: true,

    // Framework definition - tells Protractor to use Serenity/JS
    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),
    specs: [ 'features/**/*.feature' ],

    cucumberOpts: {
        require:    [ 'features/**/step_definitions/*.ts' ], // loads step definitions
        format:     'pretty',               // enable console output
        compiler:   'ts:ts-node/register'   // interpret step definitions as TypeScript
    },

    serenity: {
        crew:    [
            crew.serenityBDDReporter(),
            crew.consoleReporter(),
            crew.Photographer.who(_ => _
                .takesPhotosOf(_.Tasks_and_Interactions)
                .takesPhotosWhen(_.Activity_Finishes)
            )
        ],
        dialect: 'cucumber',
        stageCueTimeout: 30 * 1000   // up to 30 seconds by default
    }

};
