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
