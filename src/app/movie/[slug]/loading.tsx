import React from 'react';

import MovieDetailLoading from '@/components/ui/MovieDetailLoading';

function Loading() {
  console.log('loading movie');

  return (
    <main className="min-h-screen">
      <MovieDetailLoading />
    </main>
  );
}

export default Loading;
