import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(res => {
        setCountry(res)
      })
  }, [name])
  
  return country
}

const kakka = () => { (<p>hello</p>) }

const Country = ({ country }) => {

  if (!country) {
    return null
  }
  //console.log("country: ", country)
  console.log("country.data.population:", country.data.population)
  console.log("country.data.name.common", country.data.name.common)
  console.log("country.data.capital", country.data.capital)
  if (!country.data.population) {
    console.log("EI")
    return (
      <div>
        not found...
      </div>
    )
  }
  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name.common}`} />
    </div>
  )
}

/*
<div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>

*/


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <button onClick={() => console.log('wish you were beer')}>press</button>
      <Country country={country} />
    </div>
  )
}

export default App