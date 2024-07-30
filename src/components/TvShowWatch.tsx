'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

import { getPreviewUrl } from '@/libs/movie';
import MovieService from '@/services/MovieService';
import type { Episode, Season, SeasonDetail, Show } from '@/types/movie';

import { Icons } from './icons/icons';
import MyImage from './shows/MyImage';
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
  season: SeasonDetail;
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

  const index: number = show?.seasons?.length ? show.seasons.length - 1 : 0;
  const [currentTab, setCurrentTab] = React.useState<ITab>(tabs[0]);
  const [season, setSeason] = React.useState<Season>(show.seasons?.[index]);
  const [seasonDetail, setSeasonDetail] = React.useState<SeasonDetail>(
    props.season,
  );

  const handleLoadSeason = React.useCallback(
    async (id: number, seasonNumber: number) => {
      const seasonDetailResponse: SeasonDetail = await MovieService.getSeason(
        id,
        seasonNumber,
      );
      setSeasonDetail(seasonDetailResponse);
    },
    [],
  );

  React.useEffect(() => {
    if (season.id === props.season.id) {
      return;
    }
    handleLoadSeason(show.id, season.season_number);
  }, [show, season, seasonDetail, props.season, handleLoadSeason]);

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
        {seasonDetail?.episodes?.length ? (
          <div className="mt-4 text-sm">
            {seasonDetail.episodes.map((item: Episode) => {
              return (
                <div key={item.id} className="mb-4">
                  <div className="flex items-center gap-x-2">
                    <div className="relative h-[75px] w-[120px] shrink-0">
                      <MyImage
                        alt="preview"
                        width={120}
                        height={75}
                        className="h-[75px] w-[120px] shrink-0 rounded-sm"
                        src={getPreviewUrl(item)}
                      />
                      <Icons.CirclePlay
                        size={32}
                        strokeWidth={1.5}
                        className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 text-[#ffffff]"
                      />
                    </div>
                    <div>
                      <h6>{item.name}</h6>
                      <p>{item.air_date}</p>
                    </div>
                  </div>
                  <div className="mt-2">{item.overview || '---'}</div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TvShowWatch;
