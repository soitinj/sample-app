import Info from './Info'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
  
  if (country) {
    //console.log(country)
    return (
      <div>
        <Info country={country}></Info>
        <Weather capital={country.capital} capitalCoords={country.capitalInfo.latlng}></Weather>
      </div>
    )
  } else {
    return <div></div>
  }
}

export default CountryInfo