import { RootRoute, Route, Router } from '@tanstack/react-router';
import { LandingPage } from './pages/LandingPage';
import { Layout } from './components/Layout';
import { Pokemon } from './pages/Pokemon';

export interface PokemonSearchParams {
  name: string;
}

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

const routeTree = rootRoute.addChildren([landingPage, pokemonsPage.addChildren([pokemonPage])]);

export const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
