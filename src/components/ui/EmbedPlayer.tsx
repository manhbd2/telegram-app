'use client';

import React from 'react';

import Loading from './Loading';

type IEmbedPlayerProps = {
  url: string;
};

function EmbedPlayer(props: IEmbedPlayerProps) {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const loadingRef = React.useRef<HTMLDivElement>(null);

  const handleIframeLoaded = () => {
    if (!ref.current) {
      return;
    }
    const iframe: HTMLIFrameElement = ref.current;
    if (iframe) iframe.style.opacity = '1';
    if (loadingRef.current) loadingRef.current.style.display = 'none';
  };

  React.useEffect(() => {
    if (ref.current) {
      ref.current.src = props.url;
    }

    const iframe: HTMLIFrameElement | null = ref.current;
    iframe?.addEventListener('load', handleIframeLoaded);
    return () => {
      iframe?.removeEventListener('load', handleIframeLoaded);
    };
  }, [props.url]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#000',
      }}
    >
      <div
        ref={loadingRef}
        className="absolute flex size-full items-center justify-center"
      >
        <Loading />
      </div>
      <iframe
        ref={ref}
        width="100%"
        height="100%"
        allowFullScreen
        title="embed player"
        style={{ opacity: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default EmbedPlayer;
