import Link from 'next/link';
import React from 'react';

import { getImageUrl, getWatchPath } from '@/libs/movie';
import type { Show } from '@/types/movie';

import { Icons } from '../icons/icons';
import { Button } from '../ui/Button';
import MyImage from './MyImage';

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
              src={getImageUrl(show)}
              alt={show?.title ?? 'poster'}
              className="-z-40 h-auto w-full object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
              fill
              priority
            />
            <div className="absolute inset-0 z-10">
              <div className="absolute bottom-20 w-full">
                <div className="mt-4 flex items-center justify-center gap-x-2">
                  <Link
                    prefetch={false}
                    href={getWatchPath(show?.id, show?.media_type)}
                  >
                    <Button
                      aria-label="Play video"
                      className="h-auto shrink-0 gap-2 rounded-sm px-9 py-2"
                    >
                      <Icons.Play
                        className="size-5 fill-current"
                        aria-hidden="true"
                      />
                      Play
                    </Button>
                  </Link>
                  <Button
                    aria-label="Open show's details modal"
                    variant="outline"
                    className="h-auto shrink-0 gap-2 rounded-sm px-9 py-2"
                  >
                    <Icons.Info aria-hidden="true" className="size-5" />
                    Info
                  </Button>
                </div>
              </div>
            </div>{' '}
            <div className="absolute inset-0 right-[12.09%] z-[8] bg-gradient-to-r from-secondary to-85%" />
            <div className="absolute inset-x-0 -bottom-px z-[8] h-[14.7vw] bg-gradient-to-b from-background/0 from-30% via-background/30 via-50% to-background to-80%" />
          </div>
          <div className="relative inset-0 -z-50 mb-5 pb-[80%] sm:pb-[40%]" />
        </>
      )}
    </section>
  );
}

export default Header;
