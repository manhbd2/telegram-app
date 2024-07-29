import TvShowWatch from '@/components/TvShowWatch';
import { getIdFromSlug } from '@/libs/utils';
import MovieService from '@/services/MovieService';
import type { Show } from '@/types/movie';

type Props = {
  params: { slug: string };
};

export default async function WatchTvShowPage({ params }: Props) {
  const id: number = getIdFromSlug(params.slug);
  const movie: Show = await MovieService.findTvSeries(id);

  return (
    <main className="min-h-screen">
      <TvShowWatch show={movie} />
    </main>
  );
}
