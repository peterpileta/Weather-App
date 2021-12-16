import React, { useState, useEffect, useContext } from 'react'
import { weatherContext } from './Home'
import getCountryName from './getCountryName';
function Forecast({weather}) {

let weatherStats = weather.list[0].main;
let weatherCityName = weather.city.name;
const weatherCountryName = weather.city.country;
let weatherDesc = weather.list[0].weather[0].description;
const [activate, setActivate] = useState("");
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
useEffect(() => {
setActivate('activate')
}, [] )

return  (<>
    {(weather == undefined) || 
<div className='forecast-layout'>
    <span className="weather-description">{capitalizeFirstLetter(weatherDesc)} in {weatherCityName}, {getCountryName(weatherCountryName)}</span>
    
    <div className="forecast-flex">

        <div className="flex-item">
            <span>Feels like</span>
            <span>{weatherStats.feels_like}˚C</span>
            
        </div>

        <div className="flex-item">
            <span>Humidity</span>
            <span>{weatherStats.humidity}%</span>
        </div>

        <div className="flex-item">
            <span>Pressure</span>
            <span>{weatherStats.pressure} Pa</span>
        </div>

        <div className="flex-item">
            <span>Wind speed</span>
            <span>{weather.list[0].wind.speed} m/s</span>
        </div>
    
</div>
</div>
}
</>)

}

export default Forecast;

