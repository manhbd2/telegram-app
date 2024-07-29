import MovieWatch from '@/components/MovieWatch';
import { getIdFromSlug } from '@/libs/utils';
import MovieService from '@/services/MovieService';
import type { Show } from '@/types/movie';

type Props = {
  params: { slug: string };
};

export default async function WatchMoviePage({ params }: Props) {
  const id: number = getIdFromSlug(params.slug);
  const movie: Show = await MovieService.findMovie(id);

  return (
    <main className="min-h-screen">
      <MovieWatch show={movie} />
    </main>
  );
}
