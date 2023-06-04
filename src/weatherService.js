const API_KEY='d7796e7bf62a484d666bd180952db12d'
const makeIconURL=(icon)=>{
    return `https://openweathermap.org/img/wn/${icon}.png`
}

const getFormatedWeatherData = async(city,units="metric")=>
{
    const url=  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
    
    const data = await fetch(url)
                .then((resp)=>resp.json())
                .then((data)=>data);

                const {
                    weather,
                    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
                    wind: { speed },
                    sys: { country },
                    name,
                  } = data;
                
                  const { description, icon } = weather[0];
                
                  return {
                    description,
                    iconURL: makeIconURL(icon),
                    temp,
                    feels_like,
                    temp_min,
                    temp_max,
                    pressure,
                    humidity,
                    speed,
                    country,
                    name,
                  };


}
export {getFormatedWeatherData}