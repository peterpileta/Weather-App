import './home.css'
import React, {useState} from 'react';
import { createContext } from 'react';
import Forecast from './Forecast';
export const myContext = createContext();

function Home(props) {

const [weather, setWeather] = useState();
const [input, setInput] = useState();


/* make API weather data request with fetch*/

function fetchData() {

if (input === null) {alert("Please type city name")
return;
}

 let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;
    
 fetch(weatherAPI, {
      "method": "GET"
    }).then((response) => {
    if (response.ok){
    return response.json()
    }
    else {
      setWeather({cod: 404})
      throw new Error('Error: could not fetch weather API data')
    }
    }).then((response) => {
      setWeather({...response})
    }).catch((error)=>{
    
    })

  }

  function apiError() {
    return (
    <div className="contentLayout">
    <span className="temp-stat">Couldn't retrieve API data (Check for spelling errors)</span>
    </div>

    )
  }
 

  function statusIsOK() {
    if (weather?.cod >= 200 && weather?.cod <= 299) return true;
    else return false;
   
  }


return(
  <div className='main-container'>
        <h2>Weather Stats Website</h2>
        <div className="topnav">
          <input type="text" placeholder='city' value= {input} onChange={(e) => setInput(e.target.value)} name="search" />
          <button type="button" onClick = {(e)=> {fetchData()}}>Search</button>
        </div> 
 {/* Pass context to Forecast component*/}
<myContext.Provider value = {weather}>
  {statusIsOK() &&  <Forecast/>}
</myContext.Provider>
  {/* API call error */}
     {weather !== undefined && !statusIsOK() &&  apiError()}
      </div>
    )
}

export default Home;