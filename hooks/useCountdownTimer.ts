import { calculateTimeLeft } from "@/lib/utils";
import { useState, useEffect } from "react";

/**
 * A custom hook for creating a countdown timer.
 *
 * This hook calculates the time left until a specified expiration date and updates it every second.
 * It returns the remaining time as a string formatted in "MM:SS" (minutes and seconds).
 * When the countdown reaches zero, it stops updating.
 *
 * @param {string} expirationDate - The target expiration date in ISO format (e.g., "2024-01-20T17:30:41.923196+01:00").
 *                                  This is the date and time until which the countdown will run.
 * @returns {string} The time left until the expiration date in the format "MM:SS".
 *                   If the expiration date is past or the date is invalid, it returns "00:00".
 *
 */

const useCountdownTimer = (expirationDate: string) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expirationDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(expirationDate);
      setTimeLeft(newTimeLeft);
      if (newTimeLeft === "00:00") {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expirationDate]);

  return timeLeft;
};

export default useCountdownTimer;
