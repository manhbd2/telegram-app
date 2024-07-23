import React from "react";
import { Telegram, WebApp } from "@twa-dev/types";
import { ITelegram } from "@/types/global";

export const TelegramContext = React.createContext<ITelegram>({ webApp: null});

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = React.useState<WebApp | null>(null);

  React.useEffect(() => {
    if (!window.Telegram?.WebApp) {
      return;
    }
    window.Telegram.WebApp.ready();
    setWebApp(window.Telegram.WebApp);
  }, []);

  const value: ITelegram | null = React.useMemo(() => {
    return { webApp: webApp };
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = (): ITelegram => React.useContext(TelegramContext);
