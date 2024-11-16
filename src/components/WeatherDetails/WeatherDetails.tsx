import { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import style from './WeatherDetails.module.css'


type WeatherDetailsProps = {
  weather: Weather
}

export default function WeatherDetails({weather} : WeatherDetailsProps) {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Clima de: {weather.name}</h2>
      <p className={style.actualtemperatura}>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={style.temperatures}>
        <p>Max: <span>{formatTemperature(weather.main.temp_max)}&deg;C</span></p>
        <p>Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C</span></p>
      </div>

    </div>
  )
}
