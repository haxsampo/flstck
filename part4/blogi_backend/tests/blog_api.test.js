const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

/*
Tyhjennä testitietokanta
Alusta testitietokanta tietylle määrälle paskaa
-> testaa määrä
*/

const initialBlogs = [
    {
        title: 'Slate Star Codex',
        author: 'Scott Alexander',
        url: 'https://slatestarcodex.com/',
        likes: 3
    },
    {
        title: 'Astral Codex Ten',
        author: 'Sama kaveri',
        url: 'https://astralcodexten.substack.com/',
        likes: 2
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blobj = new Blog(initialBlogs[0])
    await blobj.save()
    let blobj1 = new Blog(initialBlogs[1])
    await blobj1.save()
})


describe('blog api tests, basic stuff really', () => {

    test('blags are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('initial amount of returned blags is correct', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initialBlogs.length)
    })

    test('blog has field id instead of _id', async () => {
        const res = await api.get('/api/blogs')
        console.log(res)
        expect(res.body[0].id).toBeDefined()
    })

})

describe('blog api, post', () => {

    test('amount of blogs is correct after adding one', async () => {
        blag = {
            title: 'Bloody Shovel',
            author: 'Spandrell',
            url: 'lasdjolaisuhdjoaisdj',
            likes: 1
        }
        let blogobji = new Blog(blag)
        await blogobji.save()
        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initialBlogs.length + 1)
    })

    test('correct blog objects in db after adding', async () => {
        blag = {
            title: 'BS',
            author: 'Reeeandspan',
            url: 'lasdjolaisuhdjoaisdj',
            likes: 1
        }
        let blogobji = new Blog(blag)
        await blogobji.save()
        const res = await Blog.find({})
        //console.log("MNJAAA", res)
        let authors = res.map(x => x.author)
        expect(authors).toContain("Reeeandspan")
    })

})


afterAll(async () => {
    await mongoose.connection.close()
})