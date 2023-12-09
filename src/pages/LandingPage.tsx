import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useGetPokemons } from '../hooks/pokemon';
import { isNilOrEmpty } from '../helpers';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { SearchView } from '../components/SearchView';
import { PokemonCard } from '../components/PokemonCard';

export const LandingPage = () => {
  const { ref, inView } = useInView();
  const { data, status, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetPokemons();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isError) {
    return <Typography>Error</Typography>;
  }

  if (status === 'pending') {
    return <Skeleton variant="rectangular" height={16} width={290} />;
  }

  if (isNilOrEmpty(data)) {
    return <Typography>We couldn't load any data</Typography>;
  }

  return (
    <>
      <SearchView />
      <Box width="100%" flex={1} flexWrap="wrap">
        {data.pages.map((page) => (
          <Box key={page.next ?? 'last'} display="flex" flexWrap="wrap" justifyContent="center">
            {page.results.map((pokemon) => (
              <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))}
          </Box>
        ))}
        <Button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
        </Button>
      </Box>
    </>
  );
};
