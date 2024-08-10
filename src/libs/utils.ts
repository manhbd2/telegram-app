/* eslint-disable radix */
import type { ClassValue } from 'class-variance-authority/types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIdFromSlug(slug: string): number {
  const id: string | undefined = slug.split('-').pop();
  return id ? parseInt(id) : 0;
}

export function delay(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let timer: NodeJS.Timeout;
export function debounce(
  func: (...args: (string | object)[]) => void,
  timeout: number,
): (...args: (string | object)[]) => void {
  return (...args: (string | object)[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
