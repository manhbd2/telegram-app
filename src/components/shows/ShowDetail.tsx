import React from 'react';

import { getYearFromShow } from '@/libs/movie';
import type { Show } from '@/types/movie';

type IShowDetailProps = {
  show: Show;
};

function ShowDetail(props: IShowDetailProps) {
  const { show } = props;
  return (
    <div className="p-4 text-sm">
      <h1>{show.name ?? show.title ?? ''}</h1>
      <div className="mt-1 flex items-center space-x-2 text-sm sm:text-base">
        <p className="font-semibold text-green-400">
          {Math.round((Number(show?.vote_average) / 10) * 100) ?? '-'}% Match
        </p>
        {getYearFromShow(show) ? <p>{getYearFromShow(show)}</p> : null}
        {show?.number_of_seasons ? (
          <p>{`${show.number_of_seasons} seasons`}</p>
        ) : null}
        {show?.original_language && (
          <span className="grid h-4 w-7 place-items-center text-xs font-bold text-neutral-400 ring-1 ring-neutral-400">
            {show.original_language.toUpperCase()}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 text-[#90908f] sm:text-sm">
        <span>Genres:</span>
        {show.genres?.length
          ? show?.genres?.map((genre) => genre.name).join(', ')
          : '---'}
      </div>
      <p className="mt-1">{show.overview || '---'}</p>
    </div>
  );
}

export default ShowDetail;
