var App = require('mixdown-server').App;
var tape = require('tape');
var _ = require('lodash');
var util = require('util');

var config = {
    plugins: {
        states: {
            module: '/plugins/states.js',
            options: {}
        }
    }
};


// these are simple tests to test the plugin interface - states.js has more detailed tests.
tape('test states plugin', function (t) {
    var app = new App(config);
    app.init(function (e) {
        t.error(e, 'app should init without error')

        t.test('app attachment', function (t) {
            t.ok(app.plugins.states, 'states namespace should attach to plugins');
            t.ok(app.plugins.states.getStates, 'should have getStates');
            t.ok(app.plugins.states.getCodeToNameMap, 'should have getCodeToNameMap');
            t.ok(app.plugins.states.getNameToCodeMap, 'should have getNameToCodeMap');

            t.end();
        });

        t.test('getStates()', function (t) {
            var states = app.plugins.states.getStates();
            t.equal(states.length, 51, "51 of 'em, if you count DC");

            t.end();
        });

        t.test('getCodeToNameMap()', function (t) {
            var codeToName = app.plugins.states.getCodeToNameMap();

            t.ok(_.isObject(codeToName), 'should get a map');
            t.equal(_.keys(codeToName).length, 51, 'still 51 of them');

            t.end();
        });

        t.test('getNameToCodeMap()', function (t) {
            var nameToCode = app.plugins.states.getNameToCodeMap();

            t.ok(_.isObject(nameToCode), 'should get a map');
            t.equal(_.keys(nameToCode).length, 51, '51 of them! still!');
            
            t.end();
        })

        t.end();
    });
})