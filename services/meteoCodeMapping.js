//Open Meteo Mapping

const MeteoCodeMapping = {
  0:  { desc: "Clear sky", icon: "0-wi-day-sunny" },
  1:  { desc: "Mainly clear", icon: "1-wi-day-cloudy" },
  2:  { desc: "Partly cloudy", icon: "2-wi-day-cloudy" },
  3:  { desc: "Overcast", icon: "3-wi-cloudy" },
  45: { desc: "Fog", icon: "45-wi-day-fog" },
  48: { desc: "Depositing rime fog", icon: "48-wi-fog" },
  51: { desc: "Light drizzle", icon: "51-wi-sleet"  },
  53: { desc: "Moderate drizzle", icon: "53-wi-rain-mix" },
  55: { desc: "Dense drizzle", icon: "55-57-wi-showers" },
  56: { desc: "Light freezing drizzle", icon: "55-57-wi-showers" },
  57: { desc: "Dense freezing drizzle", icon: "55-57-wi-showers" },
  61: { desc: "Slight rain", icon: "61-wi-sleet" },
  63: { desc: "Moderate rain", icon: "63-wi-rain-mix" },
  65: { desc: "Heavy rain", icon: "65-wi-rain"},
  66: { desc: "Light freezing rain", icon: "66-wi-sleet" },
  67: { desc: "Heavy freezing rain", icon: "67-wi-hail" },
  71: { desc: "Slight snow fall", icon: "71-77-wi-snow"  },
  73: { desc: "Moderate snow fall", icon: "71-77-wi-snow"  },
  75: { desc: "Heavy snow fall", icon: "71-77-wi-snow"  },
  77: { desc: "Snow grains", icon: "71-77-wi-snow" },
  80: { desc: "Slight rain showers", icon: "80-82-wi-rain-wind" },
  81: { desc: "Moderate rain showers", icon: "80-82-wi-rain-wind" },
  82: { desc: "Violent rain showers", icon: "80-82-wi-rain-wind" },
  85: { desc: "Slight snow showers", icon: "85-86-wi-hail" },
  86: { desc: "Heavy snow showers", icon: "85-86-wi-hail" },
  95: { desc: "Thunderstorm", icon: "95-99-wi-thunderstorm" },
  96: { desc: "Thunderstorm with slight hail", icon: "95-99-wi-thunderstorm" },
  99: { desc: "Thunderstorm with heavy hail", icon: "95-99-wi-thunderstorm" }
};

export default MeteoCodeMapping;
