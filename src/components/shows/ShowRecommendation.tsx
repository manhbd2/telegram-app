/* eslint-disable no-nested-ternary */
import React from 'react';

import MovieService from '@/services/MovieService';
import type { RecommendationResponse, Show } from '@/types/movie';

import LoadingComponent from '../ui/LoadingComponent';
import ShowCard from './ShowCard';

type IShowRecommendationProps = {
  show: Show;
};

function ShowRecommendation(props: IShowRecommendationProps) {
  const { show } = props;

  const [data, setData] = React.useState<Show[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleResponseData = React.useCallback(
    (response: RecommendationResponse) => {
      const shows: Show[] = response?.results || [];
      if (!shows?.length) setData(shows);
      setData(shows.filter((item) => item.backdrop_path || item.poster_path));
    },
    [],
  );

  React.useEffect(() => {
    setLoading(true);
    MovieService.getMovieRecommendation(show.id, show.media_type)
      .then((response: RecommendationResponse) => {
        handleResponseData(response);
      })
      .finally(() => setLoading(false));
  }, [show, handleResponseData]);

  return (
    <div>
      {loading ? (
        <div className="pt-8">
          <LoadingComponent />
        </div>
      ) : data?.length ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {data?.map((item: Show) => {
            return <ShowCard key={item.id} show={item} />;
          })}
        </div>
      ) : null}
    </div>
  );
}

export default ShowRecommendation;
