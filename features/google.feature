@skip
Feature: Web Browser

@dialect=webapp
@target=google
Scenario: Google using Browser

  Given I use chrome browser
  When I visit /
  When I type apigeek into q
  When I click btnG
  When I wait until page is apigeek - Google Search
#  Then dump
  And I stop using browser
