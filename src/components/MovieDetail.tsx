/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import React from 'react';

import {
  getEmbedPlayerUrl,
  getNameFromShow,
  getPreviewUrl,
  getYearFromShow,
} from '@/libs/movie';
import MovieService from '@/services/MovieService';
import type {
  Episode,
  Season,
  SeasonDetail,
  ShowWithGenreAndVideo,
} from '@/types/movie';
import { MediaType } from '@/types/movie';

import { Icons } from './icons/icons';
import MyImage from './shows/MyImage';
import ShowRecommendation from './shows/ShowRecommendation';
import { Button } from './ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu';
import EmbedPlayer from './ui/EmbedPlayer';
import EmbedYoutube from './ui/EmbedYoutube';
import LoadingComponent from './ui/LoadingComponent';

type IMovieDetailProps = {
  type: MediaType;
  season: SeasonDetail;
  show: ShowWithGenreAndVideo;
};

type ITab = {
  key: string;
  title: string;
};

type IShowMetadata = {
  episode: Episode;
  season: Season | null;
  seasonDetail: SeasonDetail;
};

const tabs: ITab[] = [
  {
    key: 'episode',
    title: 'Episodes',
  },
  {
    key: 'recommend',
    title: 'Recommendations',
  },
];

function MovieDetail(props: IMovieDetailProps) {
  const { show, type, season } = props;

  const defaultTab: string =
    type === MediaType.MOVIE ? tabs[1].key : tabs[0].key;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [playing, setPlaying] = React.useState<boolean>(false);
  const [currentTab, setCurrentTab] = React.useState<string>(defaultTab);
  const [showMetadata, setShowMetadata] = React.useState<IShowMetadata>({
    seasonDetail: season,
    episode: season?.episodes?.[0],
    season: show?.seasons ? show.seasons[1] : null,
  });

  const handleLoadSeason = React.useCallback(
    async (id: number, seasonNumber: number) => {
      setLoading(true);
      const seasonDetailResponse: SeasonDetail = await MovieService.getSeason(
        id,
        seasonNumber,
      );
      setLoading(false);
      setShowMetadata((prevState: IShowMetadata) => ({
        ...prevState,
        seasonDetail: seasonDetailResponse,
      }));
    },
    [],
  );

  React.useEffect(() => {
    if (showMetadata.season?.id === season?.id || !showMetadata.season) {
      return;
    }
    handleLoadSeason(show.id, showMetadata.season.season_number);
  }, [show, showMetadata.season, season, handleLoadSeason]);

  const handlePlay = (): void => {
    setPlaying(true);
  };

  const handleChangeSeason = (_season: Season): void => {
    setShowMetadata((prevState: IShowMetadata) => ({
      ...prevState,
      season: _season,
    }));
  };

  const handleChangeEpisode = (_episode: Episode): void => {
    handlePlay();
    setShowMetadata((prevState: IShowMetadata) => ({
      ...prevState,
      episode: _episode,
    }));
  };

  const handleGetEmbedPlayerUrl = React.useMemo((): string => {
    if (type === MediaType.MOVIE) {
      return getEmbedPlayerUrl(show.id, type);
    }

    const seasonNumber = showMetadata.season?.season_number ?? 1;
    const episodeNumber = showMetadata.episode?.episode_number ?? 1;
    return getEmbedPlayerUrl(show.id, type, seasonNumber, episodeNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, show?.id, showMetadata?.episode]);

  console.log(handleGetEmbedPlayerUrl);

  return (
    <div className="relative bg-[#1A1A1A]">
      <div className="h-56 w-full">
        {!playing ? (
          <EmbedYoutube show={show} />
        ) : (
          <EmbedPlayer url={handleGetEmbedPlayerUrl} />
        )}
      </div>
      <div
        style={{ WebkitBackdropFilter: 'blur(64px)' }}
        className="relative w-full bg-[#00000014] p-4 text-sm backdrop-blur-3xl"
      >
        <h6>{getNameFromShow(show)}</h6>
        <div className="mt-2 flex items-center space-x-2 text-sm sm:text-base">
          <p className="font-semibold text-green-400">
            {Math.round((Number(show?.vote_average) / 10) * 100) ?? '-'}% match
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
        <div className="mt-4">
          <Button
            onClick={handlePlay}
            aria-label="Play video"
            className="h-auto w-full shrink-0 gap-2 rounded-[4px] py-2 font-medium"
          >
            <Icons.Play className="size-5 fill-current" aria-hidden="true" />
            Play
          </Button>
        </div>
        <p className="mt-4">{show.overview || '---'}</p>
        <div className="mt-3 text-[#90908f] sm:text-sm">
          <span>Genres: </span>
          {show.genres?.length
            ? show?.genres?.map((genre) => genre.name).join(', ')
            : '---'}
        </div>
      </div>
      <div className="p-4 pt-0">
        <div className="flex items-center gap-x-6">
          {tabs.map((tab: ITab) => {
            if (type === MediaType.MOVIE && tab.key === 'episode') {
              return null;
            }
            return (
              <div
                key={tab.key}
                style={
                  tab.key === currentTab
                    ? { borderTop: '3px solid #ee1520', color: '#ffffff' }
                    : { borderTop: '3px solid transparent' }
                }
                onClick={() => setCurrentTab(tab.key)}
                className="w-fit pt-2 text-[#90908f]"
              >
                {tab.title}
              </div>
            );
          })}
        </div>
        {show.seasons?.length && currentTab === 'episode' ? (
          <div className="relative mt-3">
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
                  if (!item.season_number) {
                    return null;
                  }
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
        ) : null}
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <LoadingComponent />
          </div>
        ) : showMetadata?.seasonDetail?.episodes && currentTab === 'episode' ? (
          <div className="mt-3 text-sm">
            {showMetadata.seasonDetail.episodes.map((item: Episode) => {
              return (
                <div
                  key={item.id}
                  className="mb-4"
                  onClick={() => handleChangeEpisode(item)}
                >
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
                        size={48}
                        strokeWidth={1.5}
                        className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 text-[#ffffff]"
                      />
                    </div>
                    <div>
                      <h6>{`${item.episode_number}. ${item.name}`}</h6>
                      <p>{item.air_date}</p>
                    </div>
                  </div>
                  <div className="mt-2">{item.overview || '---'}</div>
                </div>
              );
            })}
          </div>
        ) : null}
        {currentTab === 'recommend' ? (
          <ShowRecommendation show={show} type={type} />
        ) : null}
      </div>
    </div>
  );
}

export default MovieDetail;
