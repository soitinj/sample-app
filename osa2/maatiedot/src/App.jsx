import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    countryService.getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter setSearchTerm={setSearchTerm}></Filter>
      <CountryList countries={countries} searchTerm={searchTerm} setSelected={setSelected}></CountryList>
      <CountryInfo country={selected}></CountryInfo>
    </div>
  )
}

export default App
