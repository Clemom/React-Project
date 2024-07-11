import { useState, useEffect } from "react"
import WeatherForm from "./weatherForm"
import WeatherInfos from "./weatherInfo"
import Loader from "./loader"

const WEATHERAPI_KEY = "f89087f9361545cb9b6155012240907"
const WEATHERAPI_URL = "http://api.weatherapi.com/v1/current.json?aqi?=no"


export default function WeatherApp (){

    const [weather, setWeather] = useState(null);

    useEffect(()=>{
        loadInfo();
    }, [])
  
    async function loadInfo(city='paris'){
        try{
            const request = await fetch(`${WEATHERAPI_URL}&key=${WEATHERAPI_KEY}&q=${city}`);
            const json = await request.json();
            setTimeout(()=> {
                setWeather(json);
            },500)
            console.log(json);

        }catch(error){
            console.error('Erreur lors du chargement', error)
        }
    }

    function handleChange(city){
        setWeather(null);
        loadInfo(city)
    }

    return (
        <>
        
        <div className="container">
        <h1>Dhéliat</h1>
            <WeatherForm onChangeCity={handleChange}/>
            {weather ? <WeatherInfos weather={weather}/> : <Loader />}
        </div>
        </>
    )
}