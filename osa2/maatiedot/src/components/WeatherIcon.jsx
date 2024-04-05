import weatherService from '../services/weather'

const WeatherIcon = ({ icon }) => {
  return (
    <img src={weatherService.getImgUrl(icon)}></img>
  )
}

export default WeatherIcon