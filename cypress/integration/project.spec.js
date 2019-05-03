/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/project/requests')
    })

    it('Show summary', () => {
        cy.get('[data-cy=summary]').contains("Total downloads");
    })

    it('Show downloads', () => {
      cy.get("[data-cy=downloads]").get("tr").should('have.length', 8)
    })

    it('Show last 30 days downloads', () => {
      cy.get("[data-cy=downloads] button").click();
      cy.get("[data-cy=downloads]").get("tr").should('have.length', 31)
    })
})