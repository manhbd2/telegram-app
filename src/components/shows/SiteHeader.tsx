/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/libs/utils';
import { MediaType } from '@/types/movie';

import { Icons } from '../icons/icons';

type ISiteHeaderProps = {
  active: string;
  userName: string;
  onChangeType: (type: MediaType) => void;
};

function SiteHeader(props: ISiteHeaderProps) {
  const { active, userName, onChangeType } = props;

  const router = useRouter();

  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  // change background color on scroll
  React.useEffect(() => {
    const changeBgColor = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener('scroll', changeBgColor);
    return () => window.removeEventListener('scroll', changeBgColor);
  }, [isScrolled]);

  return (
    <header className="sticky top-0 z-50 text-sm">
      <nav
        className={cn(
          'relative flex h-12 w-full items-center justify-between bg-gradient-to-b from-secondary/70 from-10% px-[4vw] transition-colors duration-300 md:sticky md:h-16',
          isScrolled ? 'bg-secondary shadow-md' : 'bg-transparent',
        )}
        style={
          isScrolled
            ? {
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgb(0 0 0 / .5)',
              }
            : {}
        }
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <h6 className="text-base">{`For ${userName}`}</h6>
            <div
              className={cn(
                'ml-2 items-center rounded-full border px-3 py-[3px] text-xs',
                active === 'tv' && 'bg-secondary',
              )}
              onClick={() => onChangeType(MediaType.TV)}
            >
              Tv Shows
            </div>
            <div
              className={cn(
                'ml-2 items-center rounded-full border px-3 py-[3px] text-xs',
                active === 'movie' && 'bg-secondary',
              )}
              onClick={() => onChangeType(MediaType.MOVIE)}
            >
              Movie
            </div>
          </div>
          <div>
            <Icons.Search
              aria-hidden="true"
              onClick={() => router.push('search')}
              className="size-6 cursor-pointer transition-opacity hover:opacity-75 active:scale-95"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
