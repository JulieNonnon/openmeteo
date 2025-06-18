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

// use of config.json
import fs from "fs"
import path from "path"

export default async function handler(req, res) {

  const configPath = path.join(process.cwd(), "config", "config.json");
  const configData = fs.readFileSync(configPath, "utf-8");
  const { city } = JSON.parse(configData);

  if (!city) {
    return res.status(400).json({ error: "No city defined in config.json" });
  }

  // const { cityInput } = req.body;

  // if (!cityInput) {
  //   return res.status(400).json({ error: "No city entered" });
  // }

  // fetching city coordonates via Open Meteo Geocoding API

  //const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=1`);

  const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
  const geoData = await geoResponse.json();

  //if (!geoData || !geoData.results || !Array.isArray(geoData.results) || geoData.results.length === 0) {
  if (!geoData?.results?.length){
  //console.error("❌ Aucune coordonnée retournée pour : ", cityInput, geoData);
  console.error("❌ Aucune coordonnée retournée pour : ", city, geoData);
  return res.status(404).json({ error: "Aucune coordonnée trouvée pour la ville demandée." });
}

  //const {latitude, longitude, name: city, country } = geoData.results[0]; // extract "name" and renammed it as "city"

  const {latitude, longitude, name, country } = geoData.results[0]; 

  // calling Open Meteo API

  const weatherResponse = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto&hourly=temperature_2m,relativehumidity_2m,weathercode,visibility,windspeed_10m,winddirection_10m` );
  const weatherData = await weatherResponse.json();

  //if (!weatherData || !weatherData.current_weather) {
  if (!weatherData?.current_weather) {
    console.error("missing weather data : ", weatherData);
    return res.status(500).json({ error: "Couldn't fetch weather data." });
  }

  res.status(200).json({
    city: name,
    country,
    current_weather: weatherData.current_weather,
  });
}
