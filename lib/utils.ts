import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleCopyClick(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy text: ", error);
  }
}
/**
 * Generates a URI string for creating a QR code for different types of test cryptocurrencies.
 *
 * @param {string} currency - The type of the test cryptocurrency (e.g., 'BTC_TEST', 'ETH_TEST3').
 * @param {string} address - The cryptocurrency address to which the payment will be sent.
 * @param {number} amount - The amount of cryptocurrency to be transacted.
 * @param {string} [tagMemo] - An optional tag or memo required for certain currencies like XRP_TEST.
 * @returns {string|null} A URI string formatted for QR code generation, or null in case of error.
 */

export function createCryptoUriForQRcode(currency: string, address: string, amount: number, tagMemo?: string) {
  switch (currency) {
    case "BCH_TEST":
      return `bchtest:${address}?amount=${amount}`;
    case "BTC_TEST":
      return `bitcoin:${address}?amount=${amount}&rbf=false`;
    case "ETH_TEST3":
      return `ethereum:${address}?amount=${amount}`;
    case "XRP_TEST":
      if (!tagMemo) {
        console.error("tagMemo is required for XRP_TEST currency");
        return null;
      }
      return `ripple:${address}?amount=${amount}&dt=${tagMemo}`;
    case "USDC_TEST3":
      return `ethereum:${address}?amount=${amount}`;
    default:
      console.error("No currency found");
      return null;
  }
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
