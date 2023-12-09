/* eslint-disable @typescript-eslint/no-namespace */
import type { CustomMount } from './customMount';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      mount: CustomMount;
    }
  }
}

export {};
