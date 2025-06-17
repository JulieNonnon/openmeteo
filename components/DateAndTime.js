import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  // Convert the Open Meteo data "current_weather.time" into a timestamp (in seconds)
  const date = new Date(weatherData.current_weather.time);
  const timestamp = Math.floor(date.getTime() / 1000);

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(timestamp)}, ${getTime(
          unitSystem,
          timestamp,
          weatherData.timezone
        )} ${getAMPM(unitSystem, timestamp, weatherData.timezone)}`}
      </h2>
    </div>
  );
};
