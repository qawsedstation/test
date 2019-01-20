Feature: Authorize Payment
  As a ecomerce customer using WorldPay testing example
  I need to be able to make a payment
  So that I can buy a product from the main page

   Scenario: The user is able to see the product
    Given I am on the payment page
    Then I should see some the the product details that I'm going to buy

   Scenario: The user is able to see the payment form
    Given I am on the payment page
    Then I should see some the payment page 

   Scenario: The user can buy a product using debit or credit card
    Given I am on the payment page
    When I type "1111111111111111" into the card number input field
    When I type "G GEORGIADIS" into the cardholder input field
    When I type "11" into the month input field
    When I type "2020" into the year input field
    When I type "323" into the cvv input field
    Then I click into the payment button
    And I should see the spinner
    And I should see that the page is Authorized

   Scenario: The user can cancell the payment he just made
    Given I am on the payment page
    When I type "1111111111111111" into the card number input field
    When I type "G GEORGIADIS" into the cardholder input field
    When I type "11" into the month input field
    When I type "2020" into the year input field
    When I type "323" into the cvv input field
    Then I click into the payment button
    And I should see the spinner
    And I should see that the page is Authorized
    And I click into the cancel button
    And I can confirm that the payment is cancelled

