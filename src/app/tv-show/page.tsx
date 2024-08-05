import MovieHome from '@/components/MovieHome';
import { siteConfig } from '@/configs/site';
import type { ShowRequest } from '@/enums/request-type';
import { getRandomShow, getRequestTvShow } from '@/libs/movie';
import MovieService from '@/services/MovieService';
import type { CategorizedShows, Show } from '@/types/movie';

export default async function TvPage() {
  const h1 = `${siteConfig.name} Tv shows`;
  const requests: ShowRequest[] = getRequestTvShow();

  const categorizedShows: CategorizedShows[] =
    await MovieService.getShows(requests);

  const randomShow: Show = getRandomShow(categorizedShows);

  return (
    <main className="min-h-screen">
      <h1 className="hidden">{h1}</h1>
      <MovieHome categorizedShows={categorizedShows} randomShow={randomShow} />
    </main>
  );
}
