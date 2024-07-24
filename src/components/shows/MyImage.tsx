import type { ImageLoaderProps, ImageProps } from 'next/image';
import Image from 'next/image';
import React from 'react';

import { env } from '@/libs/Env';

const MyImage = React.forwardRef(function CustomImage(
  props: ImageProps,
  ref: React.Ref<HTMLImageElement>,
) {
  const customLoader = ({ src, width, quality }: ImageLoaderProps) => {
    // local image
    if (src.startsWith('/')) {
      const params = [`w=${width}`];
      if (quality) {
        params.push(`q=${quality}`);
      } else {
        params.push(`q=75`);
      }
      const paramsString = params.join('&');
      let urlEndpoint = '/_next/image';
      if (urlEndpoint.endsWith('/'))
        urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
      return `${urlEndpoint}?url=${src}&${paramsString}`;
    }

    return src.replace(
      'image.tmdb.org',
      `${env.NEXT_PUBLIC_IMAGE_DOMAIN}/tmdb:w_${width}`,
    );
  };

  return (
    <Image
      {...props}
      ref={ref}
      loader={customLoader}
      alt={props.alt || env.NEXT_PUBLIC_SITE_NAME}
    />
  );
});

export default MyImage;
