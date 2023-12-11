import { typeDetails, types } from '../__mocks__/types.mocks';
import { pokemonDetail, pokemonList } from '../__mocks__/pokemons.mocks';
import * as reactRouter from '@tanstack/react-router';
import { Types } from './Types';

describe('Types page', () => {
  beforeEach(() => {
    cy.intercept('https://pokeapi.co/api/v2/type', types);
    cy.intercept('https://pokeapi.co/api/v2/type/normal', typeDetails);
    cy.intercept('https://pokeapi.co/api/v2/pokemon/*', pokemonDetail);
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset=*', pokemonList);
    cy.stub(reactRouter, 'useSearch').returns({ name: 'normal' });
    cy.stub(reactRouter, 'useNavigate')
      .as('navigate')
      .callsFake(() => cy.stub());
  });

  it('should render', () => {
    cy.mount(<Types />);

    cy.findByText('normal (Type)').should('exist');
    cy.contains(
      'The Normal type is one of the 20 types. There are at least 155 pokémons of type Normal (counting those that are Normal-type in at least one of their forms).',
    ).should('exist');
  });

  it('should navigate to pokemon page', () => {
    cy.mount(<Types />);

    cy.get('[alt=pidgey]').should('be.visible').and('have.prop', 'naturalWidth').should('be.greaterThan', 0);
    cy.get('[alt=pidgey]').should('be.visible').click();
    cy.get('@navigate').should('be.called');
  });

  it('should navigate to type page', () => {
    cy.mount(<Types />);

    cy.findByText('fighting').should('exist').click();
    cy.get('@navigate').should('be.called');
  });
});
