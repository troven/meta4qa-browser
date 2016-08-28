Dialect For Web Apps
====================

A scenario describes a user story - essentially it's a list of instructions and expectations.

The framework interprets each step in the scenario using the [Gherkin Vocabulary](docs/vocab.md). 

To test using a particular web browser, you'll need to install the appropriate driver:

<table><thead><tr><th>Browser</th><th>Component</th></tr>
</thead><tbody><tr><td>Chrome</td><td><a href="http://chromedriver.storage.googleapis.com/index.html">chromedriver(.exe)</a></td></tr>
<tr><td>Internet Explorer</td><td><a href="http://selenium-release.storage.googleapis.com/index.html">IEDriverServer.exe</a></td></tr>
<tr><td>Edge</td><td><a href="http://go.microsoft.com/fwlink/?LinkId=619687">MicrosoftWebDriver.msi</a></td></tr>
<tr><td>Firefox 47+</td><td><a href="https://github.com/mozilla/geckodriver/releases/">geckodriver(.exe)</a></td></tr>
<tr><td>PhantomJS</td><td><a href="http://phantomjs.org/">phantomjs(.exe)</a></td></tr>
<tr><td>Opera</td><td><a href="https://github.com/operasoftware/operachromiumdriver/releases">operadriver(.exe)</a></td></tr>
<tr><td>Safari</td><td><a href="http://selenium-release.storage.googleapis.com/index.html">SafariDriver.safariextz</a></td></tr>
</tbody></table>

Let's start with an example:

	@dialect=webapp
	@target=google
	Scenario: Test Google using Firefox
	
	  Given I use firefox browser
	  When I visit /
	  When I type apigeek into q
	  When I click btnG
	  When I wait until page is apigeek - Google Search
	  Then I stop using browser
	  Then dump

