import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryDetails from './components/CountryDetails'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const showCountry = (country) => {
    setSelectedCountry(country)
  }

  let content

  if(selectedCountry) {
    content = <CountryDetails country={selectedCountry} />
  } else if(filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  }else if (filteredCountries.length > 1) {
    content = filteredCountries.map(country => 
      <p key={country.cca3}>
        {country.name.common}
        <button onClick={() => showCountry(country)}>Show</button>
      </p>
    )
  }else if (filteredCountries.length === 1){
    content = <CountryDetails country={filteredCountries[0]} />
  } else {
    content = <p>No countries found</p>
  }

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find countries:
        <input
          value={searchQuery} 
          onChange={(event) => {
            setSearchQuery(event.target.value)
            setSelectedCountry(null)
          }
          }/>
      </div>
      {content}
    </div>
  )
}

export default App
