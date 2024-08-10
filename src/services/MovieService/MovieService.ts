import { type AxiosResponse } from 'axios';
import { cache } from 'react';

import { Genre } from '@/enums/genre';
import {
  RequestType,
  type ShowRequest,
  type TmdbPagingResponse,
  type TmdbRequest,
} from '@/enums/request-type';
import type {
  CategorizedShows,
  Collection,
  CreditsResponse,
  KeyWordResponse,
  MediaType,
  RecommendationResponse,
  SeasonDetail,
  Show,
  ShowWithGenreAndVideo,
} from '@/types/movie';

import BaseService from '../BaseService/BaseService';

const requestTypesNeedUpdateMediaType = [
  RequestType.TOP_RATED,
  RequestType.NETFLIX,
  RequestType.POPULAR,
  RequestType.GENRE,
  RequestType.KOREAN,
];

const baseUrl = 'https://api.themoviedb.org/3';

class MovieService extends BaseService {
  static findActors = cache((id: number, type: 'movie' | 'tv') => {
    return this.axios(baseUrl).get<CreditsResponse>(
      `/${type}/${id}/credits?language=en-US`,
    );
  });

  static getMovieRecommendation = cache(
    (id: number, type: 'movie' | 'tv', page: number = 1) => {
      return this.axios(baseUrl).get<RecommendationResponse>(
        `/${type}/${id}/recommendations?language=en-US`,
        { params: page },
      );
    },
  );

  static getTvSeriesRecommendation = cache(
    (seriesId: number, page: number = 1) => {
      return this.axios(baseUrl).get<RecommendationResponse>(
        `tv/${seriesId}/recommendations?language=en-US`,
        { params: page },
      );
    },
  );

  static getSeason = cache(async (id: number, seasonNumber: number) => {
    const response: AxiosResponse<SeasonDetail> = await this.axios(
      baseUrl,
    ).get<SeasonDetail>(`/tv/${id}/season/${seasonNumber}`);
    return response.data;
  });

  static getCollection = cache(async (collectionId: number) => {
    const response: AxiosResponse<Collection> = await this.axios(
      baseUrl,
    ).get<Collection>(`/collection/${collectionId}`);
    return response.data;
  });

  static findMovie = cache(async (id: number) => {
    const response: AxiosResponse<Show> = await this.axios(baseUrl).get<Show>(
      `/movie/${id}`,
    );
    return response.data;
  });

  static findTvSeries = cache(async (id: number) => {
    const response: AxiosResponse<Show> = await this.axios(baseUrl).get<Show>(
      `/tv/${id}`,
    );
    return response.data;
  });

  static async getKeywords(
    id: number,
    type: MediaType.TV | MediaType.MOVIE,
  ): Promise<AxiosResponse<KeyWordResponse>> {
    return this.axios(baseUrl).get<KeyWordResponse>(`/${type}/${id}/keywords`);
  }

  static findMovieByIdAndType = cache(async (id: number, type: string) => {
    const params: Record<string, string> = {
      language: 'en-US',
      append_to_response: 'videos',
    };
    const response: AxiosResponse<ShowWithGenreAndVideo> = await this.axios(
      baseUrl,
    ).get<ShowWithGenreAndVideo>(`/${type}/${id}`, { params });
    return Promise.resolve(response.data);
  });

  static getShows = cache(async (requests: ShowRequest[]) => {
    const shows: CategorizedShows[] = [];

    const executeRequest = (req: TmdbRequest) => {
      return this.axios(baseUrl).get<TmdbPagingResponse>(this.urlBuilder(req));
    };

    const responses = await Promise.allSettled(
      requests.map((m) => executeRequest(m.req)),
    );

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < requests.length; i++) {
      const res = responses[i];
      if (this.isRejected(res)) {
        shows.push({
          title: requests[i].title,
          shows: [],
          visible: requests[i].visible,
        });
      } else if (this.isFulfilled(res)) {
        const { requestType } = requests[i].req;
        if (requestTypesNeedUpdateMediaType.indexOf(requestType) > -1) {
          res.value.data.results.map((f: Show) => {
            // eslint-disable-next-line no-param-reassign
            f.media_type = requests[i].req.mediaType;
            return f;
          });
        }
        shows.push({
          title: requests[i].title,
          shows: res.value.data.results,
          visible: requests[i].visible,
        });
      } else {
        throw new Error('unexpected response');
      }
    }
    return shows;
  });

  static getShowTrending = cache(async (page: number = 1) => {
    const response: AxiosResponse<TmdbPagingResponse> = await this.axios(
      baseUrl,
    ).get<TmdbPagingResponse>(
      `/trending/all/day?language=en-US&with_original_language=en&page${page}`,
    );
    return response.data;
  });

  static searchMovies = cache(async (query: string, page?: number) => {
    const { data } = await this.axios(baseUrl).get<TmdbPagingResponse>(
      `/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=${
        page ?? 1
      }`,
    );
    data.results.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    return data;
  });

  static urlBuilder(req: TmdbRequest) {
    switch (req.requestType) {
      case RequestType.TRENDING:
        return `/trending/${
          req.mediaType
        }/day?language=en-US&with_original_language=en&page=${req.page ?? 1}`;
      case RequestType.TOP_RATED:
        return `/${req.mediaType}/top_rated?page=${
          req.page ?? 1
        }&with_original_language=en&language=en-US`;
      case RequestType.NETFLIX:
        return `/discover/${
          req.mediaType
        }?with_networks=213&with_original_language=en&language=en-US&page=${
          req.page ?? 1
        }`;
      case RequestType.POPULAR:
        return `/${
          req.mediaType
        }/popular?language=en-US&with_original_language=en&page=${
          req.page ?? 1
        }&without_genres=${Genre.TALK},${Genre.NEWS}`;
      case RequestType.GENRE:
        return `/discover/${req.mediaType}?with_genres=${
          req.genre
        }&language=en-US&with_original_language=en&page=${
          req.page ?? 1
        }&without_genres=${Genre.TALK},${Genre.NEWS}`;
      case RequestType.KOREAN:
        return `/discover/${req.mediaType}?with_genres=${
          req.genre
        }&with_original_language=ko&language=en-US&page=${req.page ?? 1}`;
      default:
        throw new Error(
          `request type ${req.requestType} is not implemented yet`,
        );
    }
  }
}

export default MovieService;
