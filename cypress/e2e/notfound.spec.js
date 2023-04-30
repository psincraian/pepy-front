/// <reference types="Cypress" />

context('Actions', () => {
    it('Show 404 page', () => {
        cy.visit('http://localhost:3000/random-page')
        cy.contains("Error 404");
    })
})