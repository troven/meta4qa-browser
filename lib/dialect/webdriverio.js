var assert = require('assert');
var _ = require('underscore');

var meta4qa = require("meta4qa"), http = meta4qa.helpers.http, vars = meta4qa.helpers.vars;

var webdriverio = require('webdriverio');
var debug = require('debug')("meta4qa:webdriverio");

var self = module.exports = function(learn, config) {

    config.webdriverio = _.extend({ }, config.webdriverio)

    var toCSS = function(css) {
        if (css.indexOf("#")<0&&css.indexOf(".")<0&&css.indexOf("/")<0) return'[name="'+css+'"]';
        return css;
    }

    learn.given(["I use $browser browser"], function(browser, done) {
        if (this.vars.browser) {
            debug("re-using browser: %j -> %j", options, browser);
            done();
        }

        var options = {
            //logLevel: "verbose",
            screenshotPath: config.webdriverio.screenshotPath || config.files+"/screenshots",
            waitforTimeout: config.webdriverio.waitforTimeout || (120 * 1000),
            desiredCapabilities: {
                browserName: browser
            }
        };

        var browser = this.vars.browser = this.vars.browser || webdriverio.remote(options);
        assert(browser, "browser not connected");

        debug("using browser: %j -> %j", options, browser);

        browser.init().call(done);
        //browser.pause(10000)
        //done && done();
    });

    learn.when(["I navigate to $resource", "I visit $resource"], function(resource, done) {
        assert(this.target, "Missing @target");
        assert(this.target.hostname, "Missing hostname for: "+this.target.hostname);

        var browser = this.vars.browser;
        assert(browser, "Not using a browser");
        var url = http.url(resource, this.request, this.target );
        debug("visit %s using browser: %j", url, browser);

        browser.url(url).call(done);

        //done && done();
    });

    learn.when(["I type $text into $name"], function(text, name, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");
        browser.setValue('[name="'+name+'"]',text).call(done);
        //done && done();
    });

    learn.when(["I select $value in $selector", "I choose $value in $selector"], function(value, selector, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");
        selector = toCSS(selector);
        browser.selectByValue(select,value).call(done);
        //done && done();
    });

    learn.when(["I paste $varname into $name"], function(varname, name, done) {
        var browser = this.vars.browser;
        var value = vars.find(this, varname);
        assert(browser, "Not using a browser");
        browser.setValue('[name="'+name+'"]',value).call(done);
        //done && done();
    });

    learn.when(["I submit $form"], function(form, done) {
        var browser = this.vars.browser;
        css = toCSS(form);

        assert(browser, "Not using a browser");
        browser.submit(form).call(done);
        //done && done();
    });

    learn.when(["I click $css"], function(css, done) {
        var browser = this.vars.browser;
        css = toCSS(css);

        assert(browser, "Not using a browser");
        browser.click(css).call(done);
        //done && done();
    });

    learn.when(["I swipe [left|right|up|down]"], function(dir, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");
        dir = vars.capitalize(dir);
        browser["swipe"+dir]("body").call(done);
        //done && done();
    });

    learn.when(["I swipe [left|right|up|down] on $css"], function(dir, css, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");
        dir = vars.capitalize(dir);
        css = toCSS(css);

        browser["swipe"+dir](css).call(done);
        //done && done();
    });

    learn.when(["I double click $css", "I double-click $css"], function(css, done) {
        var browser = this.vars.browser;
        css = toCSS(css);

        assert(browser, "Not using a browser");
        browser.doubleClick(css).call(done);
        //done && done();
    });

    learn.when(["I drag $from to $to"], function(from, to, done) {
        var browser = this.vars.browser;
        from = toCSS(from);
        to = toCSS(to);

        assert(browser, "Not using a browser");
        browser.dragAndDrop(from, to).call(done);
        //done && done();
    });

    learn.when(["I see page title contains $title", "page title contains $title"], function(title, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");

        browser.getTitle().then(function (page_title) {
            var matched = (page_title.indexOf(title)>=0);
            debug("getTitle: (%s) %s --> %s", matched, page_title, title);
            assert( matched, "Page title does not contain: "+title);
            return matched;
        }).call(done);

    });

    learn.when(["I see $css contains $text", "page $css contains $text"], function(css, text, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");
        css = toCSS(css);

        browser.getText(css).then(function (body) {
            var matched = (body.indexOf(text)>=0);
            debug("getText: (%s) %s --> %s", matched, body, text);
            assert( matched, "Page does not contain: "+text);
            return matched;
        }).call(done);

    });

    learn.when(["I wait to see $css", "I wait until $css"], function(css, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");

        css = toCSS(css);
        var wait = 5000;
        debug("Waiting %s ms for page to show %s", wait, css);
        browser.waitForVisible(css, wait).call(done);

    });

    learn.when(["I save screenshot as $file"], function(file, done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");

//        file = config.files+"/"+file;
        debug("Save %s as screenshot", file);
        browser.saveScreenshot(file).call(done);
    });

    learn.then(["I stop using browser", "I close browser"], function(done) {
        var browser = this.vars.browser;
        assert(browser, "Not using a browser");
        browser.end();
        delete this.vars.browser;
        done && done();
    });

    return self;
}


