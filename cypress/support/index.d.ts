declare namespace Cypress {
  interface Chainable {
    loginByCognito(email: string, password: string): Chainable<void>;
  }
}