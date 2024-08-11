import React from 'react';
import type { YouTubeEvent } from 'react-youtube';
import YouTube from 'react-youtube';

import { getBannerUrl, getTrailer } from '@/libs/movie';
import type { ShowWithGenreAndVideo } from '@/types/movie';

import MyImage from '../shows/MyImage';

const options: Record<string, object> = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    rel: 0,
    mute: 1,
    loop: 1,
    autoplay: 0,
    controls: 1,
    showinfo: 1,
    disablekb: 1,
    enablejsapi: 1,
    playsinline: 1,
    cc_load_policy: 0,
    modestbranding: 3,
  },
};

type IEmbedYoutubeProps = {
  show: ShowWithGenreAndVideo;
};

function EmbedYoutube(props: IEmbedYoutubeProps) {
  const { show } = props;

  const youtubeRef = React.useRef(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const onReady = (event: YouTubeEvent) => {
    event.target.playVideo();
  };

  const onPlay = () => {
    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
    }
    if (youtubeRef.current) {
      const iframeRef: HTMLElement | null =
        document.getElementById('video-trailer');
      if (iframeRef) iframeRef.classList.remove('opacity-0');
    }
  };

  return (
    <div className="relative size-full">
      <MyImage
        fill
        priority
        alt="banner"
        ref={imageRef}
        src={getBannerUrl(show)}
        className="z-[1] h-auto w-full object-cover"
      />
      {getTrailer(show) ? (
        <YouTube
          opts={options}
          onPlay={onPlay}
          ref={youtubeRef}
          onReady={onReady}
          id="video-trailer"
          title="video-trailer"
          videoId={getTrailer(show)}
          className="absolute z-10 aspect-video size-full"
          iframeClassName="w-[100%] h-[100%] opacity-0"
        />
      ) : null}
    </div>
  );
}

export default EmbedYoutube;
