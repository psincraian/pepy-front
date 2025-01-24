describe("Should login user", () => {
  it("With valid credentials", () => {
    cy.loginByCognito(Cypress.env("PEPY_TEST_USER_EMAIL"), Cypress.env("PEPY_TEST_USER_PASSWORD"));

    cy.visit("/user");
    cy.contains("petrutest");
  });
});