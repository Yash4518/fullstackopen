import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

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

  let content

  if(filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length > 1) {
    content = filteredCountries.map(country => 
      <p key={country.cca3}>{country.name.common}</p>
    )
  }else if (filteredCountries.length === 1){
    const country = filteredCountries[0]

    content = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>

        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>

        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
      </div>
    )
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
          onChange={(event) => setSearchQuery(event.target.value)}/>
      </div>
      {content}
    </div>
  )
}

export default App
