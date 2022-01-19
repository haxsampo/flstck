import React, { useState, useEffect } from 'react'
import axios from 'axios'

const weather_key = process.env.REACT_APP_API_KEY

const Filter = (props) => {
  return(
    <p>
      <input value={props.filterValue} onChange={props.handleFilterChange}/>
    </p>
  )
}

const Langs = ({langs}) => {
  return(
    <>
    <h3>languages</h3>
    <ul>
      {Object.keys(langs).map(lk => <li key={lk}>
        {langs[lk]}
      </li>)}
    </ul>
    </>
  )
}

const Country = (props) => {
  let country = props.country
  console.log(country)
  console.log(Object.keys(country.coatOfArms)[0]) 
  return(
    <>
    <p>{country.name.official}</p>
    <p>Capital: {country.capital}</p>
    <p>pop: {country.population}</p>
    <Langs langs={country.languages} />
    <img src={country.flags[Object.keys(country.flags)[0]]} />
    <h3>weather in {country.capital}</h3>
    <CapWea capitol={country.capital} />
    </>
  )
}

const CapWea = ({capitol}) => {


  return(
    <></>
  )
}

const Countries = (props) => {
  return(
    <>
    <AllCountries countries={props.countries} userFilter={props.userFilter} setNewFilter={props.setNewFilter} />
    </>
  )
}

const ShowButt = ({setNewFilter, filsu}) => {
  return(
    <button onClick={() => setNewFilter(filsu)}  />
  )
}


const AllCountries = (props) => {
  let filtCountries = props.countries.filter(ctr => ctr.name.official.toLowerCase().includes(props.userFilter))
  console.log(filtCountries[0])
  if (filtCountries.length > 10) {
    return(
      <p>Tuu meny mätses, pliis spesifai anoter filtter</p>
    )
  } else if(filtCountries.length > 1 && filtCountries.length !== 0) {
    return(
      <ul>
        {filtCountries.map(ctr => <li key={ctr.name.official}>
          {ctr.name.official} <ShowButt setNewFilter={props.setNewFilter} filsu={ctr.name.official.toLowerCase()}/>
        </li>)}
      </ul>
    )
  } else if (filtCountries.length == 1) {
    return(
      <Country country={filtCountries[0]}/>
    )
  } else {
    return(
      <p>No mätses</p>
    ) 
  }
}

const App = () => {

  const [maat, setMaat] = useState([])
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setMaat(response.data)
    })
  }, [])

 
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>maat</h2>
      <Filter filterValue={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countries={maat} userFilter={newFilter} setNewFilter={setNewFilter} /> 
    </div>
  )

}

export default App
