import { useEffect, useState } from 'react'
import weatherService from '../services/weather'
import WeatherIcon from './WeatherIcon'

const Weather = ({ capital, capitalCoords }) => {

  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weatherService.getLocWeather(capitalCoords[0], capitalCoords[1])
      .then((response) => {
        setWeatherData(response.data)
      })
      .catch(() => {
        setWeatherData(null)
      })
  }, [capitalCoords])

  if (weatherData) {
    //console.log(weatherData)
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>{weatherData.weather[0].description}</div>
        <WeatherIcon icon={weatherData.weather[0].icon}></WeatherIcon>
        <li>temperature {(weatherData.main.temp - 273.15).toFixed(1)} °C</li>
        <li>feels like {(weatherData.main.feels_like - 273.15).toFixed(1)} °C</li>
        <li>wind {weatherData.wind.speed} m/s</li>
      </div>
    )
  } else {
    return (
      <div>Weather data for {capital} unavailable!</div>
    )
  }
}

export default Weather