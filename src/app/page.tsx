import MovieHome from '@/components/MovieHome';
import { siteConfig } from '@/configs/site';
import type { ShowRequest } from '@/enums/request-type';
import {
  getRandomShow,
  getRequestMovie,
  getRequestShow,
  getRequestTvShow,
} from '@/libs/movie';
import MovieService from '@/services/MovieService';
import type { CategorizedShow, RandomShow } from '@/types/movie';

export default async function Home() {
  const h1 = `${siteConfig.name} Home`;
  const requests: ShowRequest[] = getRequestShow();
  const movieRequest: ShowRequest[] = getRequestMovie();
  const tvShowRequest: ShowRequest[] = getRequestTvShow();

  const [categorizedShows, categorizedMovieShows, categorizedTvShows] =
    await Promise.all([
      MovieService.getShows(requests),
      MovieService.getShows(movieRequest),
      MovieService.getShows(tvShowRequest),
    ]);

  const categorizedShow: CategorizedShow = {
    all: categorizedShows,
    movie: categorizedMovieShows,
    tv: categorizedTvShows,
  };

  const randomShow: RandomShow = {
    all: getRandomShow(categorizedShows),
    movie: getRandomShow(categorizedMovieShows),
    tv: getRandomShow(categorizedTvShows),
  };

  return (
    <main className="min-h-screen">
      <h1 className="hidden">{h1}</h1>
      <MovieHome categorizedShow={categorizedShow} randomShow={randomShow} />
    </main>
  );
}
