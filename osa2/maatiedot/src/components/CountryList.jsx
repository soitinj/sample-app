import ShowButton from './ShowButton'
import { useEffect } from 'react'

const CountryList = ({ countries, searchTerm, setSelected }) => {

  const listed = countries.filter(c => c.name.common.toLowerCase().includes(searchTerm))

  useEffect(() => {
    if (listed.length === 1) setSelected(listed[0])
  })

  if (searchTerm === '') {
    return <div>Type in a country</div>
  } else if (listed.length === 0) {
    return <div>No matches, specify a new filter</div>
  } else if (listed.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (listed.length > 1) {
    return (
      <>
        {listed.map(country =>
          <div key={country.name.common} style={{ display: 'flex', alignItems: 'left' }}>
            <div>{country.name.common}</div>
            &nbsp;
            <ShowButton country={country} setSelected={setSelected}></ShowButton>
          </div>
          )
        }
      </>
    )
  } else {
    return <></>
  }
}

export default CountryList