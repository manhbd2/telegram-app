import MovieDetail from '@/components/MovieDetail';
import { siteConfig } from '@/configs/site';
import { getIdFromSlug } from '@/libs/utils';
import MovieService from '@/services/MovieService';
import type { ShowWithGenreAndVideo } from '@/types/movie';
import { MediaType } from '@/types/movie';

type Props = {
  params: { slug: string };
};

export default async function MoviePage({ params }: Props) {
  const id: number = getIdFromSlug(params.slug);
  const movie: ShowWithGenreAndVideo = await MovieService.findMovieByIdAndType(
    id,
    MediaType.MOVIE,
  );

  const h1 = `${siteConfig.name} - Movie Detail`;

  return (
    <main className="min-h-screen">
      <h1 className="hidden">{h1}</h1>
      <MovieDetail show={movie} type={MediaType.MOVIE} />
    </main>
  );
}
