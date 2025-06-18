import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentTime, timezone) => // Open Meteo API doesn't use a unix timestamp, but return a ISO date format
  // unitSystem == "metric"
  //   ? unixToLocalTime(currentTime, timezone)
  //   : timeTo12HourFormat(unixToLocalTime(currentTime, timezone));
  {
  if (!currentTime || !timezone) return "Unknown";
  const localTime = unixToLocalTime(currentTime, timezone);
  return unitSystem === "metric" ? localTime : timeTo12HourFormat(localTime);
  };


export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
  ];
};
