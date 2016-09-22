var assert = require('assert');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var debug = require('debug')("dialect:webapp");

var self = module.exports = function(learn, config) {
    assert(learn, "missing learn");
    assert(config, "missing config");

    //require("./dialect/selenium-webdriver")(learn,config);
    require("./dialect/webdriverio")(learn,config);

    // Dialect Controller

    self.feature = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

    };

    self.scenario = function(dialect, scope) {
        assert(dialect, "missing dialect");
        assert(scope, "missing scope");

    };

    self.annotations = function(dialect, annotations, scope) {
        debug("understands web browsers");
        scope.count=scope.count?scope.count+1:1;
    }

    return self;
};
