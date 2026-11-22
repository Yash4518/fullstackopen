import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const api_key = import.meta.env.VITE_WEATHER_API_KEY

  const latitude = country.capitalInfo?.latlng?.[0]
  const longitude = country.capitalInfo?.latlng?.[1]

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) return

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: api_key,
          units: 'metric'
        }
      })
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Error fetching weather:', error)
      })
  },[latitude,longitude, api_key])
  return (
    <div>
      <h2>{country.name.common}</h2>

      <p>Capital: {country.capital?.join(', ') || 'No capital listed'}</p>
      <p>Area: {country.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />

      {weather && (
        <div>
          <h3>Weather in {country.capital?.[0]}</h3>

          <p>
            Temperature: {weather.main.temp} Celsius
          </p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />

          <p>
            {weather.weather[0].description}
          </p>
        </div>
        
      )}
    </div>
  )
}

export default CountryDetails
