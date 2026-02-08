// ============================================================
// Utility Functions
// ============================================================

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return price % 1 === 0 ? price.toString() : price.toFixed(2);
}

export function getMonthlyPrice(price: number, duration: number): string {
  return (price / duration).toFixed(2);
}

export function getDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
