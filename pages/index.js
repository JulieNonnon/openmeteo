import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [cityInput, setCityInput] = useState("Riga");
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cityInput }),
        });

        if (!res.ok) throw new Error("Erreur lors de la récupération des données");

        const data = await res.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("City not found, try again!");
        setWeatherData(null);
      }
    };

    getData();
  }, [triggerFetch]);

  const changeSystem = () =>
    setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"));

  if (error) {
    return (
      <ErrorScreen errorMessage={error}>
        <Search
          onFocus={(e) => (e.target.value = "")}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyDown={(e) => e.keyCode === 13 && setTriggerFetch((prev) => !prev)}
        />
      </ErrorScreen>
    );
  }

  if (!weatherData) return <LoadingScreen loadingMessage="Loading data..." />;

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.country}
        description={weatherData?.current_weather?.weathercode ?? "unknown"}
        //description={weatherData.current_weather.weathercode} // with mapping
        iconName={weatherData.current_weather.weathercode} // with mapping
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
          <Search
            placeHolder="Search a city..."
            value={cityInput}
            onFocus={(e) => {
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) setTriggerFetch((prev) => !prev);
              e.target.placeholder = "Search a city...";
            }}
          />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
};

export default App;
