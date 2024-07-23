"use client";

import React from "react";
import { TelegramProvider, useTelegram } from "@/contexts/telegram.provider";

function MovieHome() {
  const { webApp } = useTelegram();
  
  return (
    <TelegramProvider>
      <div>Hello world!</div>
      <button type="submit" onClick={() => webApp?.showAlert("Hello world!")}>
        Show Alert!
      </button>
    </TelegramProvider>
  );
}

export default MovieHome;
