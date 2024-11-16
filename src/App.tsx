import style from './app.module.css'
import Alert from './components/Alert/Alert'
import Form from './components/form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'
import useWeather from './hooks/useWeather'

function App() {
  const {weather, loading, notFound,fetchWeather, hasWeatherData} = useWeather()
  return (
    <>
      <h1 className={style.title}>desde clima</h1>
      <div className={style.container}>
        <Form
          fetchWeather={fetchWeather}

        />
        {loading && <Spinner/>}
        {hasWeatherData &&
          <WeatherDetails
            weather={weather}
          />
        }
        {notFound && <Alert>Ciudad No Encontrada &#128547;</Alert>}
      </div>
    </>
  )
}

export default App
