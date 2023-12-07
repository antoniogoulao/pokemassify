import { Box, Button, Skeleton, Typography } from '@mui/material';
import { useGetPokemons } from '../hooks/pokemon';
import { isNilOrEmpty } from '../helpers';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Link } from '@tanstack/react-router';

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
      {data.pages.map((page) => (
        <Box key={page.next ?? 'last'}>
          {page.results.map((pokemon) => (
            <Link key={pokemon.name} to={`/pokemon`} search={{ name: pokemon.name }}>
              <Typography>{pokemon.name}</Typography>
            </Link>
          ))}
        </Box>
      ))}
      <Button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
      </Button>
    </>
  );
};
