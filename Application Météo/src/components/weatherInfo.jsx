import weatherIcons from '../components/weatherIcons.json';

export default function WeatherInfos ({weather}){



    const getIcon = (condition) => {
        return weatherIcons[condition] || "./assets/icons/default-icon.svg";
    };

    return (
        
        <div className="card-infos">
            
            <div className="card-boxs">
                <div className="card-icon">
                  <img src={getIcon(weather?.current.condition.text)} alt={weather?.current.condition.text}/>
                  
                </div>
                <div className="card-temp">
                    <span>{weather?.current.temp_c}°c</span>
                  {/* <p>{weather?.current.condition.text}</p>*/}
                </div>
            </div>
        </div>
    )
}

