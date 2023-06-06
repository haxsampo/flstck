const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})


usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (username == undefined || password == undefined) {
        return response.status(400).json({ error: 'content missing, password or username' })
    }
    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: 'password or username too short, min. 3 symbols' })
    }
    const users = await User.find({})
    const usernames = users.map(usr => usr.username)
    if (usernames.includes(username)) {
        return response.status(400).json({ error: `username ${username} already in use, please use a unique username` })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter