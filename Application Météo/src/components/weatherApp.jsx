import { useState, useEffect } from "react";
import WeatherForm from "./weatherForm";
import WeatherInfos from "./weatherInfo";
import WeatherWeek from "./weatherWeek";
import Loader from "./loader";

const WEATHERAPI_KEY = "f89087f9361545cb9b6155012240907";
const WEATHERAPI_URL = "http://api.weatherapi.com/v1/current.json?aqi=no";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Bordeaux');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadInfo(city);
  }, [city]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    async function loadInfo(city) {
    try {
      const request = await fetch(
        `${WEATHERAPI_URL}&key=${WEATHERAPI_KEY}&q=${city}`
      );
      const json = await request.json();
      setTimeout(() => {
        setWeather(json);
      }, 500);
      console.log(json);
    } catch (error) {
      console.error("Erreur lors du chargement", error);
    }
  }

  const newDate = (date) => {
    return date.toLocaleString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).replace('à', '');
  };

  function handleChange(newCity) {
    setWeather(null);
    setCity(newCity);
  }

  return (
    <>
      <div className="container">
        <h1>Delia</h1>
        
        <div className="card-name">       
        <WeatherForm onChangeCity={handleChange} />
        <div className="location">
        <h3>{weather?.location.name}</h3>
        </div>        
        <p>{newDate(currentTime)}</p>
          </div>
          
        {weather ? (
          <>
            <WeatherInfos weather={weather} />
            <h2>Prévisions de la semaine</h2>
            <WeatherWeek city={city} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
