import { mount, MountReturn } from 'cypress/react18';
import { AllTheProviders } from '../../src/test-utils/src/AllTheProviders';
import { ReactNode } from 'react';

export type CustomMount = (component: ReactNode) => Cypress.Chainable<MountReturn>;

export const customMount: CustomMount = (component) => {
  const wrapped = <AllTheProviders>{component}</AllTheProviders>;

  return mount(wrapped);
};
