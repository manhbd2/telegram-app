/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { getDetailPath, getImageUrl } from '@/libs/movie';
import type { Show } from '@/types/movie';

type IShowCardProps = {
  show: Show;
};

function ShowCard(props: IShowCardProps) {
  const { show } = props;

  const router = useRouter();

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '/images/grey-thumbnail.jpg';
  };

  const handleClick = () => {
    router.push(getDetailPath(show));
  };

  return (
    <picture className="relative aspect-[2/3]" onClick={handleClick}>
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
