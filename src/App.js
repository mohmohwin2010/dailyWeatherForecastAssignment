import Search from "./component/search/search";
import Forecast from "./component/forecast/forecast";
import CurrentWeather from "./component/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./component/api";
import "./App.css";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnSearchChange = (searchData) => {
    // console.log("REsp data : ", searchData.value);
    // console.log(searchData);

    // value: `${city.latitude} ${city.longitude}`,
    //       label: `${city.name}, ${city.countryCode}`,
    // ({
    //   value: `${city.latitude} ${city.longitude}`,
    //   label: `${city.name}, ${city.countryCode}`,
    // });

    const [lat, lon] = searchData.value.split("");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log("current : ", currentWeather);
  console.log("forecast : ", forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {/* <Forecast /> */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
