'use client';

import React from 'react';

import useTelegram from '@/hooks/useTelegram';
import type { CategorizedShows, Show } from '@/types/movie';

import Header from './shows/Header';

type IMovieHomeProps = {
  categorizedShows: CategorizedShows[];
};

function MovieHome(props: IMovieHomeProps) {
  const { categorizedShows } = props;
  const { webApp } = useTelegram();

  const firstShow: Show = categorizedShows?.[0]?.shows?.[0];

  return (
    <div>
      <Header show={firstShow} />
      <button type="submit" onClick={() => webApp?.showAlert('Hello world!')}>
        Show Alert!
      </button>
    </div>
  );
}

export default MovieHome;
