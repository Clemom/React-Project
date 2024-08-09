import { useState, useEffect } from "react";
import WeatherForm from "./weatherForm";
import WeatherInfos from "./weatherInfo";
import WeatherWeek from "./weatherWeek";
import Loader from "./loader";

const WEATHERAPI_KEY = "Z5MBV324R6CAVNQJRR6UV77L4";
const WEATHERAPI_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Bordeaux');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const request = await fetch(`${WEATHERAPI_URL}${city}?unitGroup=metric&key=${WEATHERAPI_KEY}&include=days`);
      if (!request.ok) {
        throw new Error('Ville non trouvée');
      }
      const json = await request.json();
      setWeather(json);
    } catch (error) {
      console.error("Erreur lors du chargement", error);
    } finally {
      setLoading(false);
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
  };

  return (
    <>
      <div className="container">
        <h1>Delia</h1>
        
        <div className="card-name">       
          <WeatherForm onChangeCity={handleChange} />
          <div className="location">
          <h3>{weather?.resolvedAddress || "Ville inconnue"}</h3>
          </div>        
          <p>{newDate(currentTime)}</p>
        </div>
        
        {loading ? (
          <Loader />
        ) : (
          weather ? (
            <>
              <WeatherInfos weather={weather} />
              <h2>Prévisions de la semaine</h2>
              <WeatherWeek city={city} />
            </>
          ) : (
            <p>Les données météorologique ne sont pas disponibles.</p>
          )
        )}
      </div>
    </>
  );
}
