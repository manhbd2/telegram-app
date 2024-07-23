"use client";
import { Telegram, WebApp } from "@twa-dev/types";
import React from "react";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

function MovieHome() {
  const [webApp, setWebApp] = React.useState<WebApp | null>(null);

  React.useEffect(() => {
    if (!window.Telegram?.WebApp) {
      return;
    }
    window.Telegram.WebApp.ready();
    setWebApp(window.Telegram.WebApp);
  }, []);

  return <div>Hello world!</div>;
}

export default MovieHome;
