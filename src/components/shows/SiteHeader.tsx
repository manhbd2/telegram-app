/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unused-expressions */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/libs/utils';

import { Icons } from '../icons/icons';

type ISiteHeaderProps = {
  userName: string;
};

function SiteHeader(props: ISiteHeaderProps) {
  const { userName } = props;

  const path = usePathname();
  const router = useRouter();

  console.log(path);
  

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
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <h6 className="text-base">{`For ${userName}`}</h6>
            <div
              className={cn(
                'ml-2 items-center rounded-full border px-3 py-[3px] text-xs',
                path === '/tv-show' && 'bg-secondary',
              )}
              onClick={() => router.push('tv-show')}
            >
              Tv Shows
            </div>
            <div
              className={cn(
                'ml-2 items-center rounded-full border px-3 py-[3px] text-xs',
                path === '/movie' && 'bg-secondary',
              )}
              onClick={() => router.push('movie')}
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
