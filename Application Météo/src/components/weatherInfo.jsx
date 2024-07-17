import weatherIcons from "../components/weatherIcons.json";

export default function WeatherInfos({ weather }) {
  const getIcon = (condition) => {
    return weatherIcons[condition]?.icon || "./assets/icons/default-icon.svg";
  };

  const getConditionInFrench = (condition) => {
    return weatherIcons[condition]?.fr || condition;
  };

  return (
    <div className="card-icon">
      <img
        src={getIcon(weather?.current.condition.text)}
        alt={weather?.current.condition.text}
        className="weather-icon"
        style={{ width: "150px", height: "150px" }}
      />
      <div className="card-temp">
        <p>{weather?.current.temp_c}°c</p>
        <p>{getConditionInFrench(weather?.current.condition.text)}</p>
      </div>
    </div>
  );
}
