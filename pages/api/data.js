// OPEN WEATHER API :

// export default async function handler(req, res) {
//   const { cityInput } = req.body;
//   const getWeatherData = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
//   );
//   const data = await getWeatherData.json();
//   res.status(200).json(data);
// }

// -------------------

// OPEN METEO API :

export default async function handler(req, res) {
  const { cityInput } = req.body;

  if (!cityInput) {
    return res.status(400).json({ error: "No city entered" });
  }

  // fetching city coordonates via Open Meteo Geocoding API
  const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1`);
  const geoData = await geoResponse.json();

  if (!geoData || !geoData.results || !Array.isArray(geoData.results) || geoData.results.length === 0) {
  console.error("❌ Aucune coordonnée retournée pour : ", cityInput, geoData);
  return res.status(404).json({ error: "Aucune coordonnée trouvée pour la ville demandée." });
}

  const {latitude, longitude, city, country } = geoData.results[0];

  // calling Open Meteo API

  const weatherResponse = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m,winddirection_10m` );
  const weatherData = await weatherResponse.json();

  if (!weatherData || !weatherData.current_weather) {
    console.error("missing weather data : ", weatherData);
    return res.status(500).json({ error: "Couldn't fetch weather data." });
  }

  // location and weather datas
  // const openMeteoData = {
  //   location: {
  //     city: geoData.result[0].name,
  //     country: geoData.result[0].country,
  //     latitude,
  //     longitude,
  //     timezone,
  //   },
  //   weather: weatherData
  // };

  // return res.status(200).json(openMeteoData);

  res.status(200).json({
    city: city,
    country: country,
    weather: weatherData,
  });
}
