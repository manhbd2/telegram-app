/* eslint-disable consistent-return */
import type { Telegram } from '@twa-dev/types';
import React from 'react';

import type { ITelegram } from '@/types/global';

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const useTelegram = (): ITelegram => {
  const [webApp, setWebApp] = React.useState<ITelegram>({ webApp: null });

  React.useEffect(() => {
    if (window.Telegram?.WebApp) {
      setWebApp({ webApp: window.Telegram?.WebApp });
      return;
    }
    const timer: NodeJS.Timeout = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(timer);
        window.Telegram.WebApp.ready();
        setWebApp({ webApp: window.Telegram?.WebApp });
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
