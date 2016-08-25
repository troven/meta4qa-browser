var assert = require('assert');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var debug = require('debug')("dialect:webapp");

var self = module.exports = function(learn, config) {
    assert(learn, "missing learn");
    assert(config, "missing config");

    require("./dialect/selenium-webdriver")(learn,config);

    self.annotations = function(dialect, annotations, scope) {
        debug("understands web browsers");
    }

    return self;
};
