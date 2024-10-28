describe("Should login user", () => {
  it("With valid credentials", () => {
    cy.visit("/user/login", { failOnStatusCode: false });

    console.log(Cypress.env("PEPY_TEST_USER_EMAIL"))
    console.log(Cypress.env("CYPRESS_PEPY_TEST_USER_EMAIL"))
    cy.get("#email").type(Cypress.env("PEPY_TEST_USER_EMAIL"));
    cy.get("#password").type(Cypress.env('PEPY_TEST_USER_PASSWORD'));
    cy.get("#login-button").click();

    cy.contains("petrutest");
  });
});