import React from 'react';
import Skeleton from 'react-loading-skeleton';

function MovieHomeLoading() {
  return (
    <div>
      <Skeleton height={200} width="100%" />
    </div>
  );
}

export default MovieHomeLoading;
