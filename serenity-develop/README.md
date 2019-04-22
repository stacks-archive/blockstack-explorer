# SerenityJS - CucumberJS - Protractor  
## Standalone testing suite with JavaScript
[![CircleCI](https://circleci.com/gh/SpiralOutDotEu/SerenityJS-Cucumber-Protractor-StandAlone.svg?style=svg)](https://circleci.com/gh/SpiralOutDotEu/SerenityJS-Cucumber-Protractor-StandAlone)

Basic boilerplate for testing using SerenityJS, CucumberJS and Protractor.

The sample test checks the google's search feature.

### Usage

#### Requirements

* nodejs (tested with v8.1.2)
* npm (tested with v5.0.3)
* chrome browser (tested with Version 61.0.3163.100 (Official Build) (64-bit))

#### Setup
```
git clone https://gitlab.com/nupeten/serenity.git
cd serenity
npm install
```

#### Run

Run the complete workflow. This will execute necessary updates, fail-safe the whole procedure, tslint your code, run the tests, create a report and open it with your browser.
It will take some time during the first run because it updates Serenity-CLI jar and the web-driver: 
```
npm run test
```

Run only the lint checks and tests without creating reports:
```
npm run e2e
```

#### Add tests

Create a folder for your feature under `features` folder. Add your `.feature` file and the corresponding steps under a `step_definitions` folder
```
+-- features
|    +--my_feauture
|    |  |--my_feature.feature
|    |  +--step_definitions
|    |  |   |--my_feauture.steps.ts
|    +--another_feauture
|    |  |--another_feature.feature
|    |  +--step_definitions
|    |  |   |--another_feauture.steps.ts

```

