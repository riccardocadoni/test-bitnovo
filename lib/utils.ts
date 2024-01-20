import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a human-readable format.
 *
 * @param {string} dateString - The date string in ISO format to be formatted.
 * @returns {string} A string representing the formatted date in the format "DD/MM/YYYY HH:MM".
 *
 */

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Calculates the time left until a specified expiration date.
 *
 * @param {string} date - The expiration date string in ISO format.
 * @returns {string} A string representing the time left in minutes and seconds ("MM:SS").
 * If the expiration date is past or invalid, returns "00:00".
 *
 */
export function calculateTimeLeft(date: string) {
  const now = new Date();
  const expiryDate = new Date(date);

  // Check if both dates are valid
  if (isNaN(now.getTime()) || isNaN(expiryDate.getTime())) {
    console.error("Invalid date provided");
    return "00:00";
  }

  const difference = expiryDate.getTime() - now.getTime();

  if (difference <= 0) {
    return "00:00";
  }

  const minutes = Math.floor(difference / 60000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((difference % 60000) / 1000)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
