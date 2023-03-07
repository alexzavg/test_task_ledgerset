Feature: Send an email via i.ua service

  Scenario: User logs into i.ua and sends an email
    Given The User logged in to the system 
    And The User navigated to the Postal Service page
    Then The menu options are available: "Вхідні, Відправлені, Чернетки, Видалені, Спам"
    When The User click on the "Створити листа" link
    Then The "Створити листа" page is displayed properly
    When The User fills all required information for the letter
    And The User clicks "Надіслати"
    Then The email is successfully sent