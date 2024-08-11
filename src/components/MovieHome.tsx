'use client';

import React from 'react';

import useTelegram from '@/hooks/useTelegram';
import type { CategorizedShows, Show } from '@/types/movie';

import Header from './shows/Header';
import ShowsCarousel from './shows/ShowsCarousel';
import SiteHeader from './shows/SiteHeader';

type IMovieHomeProps = {
  randomShow: Show;
  categorizedShows: CategorizedShows[];
};

function MovieHome(props: IMovieHomeProps) {
  const { randomShow, categorizedShows } = props;

  const { WebApp } = useTelegram();

  React.useEffect(() => {
    WebApp?.BackButton?.hide();
  }, [WebApp]);

  const userName: string = WebApp?.initDataUnsafe.user?.username || ' User';

  return (
    <div className="relative">
      <SiteHeader userName={userName} />
      <Header show={randomShow} />
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
