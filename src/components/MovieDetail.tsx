'use client';

import Link from 'next/link';
import React from 'react';
import YouTube from 'react-youtube';

import {
  getImageUrl,
  getTrailer,
  getWatchPath,
  getYearFromShow,
} from '@/libs/movie';
import type { MediaType, ShowWithGenreAndVideo } from '@/types/movie';

import { Icons } from './icons/icons';
import MyImage from './shows/MyImage';
import { Button } from './ui/Button';

type IMovieDetailProps = {
  type: MediaType;
  show: ShowWithGenreAndVideo;
};

const options: Record<string, object> = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    rel: 0,
    mute: 1,
    loop: 1,
    autoplay: 0,
    controls: 1,
    showinfo: 1,
    disablekb: 1,
    enablejsapi: 1,
    playsinline: 1,
    cc_load_policy: 0,
    modestbranding: 3,
  },
};

function MovieDetail(props: IMovieDetailProps) {
  const { show, type } = props;

  return (
    <div className="relative">
      <div className="absolute right-6 top-8 z-10">
        <Link prefetch={false} href="/">
          <Icons.Close className="fill-current" aria-hidden="true" />
        </Link>
      </div>
      <div className="absolute inset-0 z-0 h-[50vh] w-full">
        <MyImage
          src={getImageUrl(show)}
          alt={show?.title ?? 'poster'}
          className="-z-40 h-auto w-full object-cover opacity-70"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
          fill
          priority
        />
      </div>
      <div
        style={{ WebkitBackdropFilter: 'blur(64px)' }}
        className="w-full bg-[#00000014] p-4 text-sm backdrop-blur-3xl"
      >
        <div className="flex items-center justify-center pt-16">
          <MyImage
            src={getImageUrl(show)}
            alt={show?.title ?? 'poster'}
            className="-z-40 h-[210px] w-[155px] object-cover"
            width={135}
            height={190}
            priority
          />
        </div>
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm sm:text-base">
          <p className="font-semibold text-green-400">
            {Math.round((Number(show?.vote_average) / 10) * 100) ?? '-'}% Match
          </p>
          {getYearFromShow(show) ? <p>{getYearFromShow(show)}</p> : null}
          {show?.original_language && (
            <span className="grid h-4 w-7 place-items-center text-xs font-bold text-neutral-400 ring-1 ring-neutral-400">
              {show.original_language.toUpperCase()}
            </span>
          )}
        </div>
        <div className="mt-4">
          <Link prefetch={false} href={getWatchPath(show.id, type)}>
            <Button
              aria-label="Play video"
              className="h-auto w-full shrink-0 gap-2 rounded-[2px] bg-[#EE1520] text-white"
            >
              <Icons.Play className="fill-current" aria-hidden="true" />
              Play
            </Button>
          </Link>
        </div>
        <p className="mt-4">{show.overview || '---'}</p>
        <div className="mt-3 flex items-center gap-2 text-[#90908f] sm:text-sm">
          <span>Genres:</span>
          {show.genres?.length
            ? show?.genres?.map((genre) => genre.name).join(', ')
            : '---'}
        </div>
      </div>
      <div className="mt-1 bg-[#1A1A1A] px-4">
        <div style={{ borderTop: '2px solid #ee1520' }} className="w-fit pt-4">
          <h6>TRAILERS & MORE</h6>
        </div>
        <div className="pb-4">
          {getTrailer(show) && (
            <>
              <YouTube
                opts={options}
                id="video-trailer"
                title="video-trailer"
                videoId={getTrailer(show)}
                style={{ width: '100%', height: '100%' }}
                className="relative mt-4 aspect-video w-full"
                iframeClassName="relative w-[100%] h-[100%] opacity-1"
              />
              <div className="mt-2 text-sm">{`${show.original_name || show.original_title || ''} (Trailer)`}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
