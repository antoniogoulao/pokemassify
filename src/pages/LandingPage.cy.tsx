import { LandingPage } from './LandingPage';
import { pokemonDetail, pokemonList } from '../__mocks__/pokemons.mocks';
import { types } from '../__mocks__/types.mocks';

import * as reactRouter from '@tanstack/react-router';

describe('Landing page', () => {
  beforeEach(() => {
    cy.intercept('https://pokeapi.co/api/v2/type', types);
    cy.intercept('https://pokeapi.co/api/v2/pokemon/*', pokemonDetail);
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset=*', pokemonList);
    cy.stub(reactRouter, 'useNavigate')
      .as('navigate')
      .callsFake(() => cy.stub());
  });

  it('should render', () => {
    cy.mount(<LandingPage />);

    cy.findByPlaceholderText('Search').should('exist');
    cy.findByLabelText('Type').should('exist');
    cy.findAllByText('bulbasaur').should('have.length', 24);
  });

  it('should navigate to pokemon page', () => {
    cy.mount(<LandingPage />);

    cy.findAllByText('bulbasaur').eq(0).click();
    cy.get('@navigate').should('be.called');
  });
});
