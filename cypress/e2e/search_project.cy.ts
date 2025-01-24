describe('Should show project page', () => {
  it('Should navigate to the project page', () => {
    cy.loginByCognito(Cypress.env("PEPY_TEST_USER_EMAIL"), Cypress.env("PEPY_TEST_USER_PASSWORD"));
    cy.visit('/', {failOnStatusCode: false})

    cy.get("#search-bar-input").type("requests{enter}");
    cy.contains("requests");
  })
})