var states = require('../lib/states.js');

/**
 * Lil' plugin to get a list of states and state codes. Proxies lib/states.
 **/
var States = function () {};

States.prototype.attach = function (options) {
    this.states = this.states || {};

    this.states.getStates = states.getStates;
    this.states.getCodeToNameMap = states.getCodeToNameMap;
    this.states.getNameToCodeMap = states.getNameToCodeMap;
};

module.exports = States;