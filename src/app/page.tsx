import MovieHome from '@/components/MovieHome';
import { siteConfig } from '@/configs/site';
import type { ShowRequest } from '@/enums/request-type';
import { getRequestShow } from '@/libs/movie';
import MovieService from '@/services/MovieService';
import type { CategorizedShows } from '@/types/movie';

export default async function Home() {
  const h1 = `${siteConfig.name} Home`;
  const requests: ShowRequest[] = getRequestShow();

  const categorizedShows: CategorizedShows[] =
    await MovieService.getShows(requests);

  console.log('home');
  return (
    <main className="min-h-screen">
      <h1 className="hidden">{h1}</h1>
      <MovieHome categorizedShows={categorizedShows} />
    </main>
  );
}
