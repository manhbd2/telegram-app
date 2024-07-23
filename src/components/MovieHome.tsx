"use client";

import React from "react";
import useTelegram from "@/hooks/useTelegram";

function MovieHome() {
  const { webApp } = useTelegram();
  
  return (
    <div>
      <div>Hello world!</div>
      <button type="submit" onClick={() => webApp?.showAlert("Hello world!")}>
        Show Alert!
      </button>
    </div>
  );
}

export default MovieHome;
