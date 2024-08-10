/* eslint-disable no-nested-ternary */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import type { TmdbPagingResponse } from '@/enums/request-type';
import { debounce } from '@/libs/utils';
import MovieService from '@/services/MovieService';
import type { Show } from '@/types/movie';

import { Icons } from './icons/icons';
import ShowCard from './shows/ShowCard';
import LoadingComponent from './ui/LoadingComponent';
import SearchInput from './ui/SearchInput';

function SearchMovie() {
  const router = useRouter();

  const [data, setData] = React.useState<Show[]>([]);
  const [query, setQuery] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleResponseData = React.useCallback(
    (response: TmdbPagingResponse) => {
      const shows: Show[] = response?.results || [];
      if (!shows?.length) setData(shows);
      setData(shows.filter((show) => show.backdrop_path || show.poster_path));
    },
    [],
  );

  React.useEffect(() => {
    setLoading(true);
    MovieService.getShowTrending()
      .then((response: TmdbPagingResponse) => {
        handleResponseData(response);
      })
      .finally(() => setLoading(false));
  }, [handleResponseData]);

  const handleSearchMovie = React.useCallback(
    (_query: string) => {
      if (_query?.trim()?.length) {
        MovieService.searchMovies(_query)
          .then((response: TmdbPagingResponse) => {
            handleResponseData(response);
          })
          .finally(() => setLoading(false));
      } else {
        MovieService.getShowTrending()
          .then((response: TmdbPagingResponse) => {
            handleResponseData(response);
          })
          .finally(() => setLoading(false));
      }
    },
    [handleResponseData],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = React.useCallback(
    debounce((_query) => {
      const strValue = _query as string;
      handleSearchMovie(strValue);
    }, 800),
    [],
  );

  const handleChange = React.useCallback(
    (input: string): void => {
      setQuery(input);
      setLoading(true);
      debounceSearch(input);
    },
    [debounceSearch],
  );

  return (
    <div className="min-h-dvh w-full p-2">
      <div className="flex items-center">
        <div onClick={() => router.back()}>
          <Icons.ChevronLeft />
        </div>
        <SearchInput query={query} onChange={handleChange} />
      </div>
      {loading ? (
        <div
          style={{ height: 'calc(100vh - 45px)' }}
          className="flex w-full items-center justify-center"
        >
          <LoadingComponent />
        </div>
      ) : (
        <div>
          {query?.length && !data?.length ? (
            <div className="mt-8 w-full break-all text-sm">
              <div className="inline-block text-left text-sm">
                <p className="mb-2">{`Your search for "${query}" did not have any matches.`}</p>
                <p className="mb-2">Suggestions:</p>
                <ul className="list-disc pl-8">
                  <li>Try different keywords</li>
                  <li>Looking for a movie or TV show?</li>
                  <li>
                    Try using a movie, TV show title, an actor or director
                  </li>
                  <li>Try a genre, like comedy, romance, sports, or drama</li>
                </ul>
              </div>
            </div>
          ) : query?.length ? (
            <div>
              <h6 className="my-3 ml-[6px] text-sm">Movies & TV</h6>
              {data?.length ? (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {data?.map((show: Show) => {
                    return <ShowCard key={show.id} show={show} />;
                  })}
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <h6 className="my-3 ml-[6px] text-sm">Trending Now</h6>
              {data?.length ? (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {data?.map((show: Show) => {
                    return <ShowCard key={show.id} show={show} />;
                  })}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchMovie;
