import SearchMovie from '@/components/SearchMovie';

export default async function SearchPage() {
  return (
    <main className="min-h-screen">
      <h1 className="hidden">search movie</h1>
      <SearchMovie />
    </main>
  );
}
