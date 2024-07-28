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

  React.useEffect(() => {
    if (window.Telegram?.WebApp) {
      setWebApp({ WebApp: window.Telegram?.WebApp });
      return;
    }
    const timer: NodeJS.Timeout = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(timer);
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp?.disableVerticalSwipes();
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
