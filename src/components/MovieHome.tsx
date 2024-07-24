'use client';

import React from 'react';

import useTelegram from '@/hooks/useTelegram';
import type { CategorizedShows, Show } from '@/types/movie';

type IMovieHomeProps = {
  categorizedShows: CategorizedShows[];
};

function MovieHome(props: IMovieHomeProps) {
  const { categorizedShows } = props;
  const { webApp } = useTelegram();

  const firstShow: Show = categorizedShows?.[0]?.shows?.[0];

  return (
    <div>
      <div>Hello world!</div>
      <button type="submit" onClick={() => webApp?.showAlert('Hello world!')}>
        Show Alert!
      </button>
    </div>
  );
}

export default MovieHome;
