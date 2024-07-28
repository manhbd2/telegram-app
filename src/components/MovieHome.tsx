'use client';

import React from 'react';

import useTelegram from '@/hooks/useTelegram';
import type { ExtendedWebApp } from '@/types/global';
import type { CategorizedShows, Show } from '@/types/movie';

import Header from './shows/Header';
import ShowsCarousel from './shows/ShowsCarousel';

type IMovieHomeProps = {
  categorizedShows: CategorizedShows[];
};

function MovieHome(props: IMovieHomeProps) {
  const { categorizedShows } = props;
  const { WebApp } = useTelegram();

  const webAppRef = React.useRef<ExtendedWebApp | null>();

  React.useEffect(() => {
    let ts: number | undefined;
    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const scroll = window.scrollY;
      const te = e.changedTouches[0].clientY;
      webAppRef.current?.showAlert(`scroll ${scroll}, ${ts}, ${te}`);
      if (scroll <= 0 && ts! < te) {
        e.preventDefault();
      } else {
        e.preventDefault();
      }
    };

    window.addEventListener('touchstart', onTouchStart, {
      passive: false,
    });
    window.addEventListener('touchmove', onTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  React.useEffect(() => {
    if (!WebApp?.initDataUnsafe?.user) return;
    webAppRef.current = WebApp;
    WebApp?.showAlert(`Hello ${WebApp.initDataUnsafe.user?.username}`);
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
