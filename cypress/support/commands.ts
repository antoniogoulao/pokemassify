import '@testing-library/cypress/add-commands';

import { customMount } from './customMount';

Cypress.Commands.add('mount', customMount);
