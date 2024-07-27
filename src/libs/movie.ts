import { Genre } from '@/enums/genre';
import type { ShowRequest } from '@/enums/request-type';
import { RequestType } from '@/enums/request-type';
import type { Show } from '@/types/movie';
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
  if (!show) return '';
  const { backdrop_path: backdropPath, poster_path: posterPath } = show;
  const path: string = backdropPath ?? posterPath ?? '';
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const getWatchPath = (show: Show): string => {
  return `/watch/${
    show.media_type === MediaType.MOVIE ? 'movie' : 'tv'
  }/${show.id}`;
};
