import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  // Convert the Open Meteo data "current_weather.time" into a timestamp (in seconds)
  const date = new Date(weatherData.current_weather.time);

  const isoTime = weatherData.current_weather.time;
  //const timestamp = Math.floor(date.getTime() / 1000);
  const timestamp = Math.floor(new Date(isoTime).getTime() / 1000);
  const timezone = weatherData.timezone;
  const weekday = getWeekDay(timestamp, timezone);
  const time = getTime(unitSystem, timestamp, timezone);
  const ampm = getAMPM(unitSystem, timestamp, timezone)

  return (
    <div className={styles.wrapper}>
      <h2>
        {/* {`${getWeekDay(timestamp)}, ${getTime(
          unitSystem,
          timestamp,
          weatherData.timezone
        )} ${getAMPM(unitSystem, timestamp, weatherData.timezone)}`} */}
        {`${weekday}, ${time} ${ampm}`}
      </h2>
    </div>
  );
};
