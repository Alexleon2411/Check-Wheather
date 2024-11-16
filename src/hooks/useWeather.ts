import axios from "axios"
import { SearchType } from "../type"
import { object, string, number, parse,  InferOutput} from "valibot"
import {useMemo, useState} from 'react'



const WeatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number(),

  })
})
export type Weather = InferOutput<typeof WeatherSchema>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}

export default function useWeather() {

  const [weather, setWeather] = useState<Weather>(initialState)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_APPID
    setLoading(true)
    setWeather(initialState)
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.ciudad},${search.country}&appid=${appId}`
      const { data } = await axios(geoUrl)
      if(!data[0]){
        setNotFound(true)
      }
      const {lat, lon} = data[0]
      const climaUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      const {data: weatherResult} = await axios(climaUrl)
      const result =  parse(WeatherSchema, weatherResult)
      if(result) {
        setWeather(result)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  const hasWeatherData = useMemo(()  => weather.name , [weather])
  return {
    fetchWeather,
    hasWeatherData,
    weather,
    loading,
    notFound
  }

}
