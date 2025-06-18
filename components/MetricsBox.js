import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {

  if (!weatherData?.hourly?.time || !weatherData?.current_weather?.time) {
  return <div>Chargement des données météo...</div>;
  }
  
  const current = weatherData.current_weather;
  const currentIndex = weatherData.hourly.time.findIndex(
    (t) => t === current.time
  );

  const humidity = weatherData.hourly.relativehumidity_2m[currentIndex] || "Not Found";
  const sunrise = weatherData.daily.sunrise?.[0]; // may be missing in Northen Location
  const sunset = weatherData.daily.sunset?.[0]; // may be missing in Northen Location
  const sunriseTimestamp = Math.floor(new Date(sunrise).getTime() / 1000);
  const sunsetTimestamp = Math.floor(new Date(sunset).getTime() / 1000);

  // Note: Open Weather's "Visibility" data doesn't have an equivalent for Open Meteo

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={humidity} // changed Open Weather's "weatherData.main.humidity" with the "humidity" declared above
        unit={"%"}
      />
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, current.windspeed)}
        unit={unitSystem == "metric" ? "m/s" : "m/h"}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(current.winddirection)}
      />
      {/* <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, weatherData.visibility)}
        unit={unitSystem == "metric" ? "km" : "miles"}
      /> */}
      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(
          unitSystem,
          sunriseTimestamp,
          weatherData.timezone
        )}
        unit={getAMPM(
          unitSystem,
          sunriseTimestamp,
          weatherData.timezone
        )}
      />
      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(
          unitSystem,
          sunsetTimestamp,
          weatherData.timezone
        )}
        unit={getAMPM(unitSystem, sunsetTimestamp, weatherData.timezone)}
      />
    </div>
  );
};
