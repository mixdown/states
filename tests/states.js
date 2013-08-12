var App = require('mixdown-server').App;
var tape = require('tape');
var _ = require('lodash');
var util = require('util');
var states = require('../lib/states.js');

tape('test states library', function (t) {
    t.test('interface', function (t) {
        t.ok(states.getStates, 'should have getStates');
        t.ok(states.getCodeToNameMap, 'should have getCodeToNameMap');
        t.ok(states.getNameToCodeMap, 'should have getNameToCodeMap');

        t.end();
    });

    t.test('getStates()', function (t) {
        var statesList = states.getStates();
        t.equal(statesList.length, 51, "51 of 'em, if you count DC");

        _.each(statesList, function (state) {
            if (!state.code) {
                t.fail('should have state code, found: ' + util.inspect(state));
            }
            if (!state.name) {
                t.fail('should have state name, found: ' + util.inspect(state));
            }
        });

        // make sure we aren't getting a direct reference
        var newStates = states.getStates();

        t.notOk(statesList === newStates, 'should not get direct reference to states object');

        statesList[0].name = 'Abalama';
        statesList = states.getStates();
        t.equal(statesList[0].name, 'Alabama', 'should not get shallow clone of states object')

        t.end();
    });

    t.test('getCodeToNameMap()', function (t) {
        var codeToName = states.getCodeToNameMap();

        t.ok(_.isObject(codeToName), 'should get a map');
        t.equal(_.keys(codeToName).length, 51, 'still 51 of them');
        
        _.each(codeToName, function (v, k) {
            if (!(_.isString(k) && k.length === 2)) {
                t.fail('expected two letter state code');
            }
            if (!(v && _.isString(v))) {
                t.fail('expected non-empty state name');
            }
        });

        var newCodes = states.getCodeToNameMap();

        t.notOk(codeToName === newCodes, 'should not get direct reference to map');

        codeToName.MA = 'MORE LIKE TAXACHUSETTS AMIRITE';
        newCodes = states.getCodeToNameMap();
        t.notOk(codeToName.MA === newCodes.MA, 'should not get shallow clone');

        t.end();
    });

    t.test('getNameToCodeMap()', function (t) {
        var nameToCode = states.getNameToCodeMap();

        t.ok(_.isObject(nameToCode), 'should get a map');
        t.equal(_.keys(nameToCode).length, 51, '51 of them! still!');
        
        _.each(nameToCode, function (v, k) {
            if (!(_.isString(v) && v.length === 2)) {
                t.fail('expected two letter state code');
            }
            if (!(k && _.isString(k))) {
                t.fail('expected non-empty state name');
            }
        });

        var newMap = states.getNameToCodeMap();

        t.notOk(nameToCode === newMap, 'should not get direct reference to map');

        nameToCode.Texas = 'TXXXXXXXXX';
        newMap = states.getNameToCodeMap();
        t.notOk(nameToCode.Texas === newMap.Texas, 'should not get shallow clone');

        t.end();
    })

    t.end();
})