import { SearchContextProvider } from '../../store/SearchContext';
import { TypeFilter } from './TypeFilter';
import { types } from '../../__mocks__/types.mocks';
import { pokemonList } from '../../__mocks__/pokemons.mocks';

describe('Type Filter', () => {
  beforeEach(() => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/*', pokemonList);
    cy.intercept('https://pokeapi.co/api/v2/type', types);
  });

  it('should render', () => {
    cy.mount(
      <SearchContextProvider>
        <TypeFilter />
      </SearchContextProvider>,
    );
    cy.findByLabelText('Type').should('exist');
  });

  it('should show options on click', () => {
    cy.mount(
      <SearchContextProvider>
        <TypeFilter />
      </SearchContextProvider>,
    );
    cy.findByRole('combobox', { name: 'Type' }).should('exist').click();
    cy.findByText('normal').should('exist').click();
    cy.findByRole('combobox', { name: 'Type' }).should('contain.text', 'normal');
  });
});
