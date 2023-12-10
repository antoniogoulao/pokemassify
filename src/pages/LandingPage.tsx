import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useGetPokemons } from '../hooks/pokemon';
import { isNilOrEmpty } from '../helpers';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { PokemonCard } from '../components/pokemon/PokemonCard';
import { NavBar } from '../components/NavBar';
import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { ErrorBoundary } from '../shared/components/src/ErrorBoundary/ErrorBoundary';
import { FormattedMessage } from 'react-intl';

export const LandingPage = () => {
  const { ref, inView } = useInView();
  const { data, status, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetPokemons();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) {
    return (
      <Typography>
        <FormattedMessage id="error.generic" defaultMessage="Error" />
      </Typography>
    );
  }

  if (status === 'pending') {
    return <Skeleton variant="rectangular" height={16} width={290} />;
  }

  if (isNilOrEmpty(data)) {
    return (
      <Typography>
        <FormattedMessage id="error.emptyData" defaultMessage="We could not load any data" />
      </Typography>
    );
  }
  return (
    <ErrorBoundary fallback={<AppErrorBoundary />}>
      <NavBar />
      <Box width="100%" flex={1} flexWrap="wrap">
        {data.pages.map((page) => (
          <Box key={page.next ?? 'last'} display="flex" flexWrap="wrap" justifyContent="center">
            {page.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))}
          </Box>
        ))}
        <Button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? (
            <FormattedMessage id="load.more" defaultMessage="Loading more..." />
          ) : hasNextPage ? (
            <FormattedMessage id="action.loadMore" defaultMessage="Load Newer" />
          ) : (
            <FormattedMessage id="info.nothingToLoad" defaultMessage="Nothing more to load" />
          )}
        </Button>
      </Box>
    </ErrorBoundary>
  );
};
