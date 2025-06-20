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

//export const getWeekDay = (weatherData) => { //Need to be updated: expects a .dt and .timezone with Open Weather, but get a timestamp with Open Meteo, hence the undefined

// export const getWeekDay = (timestamp, timezone) => {
//   if (!timestamp || !timezone) return "Unknown";

//   //const localDate = new Date(unixToLocalTime(timestamp, timezone)); // need to use its own fuseau horaire without using unitToLocalTime
//   const weekday = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   // return weekday[
//   //   new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
//   // ];
//   return weekday[localDate.getDay()];
// };

export const getWeekDay = (timestamp, timezone) => {
  if (!timestamp || !timezone) return "Unknown";

  const date = new Date(timestamp * 1000); // converts Unix timestamp (seconds) into ms (JS format)
  const formatter = new Intl.DateTimeFormat("en-US", { // Intl.DateTimeFormat: JS API which can format a date in a specified fuseau horaire, and return the precised weekday according to the requested fuseau horaire
    weekday: "long",
    timeZone: timezone,
  });

  return formatter.format(date); 
};
