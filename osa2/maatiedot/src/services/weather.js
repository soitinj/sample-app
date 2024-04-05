import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org'
const imgUrl = 'https://openweathermap.org/img/wn'
const apiKey = import.meta.env.VITE_OWM_API_KEY

const getLocWeather = (lat, lng) => {
    return axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`)
}

const getImgUrl = (icon) => {
    return `${imgUrl}/${icon}@2x.png`
}

export default {
    getLocWeather: getLocWeather,
    getImgUrl: getImgUrl
}