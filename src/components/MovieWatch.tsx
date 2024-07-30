import React from 'react';

import { getEmbedPlayerUrl } from '@/libs/movie';
import { MediaType, type Show } from '@/types/movie';

import ShowCollection from './shows/ShowCollection';
import ShowDetail from './shows/ShowDetail';
import EmbedPlayer from './ui/EmbedPlayer';

type IMovieWatchProps = {
  show: Show;
};

function MovieWatch(props: IMovieWatchProps) {
  const { show } = props;

  return (
    <div>
      <div className="h-56 w-full">
        <EmbedPlayer url={getEmbedPlayerUrl(show.id, MediaType.MOVIE)} />
      </div>
      <ShowDetail show={show} />
      <div className="p-4 pt-0">
        <div style={{ borderTop: '2px solid #ee1520' }} className="w-fit pt-2">
          <h6>Collection</h6>
        </div>
        {show.belongs_to_collection?.id ? (
          <div className="mt-4">
            <ShowCollection
              show={show}
              collectionId={show.belongs_to_collection.id}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default MovieWatch;
