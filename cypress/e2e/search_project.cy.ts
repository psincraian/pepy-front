describe('Should show project page', () => {
  it('Should navigate to the project page', () => {
    cy.visit('/', {failOnStatusCode: false})

    cy.get("#search-bar-input").type("requests{enter}");
    cy.contains("requests");
  })
})