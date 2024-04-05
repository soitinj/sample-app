const Info = ({ country }) => {

  return (
    <div>
      <h1>{country.name.official}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area} km<sup>2</sup></div>
      <p><b>languages:</b></p>
      <ul>
      {Object.keys(country.languages).map(lcode =>
        <li key={`${country.name.common}+${country.languages[lcode]}`}>{country.languages[lcode]}</li>
      )}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  )
}

export default Info