/* eslint-disable no-nested-ternary */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import type { TmdbPagingResponse } from '@/enums/request-type';
import MovieService from '@/services/MovieService';
import type { Show } from '@/types/movie';

import { Icons } from './icons/icons';
import ShowCard from './shows/ShowCard';
import DebounceSearch from './ui/DebounceSearch';
import LoadingComponent from './ui/LoadingComponent';

function SearchMovie() {
  const router = useRouter();

  const [data, setData] = React.useState<Show[]>([]);
  const [query, setQuery] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleFetchData = async () => {
    setLoading(true);
    const response: TmdbPagingResponse = await MovieService.getShowTrending();
    setData(response?.results || []);
    setLoading(false);
  };

  React.useEffect(() => {
    handleFetchData();
  }, []);

  const handleChange = React.useCallback((input: string): void => {
    setQuery(input);
  }, []);

  return (
    <div className="min-h-dvh w-full p-2">
      <div className="flex items-center">
        <div onClick={() => router.back()}>
          <Icons.ChevronLeft />
        </div>
        <DebounceSearch query={query} onChange={handleChange} />
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
          {query?.length ? (
            <div>
              <h6 className="my-3 ml-[6px] text-sm">Movies & TV</h6>
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
