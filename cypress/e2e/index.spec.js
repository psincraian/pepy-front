/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    it('Type to the searchbar', () => {
        cy.get('[data-cy=search-input]').get("input")
            .type("requests")
            .should('have.value', 'requests')
    })

    it('Shuld redirect to project page', () => {
        cy.get('[data-cy=search-input]').get("input")
            .type("requests");

        cy.get("[data-cy=search-button]")
            .click();
        
        cy.url()
            .should('include', '/project/requests');
    })
})