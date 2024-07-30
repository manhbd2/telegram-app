/* eslint-disable no-control-regex */
import { Genre } from '@/enums/genre';
import type { ShowRequest } from '@/enums/request-type';
import { RequestType } from '@/enums/request-type';
import type { Episode, Show, ShowWithGenreAndVideo, VideoResult } from '@/types/movie';
import { MediaType } from '@/types/movie';

export const getRequestShow = (): ShowRequest[] => {
  return [
    {
      title: 'Trending Now',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.ALL },
      visible: true,
    },
    {
      title: 'Netflix TV Shows',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Popular TV Shows',
      req: {
        requestType: RequestType.TOP_RATED,
        mediaType: MediaType.TV,
        genre: Genre.TV_MOVIE,
      },
      visible: true,
    },
    {
      title: 'Korean Movies',
      req: {
        requestType: RequestType.KOREAN,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
    {
      title: 'Comedy Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.COMEDY,
      },
      visible: true,
    },
    {
      title: 'Action Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ACTION,
      },
      visible: true,
    },
    {
      title: 'Romance Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.ROMANCE,
      },
      visible: true,
    },
    {
      title: 'Scary Movies',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.MOVIE,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
  ];
};

export const getImageUrl = (show: Show): string => {
  if (!show) return '/images/grey-thumbnail.jpg';
  const { backdrop_path: backdropPath, poster_path: posterPath } = show;
  const path: string = backdropPath ?? posterPath ?? '';
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const getPreviewUrl = (episode: Episode): string => {
  if (!episode?.still_path) return '/images/grey-thumbnail.jpg';
  return `https://image.tmdb.org/t/p/original${episode.still_path}`;
};

export const getWatchPath = (id: number, type: MediaType): string => {
  return `/watch/${type}/${id}`;
};

export function getNameFromShow(show: Show | null): string {
  return show?.name ?? show?.title ?? '';
}

export function getSlug(id: number, name: string): string {
  // build slug from name and id
  // eslint-disable-next-line no-useless-escape
  const regex = /([^\x00-\x7F]|[&$\+,:;=\?@#\s<>\[\]\{\}|\\\^%])+/gm;
  return `${name.toLowerCase().replace(regex, '-')}-${id}`;
}

export const getDetailPath = (show: Show): string => {
  const slug: string = getSlug(show.id, getNameFromShow(show));
  return `/${show.media_type === MediaType.MOVIE ? 'movie' : 'tv'}/${slug}`;
};

export const getYear = (input: string | number): number => {
  const date = new Date(input);
  return date.getFullYear();
};

export const getYearFromShow = (
  show: ShowWithGenreAndVideo | Show,
): number | null => {
  if (show?.release_date) {
    return getYear(show.release_date);
  }
  if (show?.first_air_date) {
    return getYear(show?.first_air_date);
  }
  return null;
};

export const getTrailer = (
  show: ShowWithGenreAndVideo,
): string | null | undefined => {
  if (!show.videos?.results?.length) {
    return null;
  }
  const videoData: VideoResult[] = show.videos?.results;
  const result: VideoResult | undefined = videoData.find(
    (item: VideoResult) => item.type === 'Trailer',
  );
  return result?.key;
};
