/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


// Amazon Cognito
const loginToCognito = (username: string, password: string) => {
  Cypress.log({
    displayName: "COGNITO LOGIN",
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false
  });

  cy.visit("/");
  cy.get("[data-cy=\"app-bar-menu\"]").click();
  cy.get("[data-cy=\"login-mobile\"]").click();

  cy.origin(
    "https://auth.pepy.tech",
    {
      args: {
        username,
        password
      }
    },
    ({ username, password }) => {
      Cypress.on("uncaught:exception", (err) => {
        return false;
      });
      cy.contains("Sign in");
      // Cognito log in page has some elements of the same id but are off screen.
      // We only want the visible elements to log in
      console.log("Username", username);
      cy.get("input[name=\"username\"]").type(username);
      cy.contains("Next").click();

      cy.get("input[name=\"password\"]").type(password, {
        // use log: false to prevent your password from showing in the Command Log
        log: false
      });
      cy.contains("Continue").click();
    }
  );

  // give a few seconds for redirect to settle
  cy.wait(5000);
};

// right now our custom command is light. More on this later!
Cypress.Commands.add("loginByCognito", (username, password) => {
  return loginToCognito(username, password);
});






























