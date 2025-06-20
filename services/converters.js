export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

// export const unixToLocalTime = (unixSeconds, timezone) => {
//   let time = new Date((unixSeconds + timezone) * 1000)
//     .toISOString()
//     .match(/(\d{2}:\d{2})/)[0];

//   return time.startsWith("0") ? time.substring(1) : time;
// };

// NOTE : Open Meteo uses ISO string (no integer as timestamp in Open Weather), so unixToLocalTime need to be updated to be able to accept an ISO string

// export const unixToLocalTime = (input, timezoneOffset = 0) => {
//   let date;

//   if (typeof input === "number") {
//     date = new Date((input + timezoneOffset) * 1000);
//   } else if (typeof input === 'string') {
//     date = new Date(input);
//   } else {
//     return 'invalid date type'
//   }

//   if (isNaN(date.getTime())) return 'invalid date format';

//   const timeStr = date.toISOString().match(/(\d{2}:\d{2})/)?.[0] ?? 'xx : xx';
//   return timeStr.startsWith('0') ? timeStr.substring(1) : timeStr;
// };

// To get a correct hour format :
export const unixToLocalTime = (timestamp, timezone) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};