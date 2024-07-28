import type { WebApp } from '@twa-dev/types';

interface ITelegram {
  WebApp: ExtendedWebApp | null;
}

interface ExtendedWebApp extends WebApp {
  disableVerticalSwipes: () => void;
}
