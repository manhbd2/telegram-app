import TvShowWatch from '@/components/TvShowWatch';
import { getIdFromSlug } from '@/libs/utils';
import MovieService from '@/services/MovieService';
import type { SeasonDetail, Show } from '@/types/movie';

type Props = {
  params: { slug: string };
};

export default async function WatchTvShowPage({ params }: Props) {
  const id: number = getIdFromSlug(params.slug);
  const movie: Show = await MovieService.findTvSeries(id);

  const season: SeasonDetail = await MovieService.getSeason(
    id,
    movie.seasons.length - 1,
  );

  return (
    <main className="min-h-screen">
      <TvShowWatch show={movie} season={season} />
    </main>
  );
}
