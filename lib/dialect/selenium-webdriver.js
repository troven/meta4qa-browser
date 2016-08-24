var assert = require('assert');
var _ = require('underscore');

var Apigeek = require("apigeek-dialect");
var http = Apigeek.helpers.http;

var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;

var self = module.exports = function(learn, config) {


    config.webdriver = _.defaults(config.webdriver, { timeout: 20000 });
    var driver = false;

    // ***** GIVEN *****

    learn.given(["I use $browser browser"], function(browser, done) {
        var builder = new webdriver.Builder();
        builder.forBrowser(browser);
        if (this.target.hostname && !this.target.disabled) {
            console.log("Web Driver: %j", this.target);
            builder.usingServer(this.target.hostname)
        }

        driver = builder.build();
        done && done();
    });

    learn.when(["I navigate to $resource", "I visit $resource"], function(resource, done) {
        var url = http.url(resource, this.request, this.target );
        var response = driver.get(url);
        done && done();
    });

    learn.when(["I type $text into $css"], function(text, css, done) {
        driver.findElement(By.name(css)).sendKeys(text);
        done && done();
    });

    learn.when(["I click $css"], function(css, done) {
        driver.findElement(By.name(css)).click();
        done && done();
    });

    learn.when(["I wait until page is $title"], function(title, done) {
        console.log("WAIT FOR PAGE: %s -> %j", title, config);

        var condition = until.titleIs(title);
//        function(driver) {
//            var page = driver.getTitle();
////            var truthy = until.titleIs(title);
//            console.log("WAITING: %s -> %j \n-> %j", page, title);
////            return page == title;
//            return false;
//        }
        driver.wait(condition, this.timeout || 10000 );

        console.log("PAGE LOADED")
        done && done();
    });

    learn.when(["I stop using browser"], function(done) {
//        driver.quit();
        done && done();
    });

    //driver.findElement(By.name('btnG')).click();
    //driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    //driver.quit();
    //

    return self;
}


