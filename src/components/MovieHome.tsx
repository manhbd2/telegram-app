'use client';

import React from 'react';

import useTelegram from '@/hooks/useTelegram';
import type { CategorizedShows, Show } from '@/types/movie';

import Header from './shows/Header';
import ShowsCarousel from './shows/ShowsCarousel';

type IMovieHomeProps = {
  categorizedShows: CategorizedShows[];
};

function MovieHome(props: IMovieHomeProps) {
  const { categorizedShows } = props;
  const { WebApp } = useTelegram();

  React.useEffect(() => {
    if (!WebApp?.initDataUnsafe?.user) return;
    WebApp?.showAlert(
      `Hello ${WebApp.initDataUnsafe.user?.username}, version: ${WebApp.version}, check ${WebApp.isVersionAtLeast('7.7')}`,
    );
  }, [WebApp]);

  const firstShow: Show = categorizedShows?.[0]?.shows?.[0];

  return (
    <div>
      <Header show={firstShow} />
      {categorizedShows.map((categorizedShow: CategorizedShows) => {
        if (!categorizedShow.visible) {
          return null; // Skip hidden categories
        }
        return (
          <ShowsCarousel
            key={categorizedShow.title}
            title={categorizedShow.title}
            shows={categorizedShow.shows}
          />
        );
      })}
    </div>
  );
}

export default MovieHome;
