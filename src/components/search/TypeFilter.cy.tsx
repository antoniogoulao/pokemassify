import { SearchContextProvider } from '../../store/SearchContext';
import { TypeFilter } from './TypeFilter';
import { types } from '../../__mocks__/types.mocks';
import { pokemonList } from '../../__mocks__/pokemons.mocks';

import * as reactRouter from '@tanstack/react-router';
import { Stack } from '@mui/material';

describe('Type Filter', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.intercept('https://pokeapi.co/api/v2/pokemon/*', pokemonList);
    cy.intercept('https://pokeapi.co/api/v2/type', types);
    cy.stub(reactRouter, 'useNavigate')
      .as('navigate')
      .callsFake(() => cy.stub());
  });

  const mount = () => {
    cy.mount(
      <SearchContextProvider>
        <Stack flex={1} width="100%">
          <TypeFilter />
        </Stack>
      </SearchContextProvider>,
    );
  };

  it('should render', () => {
    mount();
    cy.findByLabelText('Type').should('exist');
  });

  it('should show options on click', () => {
    mount();
    cy.findByRole('combobox', { name: 'Type' }).should('exist').click();
    cy.findByText('normal').should('exist').click();
    cy.findByRole('combobox', { name: 'Type' }).should('contain.text', 'normal');
  });

  it('should navigate to type detail', () => {
    mount();
    cy.findByRole('combobox', { name: 'Type' }).should('exist').click();
    cy.findAllByText('Details').should('exist').eq(0).click();
    cy.get('@navigate').should('be.called');
  });
});
