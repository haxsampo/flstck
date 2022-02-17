import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PeopleNumbers from './components/PeopleNumbers'
import Formi from './components/Formi'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
   personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
},[])

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
      setErrorMessage(`${newName} update succesful`)
    } else {
      personService
      .create(kakkapylly)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)},5000)
      })
      setErrorMessage(`lissätty ${kakkapylly.name}`)
        setTimeout(() => {
          setErrorMessage(null)},5000)
    }
  }

  const removeName = (event, id) => {
    console.log("removeName id: ", id)
    let res = personService.remove(id)
        .then(response => {
          setErrorMessage(`element ${id} removed from db`)
          setTimeout(()=> {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(err => {
          if(err.response.status == 404) {
            setErrorMessage(
              `Information of element id: ${id}, already removed from db`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
          } else {
            setErrorMessage(
              `Problem removing element id: ${id}, from db`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
          }
        })
      setPersons(persons.filter(prs => prs.id !== id))   
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
      <Notification message={errorMessage}/>
      <Filter filterValue={newFilter} handleFilterChange={handleFilterChange} />
      <Formi addName={addName} newName={newName} handleNameChange={handleNameChange}
             newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PeopleNumbers persons={persons} 
        newFilter={newFilter} 
        buttFunc={removeName}/>
    </div>
  )
}

export default App
