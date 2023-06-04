
import React, { useState ,useEffect} from "react";
import  hotbg from './images/hot.jpg'
import  coldbg from './images/cold.jpg'
import Descriptions from './components/Descriptions.jsx'

import {getFormatedWeatherData} from "./weatherService"

function App() {

  const [weatherData , SetWeatherData] = useState(null);
  const [unites,setUnits]= useState("metric")
  const [city,setCity] =useState("riyadh")
  const [bgimage,setbgImage] = useState(coldbg)
  useEffect(()=>{
    const fetchWeatherData= async ()=>{
    const data = await getFormatedWeatherData(city,unites);
    SetWeatherData(data);
    
    const thrsld= unites==="metric"?20:60;
    if(data.temp>=thrsld)
        setbgImage(hotbg)
    else
        setbgImage(coldbg)

    }
    fetchWeatherData();

    

  },[unites,city]);


  const handleUnitClick=(e)=>{
     const btn= e.currentTarget;
     const curretUnit = btn.innerText.slice(1);
     
     const isCelsius = curretUnit ==="C";
     btn.innerText = isCelsius?"°F":"°C"
     setUnits(isCelsius?"metric":"imperical")
  }
    
    const enterkeyPressed=(e)=>{
      if(e.keyCode==13)
      {
        setCity(e.currentTarget.value);
        e.currentTarget.blur();
      }
    }


  return (
    <div className="app" 
        style={{backgroundImage:`url(${bgimage})`}}>
        <div className="overlay">
        {
          weatherData && (
            <div className="container">
            <div className="section section__inputs">
            <input onKeyDown={enterkeyPressed} type="text" name="city" placeholder="Enter City .."/>
            <button onClick={handleUnitClick}>°F</button>
            </div>
  
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weatherData.name}, ${weatherData.country}`}</h3>
                <img 
                src={weatherData.iconURL}
                alt="WeatherIcon"
                />
                <h3>{weatherData.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weatherData.temp.toFixed()}`} °{unites==='metric'?'C':'F'}</h1>
              </div>
            </div>
            
              {/*Bottom description*/ }
  
              <Descriptions weather={weatherData} Units={unites}/>
          </div>
          )
        }

      </div>
    </div>
  );
}

export default App;
