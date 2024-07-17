import { useState, useEffect } from "react";
import weatherIcons from '../components/weatherIcons.json';

const WEATHERWEEKAPI_KEY = "f89087f9361545cb9b6155012240907";
const WEATHERWEEKAPI_URL = "http://api.weatherapi.com/v1/forecast.json";


export default function WeatherWeek ({city}){

    const [weatherWeek, setWeatherWeek] = useState(null);

    useEffect(()=>{
        loadWeekInfo(city);
    }, [city])
  
    async function loadWeekInfo(city){
        try{
            const request = await fetch(`${WEATHERWEEKAPI_URL}?key=${WEATHERWEEKAPI_KEY}&q=${city}&days=7`);
            const json = await request.json();
            setTimeout(()=> {
                setWeatherWeek(json.forecast.forecastday.slice(1));
            },500)
            console.log(json);

        }catch(error){
            console.error('Erreur lors du chargement', error)
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
      };

      const getIcon = (condition) => {
        return weatherIcons[condition]?.icon || "./assets/icons/default-icon.svg";
    };

    const getConditionInFrench = (condition) => {
        return weatherIcons[condition]?.fr || condition;
      };
    

    

    return (
        
            <div className="weekPrevision">
            {weatherWeek ? (
                weatherWeek.map(day => (
                    <div className="previsionDay" key={day.date}>
                        <h3>{formatDate(day.date)}</h3>
                        <div className="weekInfos">
                        <p>{day.day.mintemp_c}°C</p>
                        <p>{day.day.maxtemp_c}°C</p>
                        </div>
                        <img src={getIcon(day?.day.condition.text)} alt={day?.day.condition.text} />
                        
                        
                    </div>
                    
                ))
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}