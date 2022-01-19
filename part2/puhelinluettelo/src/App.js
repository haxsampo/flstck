import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
  return(
    <p>
      <input value={props.filterValue} onChange={props.handleFilterChange}/>
    </p>
  )
}

const Formi = (props) => {
  return(
    <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
          <p></p>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const DelButt = ({id}) => {
  return(
    <button onClick={() => personService.remove(id)}>delete</button>
  )
}

const PeopleNumbers = (props) => {
  return(
    <ul>
        {props.persons.filter(prs => prs.name.toLowerCase().includes(props.newFilter))
        .map(prs => <li key={prs.id}>
          {prs.name} {prs.number}
          <DelButt id={prs.id}/>
          </li>)}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })

  const addName = (event) => {
    event.preventDefault()
    const kakkapylly = {
      name: newName,
      number: newNumber
    }
    let onlynames = persons.map( prs => prs.name)
    if(onlynames.includes(newName)) {
      let result = window.confirm(`Set new number for ${newName}`);
      if(result){
      let i = persons.findIndex((prs => prs.name === newName))
      let clone = persons.map( prs => prs )
      clone[i].number = newNumber
      personService
        .update(persons[i].id ,kakkapylly)
        .then(response => {
          setPersons(clone)
        })
      }
    } else {
      personService
      .create(kakkapylly)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={newFilter} handleFilterChange={handleFilterChange} />
      <Formi addName={addName} newName={newName} handleNameChange={handleNameChange}
             newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PeopleNumbers persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App
