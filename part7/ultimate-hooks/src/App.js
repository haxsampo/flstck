import { useState, useEffect } from 'react'
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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const baseUrli = baseUrl

  const create = async (resource) => {
    const ret = await axios.post(baseUrli, resource)
    setResources(resources.concat(resource))
    console.log("ret: ", ret)
  }

  const paskaperse = (kamat) => {
    kamat.forEach(el => {
      setResources(resources.concat([el]))
    })
  }
  //array1.forEach(element => console.log(element));
  const getAll = async () => {
    const ret = await axios.get(baseUrli)
    let paskahomoperse = []
    setResources(ret.data)
    return ret.data
  }



  const service = {
    create,
    getAll,
    setResources,
    resources,
    paskaperse
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')


  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  //setResources(getAll())
  useEffect(() => {
    noteService.getAll()
  }, [])

  console.log("notes", notes)
  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App