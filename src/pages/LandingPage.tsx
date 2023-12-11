import { Box, Button } from '@mui/material';
import { useGetPokemons } from '../hooks/pokemon';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { PokemonCard } from '../components/pokemon/PokemonCard';
import { NavBar } from '../components/NavBar';
import { AppErrorBoundary } from '../components/AppErrorBoundary';
import { ErrorBoundary } from '../shared/components/src/ErrorBoundary/ErrorBoundary';
import { FormattedMessage, useIntl } from 'react-intl';
import { Loading } from '../components/pokemon/Loading';
import { LoadingFailed } from '../components/LoadingFailed';
import { isNilOrEmpty } from '../helpers';

export const LandingPage = () => {
  const { ref, inView } = useInView();
  const { data, status, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetPokemons();
  const intl = useIntl();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) {
    return <AppErrorBoundary />;
  }

  if (status === 'pending') {
    return <Loading />;
  }

  if (isNilOrEmpty(data)) {
    return (
      <LoadingFailed
        message={intl.formatMessage({ id: 'error.emptyData', defaultMessage: 'We could not load any data' })}
      />
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
        <Button
          variant={'contained'}
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          color="info"
        >
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
