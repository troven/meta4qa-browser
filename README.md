Dialect For Web Apps
====================

A scenario describes a user story - essentially it's a list of instructions and expectations.

The framework interprets each step in the scenario using the [Gherkin Vocabulary](docs/vocab.md). 

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

