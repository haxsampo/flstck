import React, { useState } from 'react'

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

const PeopleNumbers = (props) => {
  return(
    <ul>
        {props.persons.filter(prs => prs.name.toLowerCase().includes(props.newFilter))
        .map(prs => <li key={prs.name}>
          {prs.name} {prs.number}
          </li>)}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0700-123-123' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const kakkapylly = {
      name: newName,
      number: newNumber
    }
    let onlynames = persons.map(a => a.name)
    if(!(persons.map(a => a.name).includes(newName))) {
      setPersons(persons.concat(kakkapylly))
      setNewName('')
      setNewNumber('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
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
