import { useState, useEffect, useMemo } from 'react'

const WMO_CODES = {
  0: { description: 'Clear sky', icon: 'clear', severity: 'none' },
  1: { description: 'Mainly clear', icon: 'clear', severity: 'none' },
  2: { description: 'Partly cloudy', icon: 'partly-cloudy', severity: 'none' },
  3: { description: 'Overcast', icon: 'cloudy', severity: 'none' },
  45: { description: 'Fog', icon: 'fog', severity: 'moderate' },
  48: { description: 'Depositing rime fog', icon: 'fog', severity: 'moderate' },
  51: { description: 'Light drizzle', icon: 'drizzle', severity: 'low' },
  53: { description: 'Moderate drizzle', icon: 'drizzle', severity: 'moderate' },
  55: { description: 'Dense drizzle', icon: 'drizzle', severity: 'moderate' },
  61: { description: 'Slight rain', icon: 'rain', severity: 'low' },
  63: { description: 'Moderate rain', icon: 'rain', severity: 'moderate' },
  65: { description: 'Heavy rain', icon: 'rain', severity: 'high' },
  66: { description: 'Freezing rain', icon: 'rain', severity: 'high' },
  67: { description: 'Heavy freezing rain', icon: 'rain', severity: 'high' },
  71: { description: 'Slight snow', icon: 'snow', severity: 'low' },
  73: { description: 'Moderate snow', icon: 'snow', severity: 'moderate' },
  75: { description: 'Heavy snow', icon: 'snow', severity: 'high' },
  77: { description: 'Snow grains', icon: 'snow', severity: 'low' },
  80: { description: 'Slight rain showers', icon: 'rain', severity: 'low' },
  81: { description: 'Moderate rain showers', icon: 'rain', severity: 'moderate' },
  82: { description: 'Violent rain showers', icon: 'rain', severity: 'high' },
  85: { description: 'Slight snow showers', icon: 'snow', severity: 'low' },
  86: { description: 'Heavy snow showers', icon: 'snow', severity: 'high' },
  95: { description: 'Thunderstorm', icon: 'thunderstorm', severity: 'high' },
  96: { description: 'Thunderstorm with hail', icon: 'thunderstorm', severity: 'high' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'thunderstorm', severity: 'high' }
}

