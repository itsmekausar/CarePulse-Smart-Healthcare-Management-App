import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// MODIFIED: Make parseStringify resilient to undefined or null inputs
export const parseStringify = (value: any) => {
  // If the value is undefined or null, return it directly.
  // This prevents `JSON.stringify(undefined)` which yields `undefined`,
  // and subsequent `JSON.parse(undefined)` which throws a SyntaxError.
  if (value === undefined || value === null) {
    return value;
  }

  // If the value is already an object, and doesn't explicitly need to be deep cloned
  // via JSON.stringify/parse for some reason (e.g., handling non-JSON-serializable parts),
  // you might consider just returning it. However, the common use of this pattern
  // is for a deep clone or serialization, so proceed with caution.
  // The primary fix for the "undefined" error is the check above.

  try {
    // Attempt to stringify and then parse the value.
    // This is typically used for deep cloning simple JSON-serializable objects.
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    // Log any other errors that might occur during stringify/parse (e.g., circular structures).
    console.error(
      "Error in parseStringify:",
      error,
      "Value that caused error:",
      value
    );
    // Depending on your application's error handling, you might return null,
    // the original value, or re-throw the error. Returning null is a safe fallback.
    return null;
  }
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
    timeZone, // use the provided timezone
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
    timeZone, // use the provided timezone
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
    timeZone, // use the provided timezone
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone, // use the provided timezone
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
