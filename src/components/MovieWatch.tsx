import React from 'react';

import type { Show } from '@/types/movie';

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
        <EmbedPlayer url={`https://vidsrc.cc/v2/embed/movie/${show.id}`} />
      </div>
      <ShowDetail show={show} />
      <div className="p-4 pt-0">
        <div style={{ borderTop: '2px solid #ee1520' }} className="w-fit pt-2">
          <h6>Collection</h6>
        </div>
      </div>
    </div>
  );
}

export default MovieWatch;
