/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { getDetailPath, getPreviewImageUrl } from '@/libs/movie';
import MovieService from '@/services/MovieService';
import type { Collection, CollectionPath, Show } from '@/types/movie';

type IShowCollectionProps = {
  show: Show;
  collectionId: number;
};

function ShowCollection(props: IShowCollectionProps) {
  const { show, collectionId } = props;
  const [collection, setCollection] = React.useState<Collection | null>();

console.log(show);

  const router = useRouter();

  React.useEffect(() => {
    MovieService.getCollection(collectionId).then((response: Collection) =>
      setCollection(response),
    );
  }, [collectionId]);

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '/images/grey-thumbnail.jpg';
  };

  const handleClick = () => {
    router.push(getDetailPath(show));
  };

  if (!collection?.parts?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {collection.parts.map((part: CollectionPath) => {
        return (
          <div className="h-40" key={part.id} onClick={handleClick}>
            <img
              alt={part.title ?? 'poster'}
              onError={imageOnErrorHandler}
              src={getPreviewImageUrl(part.poster_path, part.backdrop_path)}
              className="size-full cursor-pointer rounded-md object-cover transition-all md:hover:scale-110"
            />
          </div>
        );
      })}
    </div>
  );
}

export default ShowCollection;
