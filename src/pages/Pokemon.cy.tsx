import { Pokemon } from './Pokemon';

import * as reactRouter from '@tanstack/react-router';
import { evolutionDetail, evolutionDetailSingle, pokemonDetail } from '../__mocks__/pokemons.mocks';

describe('Pokemon page', () => {
  beforeEach(() => {
    cy.stub(reactRouter, 'useSearch').returns({ name: 'bulbasaur' });
    cy.stub(reactRouter, 'useNavigate')
      .as('navigate')
      .callsFake(() => cy.stub());
    cy.intercept('https://pokeapi.co/api/v2/pokemon/bulbasaur', pokemonDetail);
    cy.intercept('https://pokeapi.co/api/v2/evolution-chain/1', evolutionDetail);
  });

  it('should render', () => {
    cy.mount(<Pokemon />);

    cy.findByText('#1').should('exist');
    cy.findByText('bulbasaur').should('exist');

    cy.get('[alt=bulbasaur]').should('be.visible').and('have.prop', 'naturalWidth').should('be.greaterThan', 0);
    cy.get('[alt="bulbasaur gif"]').should('be.visible').and('have.prop', 'naturalWidth').should('be.greaterThan', 0);
    cy.get('[alt=grass]').should('be.visible').and('have.prop', 'naturalWidth').should('be.greaterThan', 0);
    cy.get('[alt=poison]').should('be.visible').and('have.prop', 'naturalWidth').should('be.greaterThan', 0);

    cy.findByText('Height').should('exist');
    cy.findByText('0.7m').should('exist');
    cy.findByText('Weight').should('exist');
    cy.findByText('6.9Kg').should('exist');

    cy.findByText('About').should('exist');
    cy.findByText(
      'A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.',
    ).should('exist');

    cy.findByText('Abilities').should('exist');
    cy.findByText('overgrow').should('exist');
    cy.findByText('chlorophyll').should('exist');

    cy.findByText('Base Stats').should('exist');
    cy.findByText('hp').should('exist');
    cy.findAllByText('45').should('have.length', 2);
    cy.findByText('Evolution').should('exist');
    cy.findByTestId('pokemon-detail-evolution-chain').find('div').should('have.length', 3);
  });

  it('should show no evolution', () => {
    cy.intercept('https://pokeapi.co/api/v2/evolution-chain/1', evolutionDetailSingle);
    cy.mount(<Pokemon />);

    cy.findByText('Evolution').should('exist');
    cy.findByText('This Pokémon does not evolve.').should('exist');
    cy.findByTestId('pokemon-detail-evolution-chain').find('div').should('have.length', 1);
  });

  it('should show details', () => {
    cy.intercept('https://pokeapi.co/api/v2/evolution-chain/1', evolutionDetailSingle);
    cy.mount(<Pokemon />);

    cy.findByText('Details').should('exist').click();
    cy.findByText('Baby').should('exist');
    cy.findByText('Legendary').should('exist');
    cy.findByText('Mythical').should('exist');
    cy.findAllByTestId('CancelRoundedIcon').should('have.length', 3);
  });
});
