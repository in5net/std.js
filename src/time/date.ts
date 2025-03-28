import { Duration, type DurationLike } from "./duration";

export function addDuration(
  date: Date,
  { years, days, months, hours, minutes, seconds, milliseconds }: DurationLike,
) {
  const newDate = new Date(date);
  if (years) {
    newDate.setFullYear(newDate.getFullYear() + years);
  }
  if (months) {
    newDate.setMonth(newDate.getMonth() + months);
  }
  if (days) {
    newDate.setDate(newDate.getDate() + days);
  }
  if (hours) {
    newDate.setHours(newDate.getHours() + hours);
  }
  if (minutes) {
    newDate.setMinutes(newDate.getMinutes() + minutes);
  }
  if (seconds) {
    newDate.setSeconds(newDate.getSeconds() + seconds);
  }
  if (milliseconds) {
    newDate.setMilliseconds(newDate.getMilliseconds() + milliseconds);
  }
  return newDate;
}

export function subtractDuration(
  date: Date,
  { years, days, months, hours, minutes, seconds, milliseconds }: DurationLike,
) {
  const newDate = new Date(date);
  if (years) {
    newDate.setFullYear(newDate.getFullYear() - years);
  }
  if (days) {
    newDate.setDate(newDate.getDate() - days);
  }
  if (months) {
    newDate.setMonth(newDate.getMonth() - months);
  }
  if (hours) {
    newDate.setHours(newDate.getHours() - hours);
  }
  if (minutes) {
    newDate.setMinutes(newDate.getMinutes() - minutes);
  }
  if (seconds) {
    newDate.setSeconds(newDate.getSeconds() - seconds);
  }
  if (milliseconds) {
    newDate.setMilliseconds(newDate.getMilliseconds() - milliseconds);
  }
  return newDate;
}

/**
 * Calculates the duration from `a` since `b`
 * The duration will be positive if `a` is after `b`
 * @param a
 * @param b
 */
export function since(a: Date, b: Date) {
  const milliseconds = a.getTime() - b.getTime();
  return new Duration({ milliseconds });
}

/**
 * Calculates the duration from `a` until `b`
 * The duration will be negative if `a` is after `b`
 * @param a
 * @param b
 */
export function until(a: Date, b: Date) {
  const milliseconds = b.getTime() - a.getTime();
  return new Duration({ milliseconds });
}

export const stripTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getToday = (): Date => stripTime(new Date());
export const getTomorrow = (): Date => addDuration(getToday(), { days: 1 });
export const getYesterday = (): Date =>
  subtractDuration(getToday(), { days: 1 });

/**
 * Determines if two dates are the same day, ignoring time
 * @param a
 * @param b
 */
export function sameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

/**
 * Checks if a date is valid
 * @param date
 */
export function validDate(date: Date) {
  const millis = date.getTime();
  return !Number.isNaN(millis);
}
