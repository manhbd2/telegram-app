import React from "react";
import { Telegram } from "@twa-dev/types";
import { ITelegram } from "@/types/global";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const useTelegram = (): ITelegram => {
  const [webApp, setWebApp] = React.useState<ITelegram>({ webApp: null });

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (window.Telegram?.WebApp) {
      setWebApp({ webApp: window.Telegram?.WebApp });
      return;
    }
    timer = setInterval(() => {
      if (window.Telegram?.WebApp) {
        clearInterval(timer);
        window.Telegram.WebApp.ready();
        setWebApp({ webApp: window.Telegram?.WebApp });
        return;
      }
    }, 10);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return webApp;
};

export default useTelegram;
