describe('Should show project page', () => {
  it('Should navigate to the project page', () => {
    cy.visit('/', {failOnStatusCode: false})

    cy.get('.MuiInputBase-input').type('requests')
    cy.get('[data-cy="search-button"]').click()

    cy.contains('https://pypi.org/project/requests')
  })
})