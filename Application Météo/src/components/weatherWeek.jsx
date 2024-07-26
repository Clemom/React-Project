import { useState, useEffect } from "react";
import weatherIcons from '../components/weatherIcons.json';

const WEATHERWEEKAPI_KEY = "Z5MBV324R6CAVNQJRR6UV77L4";
const WEATHERWEEKAPI_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default function WeatherWeek({ city }) {
  const [weatherWeek, setWeatherWeek] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeekInfo(city);
  }, [city]);

  async function loadWeekInfo(city) {
    try {
      const request = await fetch(`${WEATHERWEEKAPI_URL}${city}?unitGroup=metric&key=${WEATHERWEEKAPI_KEY}&include=days`);
      if (!request.ok) {
        throw new Error('Les données météo ne sont pas disponibles.');
      }
      const json = await request.json();
      setTimeout(() => {
        setWeatherWeek(json.days.slice(2,8));
      }, 500);
      setError(null);
    } catch (error) {
      console.error('Erreur lors du chargement', error);
      setError(error.message);
    }
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getIcon = (condition) => {
    return weatherIcons[condition]?.icon || "./assets/icons/default-icon.svg";
  };

  return (
    <div className="weekPrevision">
      {error ? (
        <p className="error-message">{error}</p>
      ) : weatherWeek ? (
        weatherWeek.map(day => (
          <div className="previsionDay" key={day.datetime}>
            <h3>{formatDate(day.datetime)}</h3>
            <div className="weekInfos">
              <p>{day.tempmin}°C</p>
              <p>{day.tempmax}°C</p>
            </div>
            <img src={getIcon(day.conditions)} alt={day.conditions} />
          </div>
        ))
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
