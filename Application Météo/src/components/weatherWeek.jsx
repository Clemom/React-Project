import { useState, useEffect } from "react";

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
                setWeatherWeek(json.forecast.forecastday);
            },500)
            console.log(json);

        }catch(error){
            console.error('Erreur lors du chargement', error)
        }
    };

    return (
        <div className="weekWeather">
            <h2>Prévisions pour la semaine</h2>
            {weatherWeek ? (
                weatherWeek.map(day => (
                    <div key={day.date}>
                        <h3>{day.date}</h3>
                        <p>{day.day.condition.text}</p>
                        <img src={day.day.condition.icon} alt={day.day.condition.text} />
                        <p>Max: {day.day.maxtemp_c}°C</p>
                        <p>Min: {day.day.mintemp_c}°C</p>
                    </div>
                ))
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}