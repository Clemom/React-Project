import weatherIcons from "../components/weatherIcons.json";

export default function WeatherInfos({ weather }) {
  const getIcon = (condition) => {
    return weatherIcons[condition]?.icon || "./assets/icons/default-icon.svg";
  };

  const getConditionInFrench = (condition) => {
    return weatherIcons[condition]?.fr || condition;
  };

  if (!weather || !weather.days || weather.days.length === 0) {
    return <p className="erreur-meteo">Vérifiez l'orthographe de la ville.</p>;
  }

  const currentDay = weather.days[0];

  return (
    <div className="card-icon">
      <img
        src={getIcon(currentDay.conditions)}
        alt={currentDay.conditions}
        className="weather-icon"
        style={{ width: "150px", height: "150px" }}
      />
      <div className="card-temp">
        <p>{currentDay.temp}°c</p>
        <p>{getConditionInFrench(currentDay.conditions)}</p>
      </div>
    </div>
  );
}
