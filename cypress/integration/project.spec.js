/// <reference types="Cypress" />

context('Actions', () => {
    it('Show summary', () => {
        cy.visit('http://localhost:3000/project/requests')
        cy.get('[data-cy=summary]').contains("Total downloads");
    })

    it('Show downloads', () => {
      cy.visit('http://localhost:3000/project/requests')
      cy.get("[data-cy=downloads]").get("table tr").should('have.length', 90)
    })

    it ('Show error when project not found', () => {
      cy.visit('http://localhost:3000/project/asoidj29383rjf4uncpw9cumem')
      cy.contains('404')
    })
})