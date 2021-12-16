import './home.css'
import React, {useState} from 'react';
import { createContext } from 'react';
import Forecast from './Forecast';


function Home(props) {

const [weather, setWeather] = useState();
const [input, setInput] = useState({
  city: '',
  country: '',
});
const [APIresponse, setResponse] = useState({status:''})

{/* make API weather data request with fetch*/}

function fetchData() {

if (input.city == '' || input.country == '') {alert("Please fill country and city fields")
return;
}

 let weatherAPI = `https://community-open-weather-map.p.rapidapi.com/forecast?q=${input.city},${input.country}%2Cus&units=metric&cnt=1`;
    
 fetch(weatherAPI, {
      "method": "GET",
      "headers": {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    }).then((response) => {
    if (response.ok){
    setResponse({...APIresponse, status: response.status})
    return response.json()
    }
    else {
      setResponse({...APIresponse, status: response.status})
      throw new Error('Error: could not fetch weather API data')
    }
    }).then((response) => {
      setWeather(response)
    }).catch((error)=>{
    })
  }

  function apiError() {
    return (
    <div className="contentLayout">
    <span className="temp-stat">Couldn't retrieve API data (HTTP {APIresponse.status})</span>
    </div>

    )
  }
 
  function enterInput() {
    return (
      <div className="contentLayout">
      <span className="temp-stat">Enter location to check its current weather</span>
      </div>
    )
  }


function statusIsOK() {
  if (parseInt(APIresponse.status) < 200 || parseInt(APIresponse.status) > 299) return false;
  return true;
}

    console.log(weather)
return(
  <>
 {/* Topnav*/}

        <h2>Weather Stats Website</h2>
        
        <div className="topnav">
       
          
          <input className="location-input" type="text" placeholder='City' value= {input.city} onChange={(e) => setInput({...input, city: e.target.value})} name="search" />
          <input className="location-input" type="text" placeholder='Country'  value={input.country} onChange={(e) => setInput({...input, country: e.target.value})} name="search" />
          <button type="button" onClick = {(e)=> {fetchData()}}></button>
        </div> 

 {/* Pass context to Forecast component*/}

    {(APIresponse.status != '' && statusIsOK()) &&
        <Forecast weather = {weather}/>

    }

  {/* Enter input*/}

     {(APIresponse.status == '') && enterInput()}

  {/* API call error */}

     {APIresponse.status == '' || (!statusIsOK() &&  apiError())}
       
  {/* Footer */}
        <footer><span>Author: Peter Pileta  -  </span><a href="https://github.com/peterpileta">GitHub</a></footer>
      </>
    )
}

export default Home;