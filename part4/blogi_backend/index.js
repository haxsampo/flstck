require('dotenv').config()

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


/*
indexiin vain app.listen ja express sovellusroskat eli mitä tossa ylempänä

ympäristömuuttujien käsittely eli mongodb uri ja portti muualle. jostain syystä dotenv käytössä
*/

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
/*
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}
*/

//const password = process.argv[2]

//const mongoUrl = `mongodb+srv://fullstack:${password}@cluster22.tfkvv.mongodb.net/?retryWrites=true&w=majority`
const password = process.env.PASSWORD
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
    console.log(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})