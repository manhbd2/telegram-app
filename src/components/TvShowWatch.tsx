'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

import type { Season, Show } from '@/types/movie';

import { Icons } from './icons/icons';
import ShowDetail from './shows/ShowDetail';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import EmbedPlayer from './ui/EmbedPlayer';

type ITab = {
  id: number;
  title: string;
};
type ITvShowWatchProps = {
  show: Show;
};

const tabs: ITab[] = [
  {
    id: 1,
    title: 'Episodes',
  },
  {
    id: 2,
    title: 'Collection',
  },
];

function TvShowWatch(props: ITvShowWatchProps) {
  const { show } = props;

  const [currentTab, setCurrentTab] = React.useState<ITab>(tabs[0]);
  const [season, setSeason] = React.useState<Season>(show.seasons?.[0]);

  const handleClick = (_tab: ITab) => {
    setCurrentTab(_tab);
  };

  return (
    <div>
      <div className="h-56 w-full">
        <EmbedPlayer url={`https://vidsrc.cc/v2/embed/tv/${show.id}`} />
      </div>
      <ShowDetail show={show} />
      <div className="p-4 pt-0">
        <div className="flex items-center gap-x-6">
          {tabs.map((tab) => {
            return (
              <div
                key={tab.id}
                style={
                  tab.id === currentTab.id
                    ? { borderTop: '2px solid #ee1520', color: '#ffffff' }
                    : { borderTop: '2px solid transparent' }
                }
                className="w-fit pt-2 text-[#90908f]"
                onClick={() => handleClick(tab)}
              >
                {tab.title}
              </div>
            );
          })}
        </div>
        {show.seasons?.length && (
          <div className="relative mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center">
                  <span className="text-[#90908f]">{season?.name}</span>
                  <Icons.ChevronRight
                    size={23}
                    className="ml-1 rotate-90 text-[#90908f]"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {show.seasons?.map((item: Season) => {
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => setSeason(item)}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}

export default TvShowWatch;
