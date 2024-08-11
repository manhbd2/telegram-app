'use client';

import React from 'react';

import useTelegram from '@/hooks/useTelegram';
import type {
  CategorizedShow,
  CategorizedShows,
  RandomShow,
} from '@/types/movie';
import { MediaType } from '@/types/movie';

import Header from './shows/Header';
import ShowsCarousel from './shows/ShowsCarousel';
import SiteHeader from './shows/SiteHeader';

type IMovieHomeProps = {
  randomShow: RandomShow;
  categorizedShow: CategorizedShow;
};

function MovieHome(props: IMovieHomeProps) {
  const { WebApp } = useTelegram();

  const { randomShow, categorizedShow } = props;

  const [active, setActive] = React.useState<MediaType>(MediaType.ALL);

  React.useEffect(() => {
    WebApp?.BackButton?.hide();
  }, [WebApp]);

  const handleChangeType = (type: MediaType): void => {
    setActive(type === active ? MediaType.ALL : type);
  };

  const userName: string = WebApp?.initDataUnsafe.user?.username || ' User';

  return (
    <div className="relative">
      <SiteHeader
        active={active}
        userName={userName}
        onChangeType={handleChangeType}
      />
      <Header show={randomShow[active]} />
      {categorizedShow[active].map((item: CategorizedShows) => {
        if (!item.visible) {
          return null; // Skip hidden categories
        }
        return (
          <ShowsCarousel
            key={item.title}
            title={item.title}
            shows={item.shows}
          />
        );
      })}
    </div>
  );
}

export default MovieHome;
