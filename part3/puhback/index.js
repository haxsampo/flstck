const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

morgan.token('nimi', function (req, res) { return  JSON.stringify(req.body.name)})
morgan.token('nro', function (req, res) { return JSON.stringify(req.body.number)})

app.use(morgan(':method :url :status :response-time ms Nimi\: :nimi nro\: :nro'))
//app.use(morgan('Nimi\: :nimi nro\: :nro')) POST /api/persons 400 31 - 2.944 ms


let persons = [
    {
      "name": "Antero Mertaranta",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Jaana Naru",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Jani Apina",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Maria Poppeli",
      "number": "39-23-642312",
      "id": 4
    }
  ]

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const prs = persons.find(prs => prs.id === id)
    if(prs) {
        res.json(prs)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if(body.name === undefined) {
    return res.status(400).json({error:"undefined content"})
  }
  const prs = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random()*1000)
  }
  if(persons.map(person => person.name).includes(prs.name)) {
    res.status(400).send({ error: 'name must be unique' })
  } else {
    persons = persons.concat(prs)
    res.json(prs)
  }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(prs => prs.id !== id)
    res.status(204).end()
})

app.get('/api/persons', (req, res)=> {
    res.send(JSON.stringify(persons))
})

app.get('/info', (req, res)=> {
    let t = new Date()
    let dt = t.toDateString()+" "+t.toLocaleTimeString()
    res.send(`<p>Phonebook has ${persons.length} people</p>`+JSON.stringify(dt))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

