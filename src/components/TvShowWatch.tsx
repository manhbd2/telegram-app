'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

import {
  getEmbedPlayerUrl,
  getPreviewUrl,
  getYearFromShow,
} from '@/libs/movie';
import MovieService from '@/services/MovieService';
import {
  type Episode,
  MediaType,
  type Season,
  type SeasonDetail,
  type Show,
} from '@/types/movie';

import { Icons } from './icons/icons';
import MyImage from './shows/MyImage';
import ShowCollection from './shows/ShowCollection';
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

type IShowMetadata = {
  episode: Episode;
  season: Season | null;
  seasonDetail: SeasonDetail;
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
  const { show, season } = props;

  const [currentTab, setCurrentTab] = React.useState<number>(tabs[0].id);
  const [showMetadata, setShowMetadata] = React.useState<IShowMetadata>({
    seasonDetail: props.season,
    episode: season.episodes[0],
    season: show?.seasons ? show.seasons[show.seasons.length - 1] : null,
  });

  const handleLoadSeason = React.useCallback(
    async (id: number, seasonNumber: number) => {
      const seasonDetailResponse: SeasonDetail = await MovieService.getSeason(
        id,
        seasonNumber,
      );
      setShowMetadata((prevState: IShowMetadata) => ({
        ...prevState,
        seasonDetail: seasonDetailResponse,
      }));
    },
    [],
  );

  React.useEffect(() => {
    if (showMetadata.season?.id === season.id || !showMetadata.season) {
      return;
    }
    handleLoadSeason(show.id, showMetadata.season.season_number);
  }, [show, showMetadata.season, season, handleLoadSeason]);

  const handleClick = (_tab: ITab) => {
    setCurrentTab(_tab.id);
  };

  const handleChangeSeason = (_season: Season): void => {
    setShowMetadata((prevState: IShowMetadata) => ({
      ...prevState,
      season: _season,
    }));
  };

  const getEmbedUrl = () => {
    const { id } = show;
    const seasonNumber: number = showMetadata.season?.season_number || 1;
    const episodeNumber: number = showMetadata.episode.episode_number || 1;
    return getEmbedPlayerUrl(id, MediaType.TV, seasonNumber, episodeNumber);
  };

  return (
    <div>
      <div className="h-56 w-full">
        <EmbedPlayer url={getEmbedUrl()} />
      </div>
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
        <div>
          <h6 className="text-center">
            {`S${showMetadata.season?.season_number}:E${showMetadata.episode.episode_number} ${showMetadata.episode.name}`}
          </h6>
          <p className="mt-1">{showMetadata.episode.overview || '---'}</p>
        </div>
      </div>
      <div className="p-4 pt-0">
        <div className="flex items-center gap-x-6">
          {tabs.map((tab: ITab) => {
            return (
              <div
                key={tab.id}
                style={
                  tab.id === currentTab
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
        {show.seasons?.length && currentTab === 1 && (
          <div className="relative mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center">
                  <span className="text-[#90908f]">
                    {showMetadata.season?.name || ''}
                  </span>
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
                      onClick={() => handleChangeSeason(item)}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {showMetadata?.seasonDetail?.episodes?.length && currentTab === 1 ? (
          <div className="mt-4 text-sm">
            {showMetadata.seasonDetail.episodes.map((item: Episode) => {
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
        {show.belongs_to_collection?.id && currentTab === 2 ? (
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

export default TvShowWatch;
