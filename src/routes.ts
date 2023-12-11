import { RootRoute, Route, Router } from '@tanstack/react-router';
import { LandingPage } from './pages/LandingPage';
import { Layout } from './components/Layout';
import { Pokemon } from './pages/Pokemon';
import { Types } from './pages/Types';
import { PokemonSearchParams, TypeSearchParams } from './types/router';

const rootRoute = new RootRoute({ component: Layout });

const landingPage = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const pokemonsPage = new Route({
  getParentRoute: () => rootRoute,
  path: 'pokemon',
});

const pokemonPage = new Route({
  getParentRoute: () => pokemonsPage,
  path: '/',
  component: Pokemon,
  validateSearch: (search: Record<string, unknown>): PokemonSearchParams => {
    return {
      name: search.name ?? '',
    } as PokemonSearchParams;
  },
});

const typesPage = new Route({
  getParentRoute: () => rootRoute,
  path: 'type',
});

const typePage = new Route({
  getParentRoute: () => typesPage,
  path: '/',
  component: Types,
  validateSearch: (search: Record<string, unknown>): TypeSearchParams => {
    return {
      name: search.name ?? '',
    } as TypeSearchParams;
  },
});

const routeTree = rootRoute.addChildren([
  landingPage,
  pokemonsPage.addChildren([pokemonPage]),
  typesPage.addChildren([typePage]),
]);

export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
