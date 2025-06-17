import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  //description,
  //iconName,
  unitSystem,
  weatherData
}) => {

  const code = weatherData.current_weather.weathercode;
  const { desc, icon } = weatherCodeMapping[code] || { desc: "Not Found", icon: "Not Found" }; // Mapped from weatherCode

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{desc}</p>
      <Image
        width="300px"
        height="300px"
        src={`/icons/${icon}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {unitSystem == "metric"
          ? Math.round(weatherData.main.temp)
          : Math.round(ctoF(weatherData.main.temp))}
        °{unitSystem == "metric" ? "C" : "F"}
      </h1>
      <p>
        Feels like{" "}
        {unitSystem == "metric"
          ? Math.round(weatherData.current_weather.temperature) // Open Weather's "weatherData.main.feels_like" doesn't has an equivalent in Open Meteo, use of "current_weather.temperature" by default
          : Math.round(ctoF(weatherData.current_weather.temperature))}
        °{unitSystem == "metric" ? "C" : "F"}
      </p>
    </div>
  );
};
