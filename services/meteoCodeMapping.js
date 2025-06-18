//Open Meteo Mapping

const MeteoCodeMapping = {
  0:  { desc: "Clear sky", icon: "clear-day" },
  1:  { desc: "Mainly clear", icon: "mostly-clear" },
  2:  { desc: "Partly cloudy", icon: "partly-cloudy" },
  3:  { desc: "Overcast", icon: "overcast" },
  45: { desc: "Fog", icon: "fog" },
  48: { desc: "Depositing rime fog", icon: "fog" },
  51: { desc: "Light drizzle", icon: "drizzle-light" },
  53: { desc: "Moderate drizzle", icon: "drizzle" },
  55: { desc: "Dense drizzle", icon: "drizzle-heavy" },
  56: { desc: "Light freezing drizzle", icon: "freezing-drizzle" },
  57: { desc: "Dense freezing drizzle", icon: "freezing-drizzle-heavy" },
  61: { desc: "Slight rain", icon: "rain-light" },
  63: { desc: "Moderate rain", icon: "rain" },
  65: { desc: "Heavy rain", icon: "rain-heavy" },
  66: { desc: "Light freezing rain", icon: "freezing-rain" },
  67: { desc: "Heavy freezing rain", icon: "freezing-rain-heavy" },
  71: { desc: "Slight snow fall", icon: "snow-light" },
  73: { desc: "Moderate snow fall", icon: "snow" },
  75: { desc: "Heavy snow fall", icon: "snow-heavy" },
  77: { desc: "Snow grains", icon: "snow-grains" },
  80: { desc: "Slight rain showers", icon: "showers-light" },
  81: { desc: "Moderate rain showers", icon: "showers" },
  82: { desc: "Violent rain showers", icon: "showers-heavy" },
  85: { desc: "Slight snow showers", icon: "snow-showers-light" },
  86: { desc: "Heavy snow showers", icon: "snow-showers-heavy" },
  95: { desc: "Thunderstorm", icon: "thunderstorm" },
  96: { desc: "Thunderstorm with slight hail", icon: "thunderstorm-hail" },
  99: { desc: "Thunderstorm with heavy hail", icon: "thunderstorm-hail-heavy" }
};

export default MeteoCodeMapping;
