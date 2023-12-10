import { SearchContextProvider } from '../../store/SearchContext';
import { SearchBar } from './SearchBar';
import { pokemonList } from '../../__mocks__/pokemons.mocks';
import { types } from '../../__mocks__/types.mocks';

import * as reactRouter from '@tanstack/react-router';

describe('Search Bar', () => {
  beforeEach(() => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/*', pokemonList);
    cy.intercept('https://pokeapi.co/api/v2/type', types);
    cy.intercept('/PokeAPI/**', '/public/images/pokemon.png');
    cy.stub(reactRouter, 'useNavigate')
      .as('navigate')
      .callsFake(() => cy.stub());
  });

  it('should render', () => {
    cy.mount(
      <SearchContextProvider>
        <SearchBar />
      </SearchContextProvider>,
    );
    cy.get('input').should('exist');
  });

  it('should search', () => {
    cy.mount(
      <SearchContextProvider>
        <SearchBar />
      </SearchContextProvider>,
    );
    cy.get('input').should('exist').click().type('bulb');
    cy.findByText('bulbasaur').should('exist');
  });

  it('should navigate to pokemon page', () => {
    cy.mount(
      <SearchContextProvider>
        <SearchBar />
      </SearchContextProvider>,
    );
    cy.get('input').should('exist').click();
    cy.findByText('bulbasaur').should('exist').click();
    cy.get('@navigate').should('be.called');
  });
});
