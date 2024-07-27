/* eslint-disable no-param-reassign */
import React from 'react';

import { getImageUrl } from '@/libs/movie';
import type { Show } from '@/types/movie';

type IShowCardProps = {
  show: Show;
};

function ShowCard(props: IShowCardProps) {
  const { show } = props;

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '/images/grey-thumbnail.jpg';
  };

  return (
    <picture className="relative aspect-[2/3]">
      <img
        src={getImageUrl(show)}
        alt={show.title ?? show.name ?? 'poster'}
        className="size-full cursor-pointer rounded-lg px-1 transition-all md:hover:scale-110"
        style={{
          objectFit: 'cover',
        }}
        onError={imageOnErrorHandler}
      />
    </picture>
  );
}

export default ShowCard;
