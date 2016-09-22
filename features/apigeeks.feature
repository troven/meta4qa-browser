@target=apigeeks
Feature: Robot Apigeek

  @dialect=webapp
  Scenario: Apigeek via Browser

    Given I use chrome browser
    Given I load sample as text from ../features/google.feature
    When I visit /asbuilt/example/hello.html

    When I paste sample into feature
    When I click submit
    When I save screenshot as hello.png
#    Then dump
    Then I stop using browser

  Scenario: Apigeek via Browser

    Given I use chrome browser
    When I visit /asbuilt/example/hello.html

    When I click //a
    When I save screenshot as index.png
#    Then dump
    Then I stop using browser
