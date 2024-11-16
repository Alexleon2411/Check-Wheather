import React from 'react'
import { countries } from '../../data/countries'
import style from './Form.module.css'
import { useState } from 'react'
import { SearchType } from '../../type'
import Alert from '../Alert/Alert'


type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

export default function Form({fetchWeather}: FormProps) {

  const [search, setSearch] = useState<SearchType>({
    ciudad: '',
    country: ''
  })
  const [alert, setAlert] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value } = e.target

    setSearch({
      ...search,
      [name]: value
    })
  }
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(Object.values(search).includes('')){
      setAlert('Todos los campos son requeridos')
      return
    }
    fetchWeather(search)

  }
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert} &#128544;</Alert>}
      <div className={style.field}>
        <label htmlFor="ciudad">Ciudad:</label>
        <input type="text" id="ciudad" name="ciudad" placeholder='Ciudad' value={search.ciudad} onChange={handleChange}/>
      </div>
      <div className={style.field}>
        <label htmlFor="country">País:</label>
        <select name="country" id="country" value={search.country} onChange={handleChange}>
          <option value="">-- Selecciona un país --</option>
          {countries.map(country => (
            <option key={country.code} value={country.code}>{country.name}</option>
          ))}
        </select>
      </div>
      <input className={style.submit} type="submit" value="Consultar Clima" />
    </form>
  )
}
