import MovieService from '@/services/MovieService';
import { Collection } from '@/types/movie';
import React from 'react';

type IShowCollectionProps = {
  collectionId: number;
};

function ShowCollection(props: IShowCollectionProps) {
  const { collectionId } = props;
  const [collection, setCollection] = React.useState<Collection | null>();

  React.useEffect(async () => {
  }, [collectionId]);

  if (!collection?.parts?.length) {
    return null;
  }
  return <div>Collection</div>;
}

export default ShowCollection;
