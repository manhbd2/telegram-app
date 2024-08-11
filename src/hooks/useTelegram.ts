/* eslint-disable consistent-return */
import React from 'react';

import type { ITelegram } from '@/types/global';

declare global {
  interface Window {
    Telegram: ITelegram;
  }
}

const useTelegram = (): ITelegram => {
  const [webApp, setWebApp] = React.useState<ITelegram>({ WebApp: null });

  const handleDefault = (): void => {
    if (!window.Telegram?.WebApp) {
      return;
    }
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp?.disableVerticalSwipes();
  };

  React.useEffect(() => {
    if (window.Telegram?.WebApp) {
      handleDefault();
      setWebApp({ WebApp: window.Telegram?.WebApp });
      return;
    }
    const timer: NodeJS.Timeout = setInterval(() => {
      if (window.Telegram?.WebApp) {
        handleDefault();
        clearInterval(timer);
        setWebApp({ WebApp: window.Telegram?.WebApp });
      }
    }, 10);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return webApp;
};

export default useTelegram;
