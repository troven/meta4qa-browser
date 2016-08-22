var assert = require('assert');
var request = require('request');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var http = require('./helpers/http');
var debug = require('debug')("dialect:webapi");

module.exports = function(learn, config) {

    require("./dialect/selenium-webdriver")(learn,config);

    debug("understands browser-based apps and sites");
    return {
        annotations: function(dialect, annotations, scope) {
            _.extend(scope, { stopwatch: {}, targets: {}, target:{}, request: {}, headers: {}, response: {} })

            if (annotations.target) {
                scope.target = config.target[annotations.target];
            }
            if (scope.target) {
                debug("Use browser target: "+ (scope.target.hostname||"explict only"));
            }
        }
    }
};
