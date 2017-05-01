const assert = require('chai').assert;

describe('initial setup', function() {
    describe('should install dependencies and save then to package.json:', function() {
        const dependencies = require('../package.json').dependencies;

        it('"express", the web framework based on nodejs', function() {
            assert.property(dependencies, 'express');
            assert.doesNotThrow(() => require('express'));
        });

        it('"body-parser", for parsing http request bodies', function() {
            assert.property(dependencies, 'body-parser');
            assert.doesNotThrow(() => require('body-parser'));
        });

        it('"nunjucks", for rendering templates', function() {
            assert.property(dependencies, 'nunjucks');
            assert.doesNotThrow(() => require('nunjucks'));
        });

        it('"consolidate", to make nunjucks compatible with express', function() {
            assert.property(dependencies, 'consolidate');
            assert.doesNotThrow(() => require('consolidate'));
        });
    });
});
