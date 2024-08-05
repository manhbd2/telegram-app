/* eslint-disable no-control-regex */
import { Genre } from '@/enums/genre';
import type { ShowRequest } from '@/enums/request-type';
import { RequestType } from '@/enums/request-type';
import type {
  CategorizedShows,
  Episode,
  Show,
  ShowWithGenreAndVideo,
  VideoResult,
} from '@/types/movie';
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

export const getRequestMovie = (): ShowRequest[] => {
  return [
    {
      title: 'Trending Now',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Netflix Movies',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Popular',
      req: { requestType: RequestType.POPULAR, mediaType: MediaType.MOVIE },
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

export const getRequestTvShow = (): ShowRequest[] => {
  return [
    {
      title: 'Trending Now',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Netflix TV Shows',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Popular',
      req: {
        requestType: RequestType.TOP_RATED,
        mediaType: MediaType.TV,
        genre: Genre.FAMILY,
      },
      visible: true,
    },
    {
      title: 'Comedy TV Shows',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.TV,
        genre: Genre.COMEDY,
      },
      visible: true,
    },
    {
      title: 'Action TV Shows',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.TV,
        genre: Genre.ACTION_ADVENTURE,
      },
      visible: true,
    },
    {
      title: 'Drama TV Shows',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.TV,
        genre: Genre.DRAMA,
      },
      visible: true,
    },
    {
      title: 'Scary TV Shows',
      req: {
        requestType: RequestType.GENRE,
        mediaType: MediaType.TV,
        genre: Genre.THRILLER,
      },
      visible: true,
    },
  ];
};

export const getImageUrl = (show: Show): string => {
  if (!show) return '/images/grey-thumbnail.jpg';
  const { backdrop_path: backdropPath, poster_path: posterPath } = show;
  const path: string = posterPath ?? backdropPath ?? '';
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const getPreviewImageUrl = (
  posterPath: string | null,
  backdropPath: string | null,
): string => {
  if (!backdropPath && posterPath) return '/images/grey-thumbnail.jpg';
  const path: string = posterPath ?? backdropPath ?? '';
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const getPreviewUrl = (episode: Episode): string => {
  if (!episode?.still_path) return '/images/grey-thumbnail.jpg';
  return `https://image.tmdb.org/t/p/original${episode.still_path}`;
};

export const getEmbedPlayerUrl = (
  id: number,
  type: MediaType,
  season?: number,
  episode?: number,
): string => {
  if (type === MediaType.MOVIE) {
    return `https://vidsrc.cc/v2/embed/movie/${id}`;
  }
  return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`;
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

export function getRandomShow(allShows: CategorizedShows[]): Show {
  const randomNumber = allShows?.length
    ? Math.floor(Math.random() * (allShows[0].shows?.length || 0))
    : 0;
  return allShows?.[0]?.shows?.[randomNumber];
}
