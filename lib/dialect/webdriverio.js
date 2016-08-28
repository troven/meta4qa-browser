var assert = require('assert');
var _ = require('underscore');

var Apigeek = require("apigeek-dialect");
var http = Apigeek.helpers.http;

var webdriverio = require('webdriverio');
var debug = require('debug')("apigeek:webdriverio");

var self = module.exports = function(learn, config) {

    // ***** GIVEN *****

    learn.given(["I use $browser browser"], function(browser, done) {
        var options = {
            desiredCapabilities: {
                browserName: browser
            }
        };

        this.browser = webdriverio.remote(options);
        this.browser.init();
        debug("using browser: %j -> %j", this.target, _.keys(this));

        done && done();
    });

    learn.when(["I navigate to $resource", "I visit $resource"], function(resource, done) {
        debug("using browser: %j -> %j", this.target, _.keys(this));
        assert(this.target, "Missing @target");
        assert(this.target.hostname, "Missing hostname for: "+this.target.hostname);
        assert(this.browser, "Not using a browser");

        var url = http.url(resource, this.request, this.target );
        debug("VISIT: %s", url);
        this.browser.url(url)

        done && done();
    });

    learn.when(["I type $text into $name"], function(text, name, done) {
        assert(this.browser, "Not using a browser");
        this.browser.setValue('[name="'+name+'"]',text);
        done && done();
    });

    learn.when(["I click $css"], function(css, done) {
        assert(this.browser, "Not using a browser");
        this.browser.click('h2.subheading a');
        done && done();
    });

    learn.when(["I wait until page is $title"], function(title, done) {
        debug("WAIT FOR PAGE: %s", title);
        this.browser.pause(1000);
        this.browser.getTitle().then(function (title) {
            debug(title);
            done && done();
        });
    });

    learn.when(["I stop using browser"], function(done) {
        this.browser.end();
        done && done();
    });

    //driver.findElement(By.name('btnG')).click();
    //driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    //driver.quit();
    //

    return self;
}


