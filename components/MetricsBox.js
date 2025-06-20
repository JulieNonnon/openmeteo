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

  console.log("[Checking] Open Meteo datas fetched in MetricsBox :", weatherData);

  if (!weatherData?.hourly?.time || !weatherData?.current_weather?.time) {
  return <div>Chargement des données météo...</div>;
  }
  
  const current = weatherData.current_weather;
  
  // const currentIndex = weatherData.hourly.time.findIndex( // Not precised enough, hence the -1 index
  //   (t) => t === current.time
  // );
  const currentTime = new Date(current.time);getTime();

  // to avoid -1 index and getting closest as possible to the current hour (in a interval of 1 hour = 3600000 ms)
  const currentIndex = weatherData.hourly.time.findIndex((t) => {
    const hourlyTime = new Date(t).getTime();
    return Math.abs(hourlyTime - currentTime) < 3600000;
  });

  const humidity = weatherData.hourly.relativehumidity_2m[currentIndex] || "Not Found";
  const visibility = weatherData.hourly.visibility?.[currentIndex] ?? "Not Found";

  const sunrise = weatherData?.daily?.sunrise?.[0];
  const sunset = weatherData?.daily?.sunset?.[0];
  const sunriseTimestamp = sunrise ? Math.floor(new Date(sunrise).getTime() / 1000) : null;
  const sunsetTimestamp = sunset ? Math.floor(new Date(sunset).getTime() / 1000) : null;

  if (!sunrise || !sunset) { // ex : northern countries
    console.warn('No sunrise / sunset data unavailable')
    return <p>Missing sunrise / sunset data</p>
  }

  if (!sunriseTimestamp || !sunsetTimestamp) {
    console.warn("Invalid sunrise/sunset date format:", sunrise, sunset);
    return <p>Invalid sunrise/sunset data</p>;
  }


  // DEBUG MISSING DATAS :
  console.log("Sunrise value from API:", weatherData.daily?.sunrise);
  console.log("Sunset value from API:", weatherData.daily?.sunset);
  console.log("Visibility values from API:", weatherData.hourly?.visibility);
  console.log("Current index for weather data:", currentIndex);
  console.log("Visibility at currentIndex:", weatherData.hourly.visibility?.[currentIndex]);

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
      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, visibility)}
        unit={unitSystem == "metric" ? "km" : "miles"}
      />
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
