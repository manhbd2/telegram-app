import { MediaType, Show } from '@/types/movie';
import React from 'react';
import MyImage from './MyImage';
import Link from 'next/link';

type IHeaderProps = {
  show: Show;
};
function Header(props: IHeaderProps) {
    const { show } = props;
  return (
    <section aria-label="Hero" className="w-full">
      {show && (
        <>
          <div className="absolute inset-0 z-0 h-[100vw] w-full sm:h-[56.25vw]">
            <MyImage
              src={`https://image.tmdb.org/t/p/original${
                show?.backdrop_path ?? show?.poster_path ?? ''
              }`}
              alt={show?.title ?? 'poster'}
              className="-z-40 h-auto w-full object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
              fill
              priority
            />
            <div className="absolute inset-0">
              <div className="absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[36%] flex-col justify-end space-y-2">
                <h1 className="text-[3vw] font-bold">
                  {show?.title ?? show?.name}
                </h1>
                <div className="flex space-x-2 text-[2vw] font-semibold md:text-[1.2vw]">
                  <p className="text-green-600">
                    {Math.round(show?.vote_average * 10) ?? '-'}% Match
                  </p>
                  {/* <p className="text-gray-300">{randomShow?.release_date ?? "-"}</p> */}
                  <p>{show?.release_date ?? '-'}</p>
                </div>
                {/* <p className="line-clamp-4 text-sm text-gray-300 md:text-base"> */}
                <p className="hidden text-[1.2vw] sm:line-clamp-3">
                  {show?.overview ?? '-'}
                </p>
                <div className="mt-[1.5vw] flex items-center space-x-2">
                  <Link
                    prefetch={false}
                    href={`/watch/${
                        show.media_type === MediaType.MOVIE ? 'movie' : 'tv'
                    }/${show.id}`}
                  >
                    <Button
                      aria-label="Play video"
                      className="h-auto shrink-0 gap-2 rounded-xl"
                    >
                      <Icons.play className="fill-current" aria-hidden="true" />
                      Play
                    </Button>
                  </Link>
                  <Button
                    aria-label="Open show's details modal"
                    variant="outline"
                    className="h-auto shrink-0 gap-2 rounded-xl"
                  >
                    <Icons.info aria-hidden="true" />
                    More Info
                  </Button>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 right-[26.09%] z-[8] bg-gradient-to-r to-85%" />
            <div className="absolute inset-x-0 -bottom-px z-[8] h-[14.7vw] bg-gradient-to-b from-30% via-50% to-80%" />
          </div>
          <div className="relative inset-0 -z-50 mb-5 pb-[60%] sm:pb-[40%]" />
        </>
      )}
    </section>
  );
}

export default Header;
