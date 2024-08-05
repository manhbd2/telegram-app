import MovieDetail from '@/components/MovieDetail';
import { siteConfig } from '@/configs/site';
import { getIdFromSlug } from '@/libs/utils';
import MovieService from '@/services/MovieService';
import type { ShowWithGenreAndVideo } from '@/types/movie';
import { MediaType } from '@/types/movie';

type Props = {
  params: { slug: string };
};

export default async function TvShowPage({ params }: Props) {
  const id: number = getIdFromSlug(params.slug);
  const tvShow: ShowWithGenreAndVideo = await MovieService.findMovieByIdAndType(
    id,
    MediaType.TV,
  );

  const h1 = `${siteConfig.name} - Tv Detail`;

  return (
    <main className="min-h-screen">
      <h1 className="hidden">{h1}</h1>
      <MovieDetail show={tvShow} type={MediaType.TV} />
    </main>
  );
}
