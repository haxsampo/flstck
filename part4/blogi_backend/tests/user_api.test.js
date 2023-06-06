const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salainensalasana', 10)
    const user = new User({ username: 'pruut', passwordHash })
    await user.save()
    const pwh = await bcrypt.hash('vielasalaisempi', 10)
    const us2 = new User({ username: 'groot', pwh })
    await us2.save()
})


describe('user creation tests', () => {
    test('add one correctly', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: "mega-lukki",
            name: "Luukasa Masa",
            password: "ebin",
            blogs: []
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await User.find({})
        expect(usersAfter.length).toEqual(usersAtStart.length + 1)
        const usersInDb = usersAfter.map(usr => usr.username)
        expect(usersInDb).toContain(newUser.username)
    })

    test('undefined username', async () => {
        const newUser = {
            name: "Luukasa Masa",
            password: "ebin",
            blogs: []
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain("content missing, password or username")
    })

    test('undefined password', async () => {
        const newUser = {
            username: "ebin",
            name: "Luukasa Masa",
            blogs: []
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain("content missing, password or username")
    })
    /*
        test('', async () => {
    
    
        })
    */

    test('username length min 3', async () => {
        const newUser = {
            username: "eb",
            name: "Luukasa Masa",
            password: "0a8d9u2hq9he",
            blogs: []
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain("password or username too short, min. 3 symbols")
    })

    test('password length min 3', async () => {
        const newUser = {
            username: "ebasda32ds",
            name: "Luukasa Masa",
            password: "0",
            blogs: []
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain("password or username too short, min. 3 symbols")
    })

    test('not unique username results in 400', async () => {
        const newUser = {
            username: "pruut",
            name: "Luukasa Masa",
            password: "0641635184",
            blogs: []
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(res.body.error).toContain("already in use, please use a unique username")
    })
})