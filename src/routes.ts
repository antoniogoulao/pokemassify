import { createMemoryHistory, RootRoute, Route, Router } from '@tanstack/react-router';
import { LandingPage } from './pages/LandingPage';
import { Layout } from './components/Layout';

const rootRoute = new RootRoute({ component: Layout });

const landingPage = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const routeTree = rootRoute.addChildren([landingPage]);

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'], // Pass your initial url
});
export const router = new Router({ routeTree, history: memoryHistory });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