const WeatherIcon = ({ code, size = 48 }) => {
  const weather = WMO_CODES[code] || WMO_CODES[0]
  const iconType = weather.icon

  const icons = {
    clear: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" fill="#FFD93D" />
        <g stroke="#FFD93D" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    ),
    'partly-cloudy': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="4" fill="#FFD93D" />
        <path d="M6 16C4.34315 16 3 14.6569 3 13C3 11.3431 4.34315 10 6 10C6.2985 10 6.5868 10.0432 6.8593 10.1243C7.3875 8.2831 9.0676 7 11 7C13.2091 7 15 8.79086 15 11C15 11.0908 14.9975 11.181 14.9925 11.2705C15.6291 11.6391 16.0554 12.3225 16.0554 13.1C16.0554 14.2046 15.16 15.1 14.0554 15.1H6V16Z" fill="#E8E8E8" />
      </svg>
    ),
    cloudy: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 17C4.34315 17 3 15.6569 3 14C3 12.3431 4.34315 11 6 11C6.2985 11 6.5868 11.0432 6.8593 11.1243C7.3875 9.2831 9.0676 8 11 8C13.2091 8 15 9.79086 15 12C15 12.0908 14.9975 12.181 14.9925 12.2705C15.6291 12.6391 16.0554 13.3225 16.0554 14.1C16.0554 15.2046 15.16 16.1 14.0554 16.1H6V17Z" fill="#E8E8E8" />
        <path d="M10 19C8.34315 19 7 17.6569 7 16C7 14.3431 8.34315 13 10 13C10.2985 13 10.5868 13.0432 10.8593 13.1243C11.3875 11.2831 13.0676 10 15 10C17.2091 10 19 11.7909 19 14C19 14.0908 18.9975 14.181 18.9925 14.2705C19.6291 14.6391 20.0554 15.3225 20.0554 16.1C20.0554 17.2046 19.16 18.1 18.0554 18.1H10V19Z" fill="#C4C4C4" />
      </svg>
    ),
    fog: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="8" width="18" height="2" rx="1" fill="#B8B8B8" />
        <rect x="5" y="12" width="14" height="2" rx="1" fill="#B8B8B8" />
        <rect x="3" y="16" width="18" height="2" rx="1" fill="#B8B8B8" />
      </svg>
    ),
    drizzle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 12C4.34315 12 3 10.6569 3 9C3 7.34315 4.34315 6 6 6C6.2985 6 6.5868 6.0432 6.8593 6.1243C7.3875 4.2831 9.0676 3 11 3C13.2091 3 15 4.79086 15 7C15 7.0908 14.9975 7.181 14.9925 7.2705C15.6291 7.6391 16.0554 8.3225 16.0554 9.1C16.0554 10.2046 15.16 11.1 14.0554 11.1H6V12Z" fill="#A0A0A0" />
        <line x1="8" y1="14" x2="6" y2="18" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="14" x2="10" y2="18" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="14" x2="14" y2="18" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    rain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 11C4.34315 11 3 9.65685 3 8C3 6.34315 4.34315 5 6 5C6.2985 5 6.5868 5.0432 6.8593 5.1243C7.3875 3.2831 9.0676 2 11 2C13.2091 2 15 3.79086 15 6C15 6.0908 14.9975 6.181 14.9925 6.2705C15.6291 6.6391 16.0554 7.3225 16.0554 8.1C16.0554 9.20457 15.16 10.1 14.0554 10.1H6V11Z" fill="#A0A0A0" />
        <line x1="7" y1="13" x2="5" y2="17" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="13" x2="9" y2="17" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="13" x2="13" y2="17" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="15" x2="7" y2="19" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        <line x1="13" y1="15" x2="11" y2="19" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    snow: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 11C4.34315 11 3 9.65685 3 8C3 6.34315 4.34315 5 6 5C6.2985 5 6.5868 5.0432 6.8593 5.1243C7.3875 3.2831 9.0676 2 11 2C13.2091 2 15 3.79086 15 6C15 6.0908 14.9975 6.181 14.9925 6.2705C15.6291 6.6391 16.0554 7.3225 16.0554 8.1C16.0554 9.20457 15.16 10.1 14.0554 10.1H6V11Z" fill="#A0A0A0" />
        <circle cx="7" cy="15" r="1.5" fill="#E0E7FF" />
        <circle cx="11" cy="17" r="1.5" fill="#E0E7FF" />
        <circle cx="15" cy="15" r="1.5" fill="#E0E7FF" />
        <circle cx="9" cy="19" r="1.5" fill="#E0E7FF" />
        <circle cx="13" cy="19" r="1.5" fill="#E0E7FF" />
      </svg>
    ),
    thunderstorm: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10C4.34315 10 3 8.65685 3 7C3 5.34315 4.34315 4 6 4C6.2985 4 6.5868 4.0432 6.8593 4.1243C7.3875 2.2831 9.0676 1 11 1C13.2091 1 15 2.79086 15 5C15 5.0908 14.9975 5.181 14.9925 5.2705C15.6291 5.6391 16.0554 6.3225 16.0554 7.1C16.0554 8.20457 15.16 9.1 14.0554 9.1H6V10Z" fill="#6B7280" />
        <path d="M11 12L9 17H12L10 22L15 15H12L14 12H11Z" fill="#FFD93D" />
      </svg>
    )
  }

  return icons[iconType] || icons.clear
}

const convertTemp = (celsius, unit) => {
  if (unit === 'F') {
    return Math.round((celsius * 9/5) + 32)
  }
  return Math.round(celsius)
}

const TemperatureTrendChart = ({ hourlyData, unit }) => {
  if (!hourlyData || hourlyData.length === 0) return null

  const temps = hourlyData.map(h => convertTemp(h.temp, unit))
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)
  const range = maxTemp - minTemp || 1

  const points = temps.map((temp, index) => {
    const x = (index / (temps.length - 1)) * 100
    const y = 100 - ((temp - minTemp) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `0,100 ${points} 100,100`

  return (
    <div className="temperature-chart">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="chart-svg">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#chartGradient)" />
        <polyline points={points} fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {temps.map((temp, index) => {
          const x = (index / (temps.length - 1)) * 100
          const y = 100 - ((temp - minTemp) / range) * 80 - 10
          return (
            <circle key={index} cx={x} cy={y} r="1.5" fill="#06b6d4" />
          )
        })}
      </svg>
    </div>
  )
}

const SevereWeatherAlert = ({ weatherCode, uvIndex, windSpeed, precipitation }) => {
  const alerts = []
  const weather = WMO_CODES[weatherCode]

  if (weather?.severity === 'high') {
    alerts.push({
      type: 'danger',
      message: `Severe weather: ${weather.description}. Take precautions.`
    })
  } else if (weather?.severity === 'moderate') {
    alerts.push({
      type: 'warning',
      message: `Moderate weather conditions: ${weather.description}.`
    })
  }

  if (uvIndex >= 8) {
    alerts.push({
      type: 'danger',
      message: `Very high UV index (${uvIndex.toFixed(1)}). Use sun protection.`
    })
  } else if (uvIndex >= 6) {
    alerts.push({
      type: 'warning',
      message: `High UV index (${uvIndex.toFixed(1)}). Apply sunscreen.`
    })
  }

  if (windSpeed >= 50) {
    alerts.push({
      type: 'danger',
      message: `Dangerous wind speeds (${Math.round(windSpeed)} km/h). Stay indoors.`
    })
  } else if (windSpeed >= 30) {
    alerts.push({
      type: 'warning',
      message: `Strong winds (${Math.round(windSpeed)} km/h). Exercise caution.`
    })
  }

  if (precipitation > 10) {
    alerts.push({
      type: 'warning',
      message: `Heavy precipitation (${precipitation} mm).`
    })
  }

  if (alerts.length === 0) return null

  return (
    <div className="severe-weather-alerts">
      {alerts.map((alert, index) => (
        <div key={index} className={`alert alert-${alert.type}`}>
          <span className="alert-icon">
            {alert.type === 'danger' ? '⚠️' : '⚡'}
          </span>
          <span className="alert-message">{alert.message}</span>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [city, setCity] = useState('New York')
  const [country, setCountry] = useState('United States')
  const [weather, setWeather] = useState(null)
  const [hourlyForecast, setHourlyForecast] = useState([])
  const [dailyForecast, setDailyForecast] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('C')
  const [lastUpdated, setLastUpdated] = useState(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem('weather-saved-locations')
    return saved ? JSON.parse(saved) : []
  })
  const [currentCoords, setCurrentCoords] = useState({ lat: null, lon: null })
  const [autoRefresh, setAutoRefresh] = useState(true)

  const defaultCity = useMemo(() => ({ name: 'New York', lat: 40.7128, lon: -74.006, country: 'United States' }), [])

  const searchCities = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      )
      const data = await response.json()

      if (data.results) {
        setSearchResults(data.results)
      } else {
        setSearchResults([])
      }
    } catch (_err) {
      setError('Failed to search cities. Please try again.')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const fetchWeather = async (lat, lon, cityName, countryName) => {
    setIsLoading(true)
    setError(null)
    setCurrentCoords({ lat, lon })

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility,uv_index&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      )
      const data = await response.json()

      setWeather({
        current: data.current,
        location: { name: cityName, country: countryName },
        timezone: data.timezone
      })

      const currentHour = currentDateTime.getHours()
      const next24Hours = data.hourly.time.slice(currentHour, currentHour + 24).map((time, index) => ({
        time: new Date(time),
        temp: data.hourly.temperature_2m[currentHour + index],
        code: data.hourly.weather_code[currentHour + index]
      }))
      setHourlyForecast(next24Hours)

      const dailyData = data.daily.time.map((time, index) => ({
        date: new Date(time),
        code: data.daily.weather_code[index],
        max: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index]
      }))
      setDailyForecast(dailyData.slice(0, 7))

      setCity(cityName)
      setCountry(countryName)
      setLastUpdated(currentDateTime)
    } catch (_err) {
      setError('Failed to load weather data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      const selected = searchResults[0]
      fetchWeather(selected.latitude, selected.longitude, selected.name, selected.country)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const selectCity = (cityData) => {
    fetchWeather(cityData.latitude, cityData.longitude, cityData.name, cityData.country)
    setSearchQuery('')
    setSearchResults([])
  }

  const saveLocation = () => {
    if (!currentCoords.lat || !currentCoords.lon) return

    const newLocation = {
      name: city,
      country: country,
      lat: currentCoords.lat,
      lon: currentCoords.lon
    }

    const exists = savedLocations.some(
      loc => loc.name === city && loc.country === country
    )

    if (!exists) {
      const updated = [...savedLocations, newLocation].slice(0, 5)
      setSavedLocations(updated)
      localStorage.setItem('weather-saved-locations', JSON.stringify(updated))
    }
  }

  const removeLocation = (index) => {
    const updated = savedLocations.filter((_, i) => i !== index)
    setSavedLocations(updated)
    localStorage.setItem('weather-saved-locations', JSON.stringify(updated))
  }

  const loadSavedLocation = (location) => {
    fetchWeather(location.lat, location.lon, location.name, location.country)
  }

  useEffect(() => {
    fetchWeather(defaultCity.lat, defaultCity.lon, defaultCity.name, defaultCity.country)
  }, [defaultCity])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!autoRefresh || !currentCoords.lat || !currentCoords.lon) return

    const refreshTimer = setInterval(() => {
      fetchWeather(currentCoords.lat, currentCoords.lon, city, country)
    }, 15 * 60 * 1000) // 15 minutes

    return () => clearInterval(refreshTimer)
  }, [autoRefresh, currentCoords, city, country])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
  }

  const formatDay = (date) => {
    const today = currentDateTime
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.round(degrees / 45) % 8]
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <h1>Weather Observatory</h1>
          <p className="tagline">See the weather differently</p>
        </div>
        <div className="header-controls">
          <button
            className={`auto-refresh-toggle ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
            aria-label={autoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}
          >
            {autoRefresh ? '🔄 Auto' : '⏸️ Manual'}
          </button>
          <button
            className="unit-toggle"
            onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            aria-label={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
          >
            °{unit}
          </button>
        </div>
      </header>

      <main className="main">
        <section className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                searchCities(e.target.value)
              }}
              placeholder="Search city..."
              className="search-input"
              aria-label="Search for a city"
            />
            <button type="submit" className="search-button" disabled={searchResults.length === 0}>
              Search
            </button>
          </form>

          {isSearching && <div className="loading-spinner">Searching...</div>}

          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((result) => (
                <li key={result.id} onClick={() => selectCity(result)} className="search-result-item">
                  <span className="city-name">{result.name}</span>
                  {result.admin1 && <span className="region">{result.admin1}, </span>}
                  <span className="country">{result.country}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {savedLocations.length > 0 && (
          <section className="saved-locations">
            <h3>Saved Locations</h3>
            <div className="saved-locations-list">
              {savedLocations.map((location, index) => (
                <div key={index} className="saved-location-item">
                  <button
                    onClick={() => loadSavedLocation(location)}
                    className="saved-location-btn"
                  >
                    <span className="saved-location-name">{location.name}</span>
                    <span className="saved-location-country">{location.country}</span>
                  </button>
                  <button
                    onClick={() => removeLocation(index)}
                    className="remove-location-btn"
                    aria-label={`Remove ${location.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => fetchWeather(defaultCity.lat, defaultCity.lon, defaultCity.name, defaultCity.country)}>
              Retry
            </button>
          </div>
        )}

        {isLoading && !error && (
          <div className="loading-message">Loading weather data...</div>
        )}

        {weather && !isLoading && (
          <>
            <section className="current-weather">
              <div className="location-header">
                <div className="location-info">
                  <h2>{city}, {country}</h2>
                  <p className="datetime">
                    {currentDateTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <button
                  onClick={saveLocation}
                  className="save-location-btn"
                  disabled={savedLocations.some(loc => loc.name === city && loc.country === country)}
                  aria-label="Save location"
                >
                  {savedLocations.some(loc => loc.name === city && loc.country === country) ? '✓ Saved' : '☆ Save'}
                </button>
              </div>

              <SevereWeatherAlert
                weatherCode={weather.current.weather_code}
                uvIndex={weather.current.uv_index}
                windSpeed={weather.current.wind_speed_10m}
                precipitation={weather.current.precipitation}
              />

              <div className="weather-main">
                <WeatherIcon code={weather.current.weather_code} size={96} />
                <div className="temperature-display">
                  <span className="temperature">{convertTemp(weather.current.temperature_2m, unit)}°</span>
                  <span className="unit">°{unit}</span>
                </div>
                <p className="condition">{WMO_CODES[weather.current.weather_code]?.description || 'Unknown'}</p>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">Feels like</span>
                  <span className="detail-value">{convertTemp(weather.current.apparent_temperature, unit)}°{unit}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">High/Low</span>
                  <span className="detail-value">
                    {dailyForecast[0] && `${convertTemp(dailyForecast[0].max, unit)}° / ${convertTemp(dailyForecast[0].min, unit)}°`}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weather.current.relative_humidity_2m}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">
                    {Math.round(weather.current.wind_speed_10m)} km/h {getWindDirection(weather.current.wind_direction_10m)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Visibility</span>
                  <span className="detail-value">{Math.round(weather.current.visibility / 1000)} km</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">UV Index</span>
                  <span className="detail-value">{weather.current.uv_index?.toFixed(1) || 'N/A'}</span>
                </div>
              </div>

              {lastUpdated && (
                <p className="last-updated">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                  {autoRefresh && ' • Auto-refresh enabled (15 min)'}
                </p>
              )}
            </section>

            <section className="hourly-forecast">
              <h3>24-Hour Forecast</h3>
              <TemperatureTrendChart hourlyData={hourlyForecast} unit={unit} />
              <div className="hourly-container">
                {hourlyForecast.map((hour, index) => (
                  <div key={index} className="hourly-item">
                    <span className="hour-time">{formatTime(hour.time)}</span>
                    <WeatherIcon code={hour.code} size={32} />
                    <span className="hour-temp">{convertTemp(hour.temp, unit)}°</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="daily-forecast">
              <h3>7-Day Forecast</h3>
              <div className="daily-container">
                {dailyForecast.map((day, index) => (
                  <div key={index} className="daily-item">
                    <span className="day-name">{formatDay(day.date)}</span>
                    <WeatherIcon code={day.code} size={40} />
                    <span className="day-condition">{WMO_CODES[day.code]?.description || 'Unknown'}</span>
                    <div className="day-temps">
                      <span className="day-high">{convertTemp(day.max, unit)}°</span>
                      <span className="day-low">{convertTemp(day.min, unit)}°</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
