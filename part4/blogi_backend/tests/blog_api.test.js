const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

let testUser = ""
let testToken = ""

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

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('salainensalasana', 10)
    const user = new User({ username: 'pruut', passwordHash })
    await user.save()

    const loginInfo = await api
        .post('/api/login')
        .send({ username: 'pruut', password: 'salainensalasana' })
    testToken = loginInfo._body.token
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

        const loginInfo = await api
            .post('/api/login')
            .send({ username: 'pruut', password: 'salainensalasana' })
        const token = loginInfo._body.token
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blag)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        const res = await api.get('/api/blogs')
        expect(res.body).toHaveLength(initialBlogs.length + 1)
    })

    test('correct blog objects in db after adding', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send({ username: 'pruut', password: 'salainensalasana' })
        const token = loginInfo._body.token
        blag = {
            title: 'BS',
            author: 'Reeeandspan',
            url: 'lasdjolaisuhdjoaisdj',
            likes: 1
        }
        let blogobji = new Blog(blag)
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blag)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const res = await Blog.find({})
        let authors = res.map(x => x.author)
        expect(authors).toContain("Reeeandspan")
    })

    test('tokenless post should return 401', async () => {
        blag = {
            title: 'BS',
            author: 'Reeeandspan',
            url: 'lasdjolaisuhdjoaisdj',
            likes: 1
        }
        const rest = await api
            .post('/api/blogs')
            .send(blag)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

})


describe('blog api, empty fields', () => {

    test('no likes -> 0', async () => {
        const loginInfo = await api
            .post('/api/login')
            .send({ username: 'pruut', password: 'salainensalasana' })
        const token = loginInfo._body.token
        blag = {
            title: 'this blog does not have the like field',
            author: 'Reeeandspan',
            url: 'lasdjolaisuhdjoaisdj'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blag)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const res = await Blog.find({})
        let newBlog = res.filter(blog => blog.title == 'this blog does not have the like field')
        expect(newBlog[0].likes).toEqual(0)
    })

    test('no title or url -> 400', async () => {
        const newBlog = {
            author: "aljd",
            likes: 3
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testToken}`)
            .send(newBlog)
            .expect(400)
        const res = await Blog.find({})
        expect(res.length).toEqual(initialBlogs.length)
    })

    test('no title  -> 400', async () => {
        const newBlog = {
            author: "aljd",
            likes: 3,
            url: "aosihdjoaisuhdj"
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testToken}`)
            .send(newBlog)
            .expect(400)
        const res = await Blog.find({})
        expect(res.length).toEqual(initialBlogs.length)
    })

    test('no url  -> 400', async () => {
        const newBlog = {
            author: "aljd",
            likes: 3,
            title: "tämä on titteli"
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testToken}`)
            .send(newBlog)
            .expect(400)
        const res = await Blog.find({})
        expect(res.length).toEqual(initialBlogs.length)
    })

})

describe('blog api, deletion', () => {

    test('one blog removal, please and thank you', async () => {
        const notesAtStart = await Blog.find({})
        blag = {
            title: 'Bloody Shovel',
            author: 'Spandrell',
            url: 'lasdjolaisuhdjoaisdj',
            likes: 1
        }
        let blogobji = new Blog(blag)
        let resp = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${testToken}`)
            .send(blag)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        del_blog = JSON.parse(resp.text)
        del_id = JSON.parse(resp.text).id
        const blogsAfterAdding = await Blog.find({})
        expect(blogsAfterAdding).toHaveLength(initialBlogs.length + 1)

        await api
            .delete(`/api/blogs/${del_id}`)
            .set('Authorization', `Bearer ${testToken}`)
            .expect(204)
        const notesAfterDeleting = await Blog.find({})
        expect(notesAfterDeleting).toHaveLength(initialBlogs.length)
        const titles = notesAfterDeleting.map(blag => blag.title)
        expect(titles).not.toContain(del_blog.title)

    })

})


describe('blog api, update', () => {

    test('update one', async () => {
        const startingBlogs = await Blog.find({})
        const change_this = startingBlogs[0]
        const old_likes = change_this.likes
        change_this.likes += 1
        await api
            .put(`/api/blogs/${change_this.id}`)
            .send(change_this)
            .expect(204)
        const notesAfterUpdate = await Blog.find({})
        expect(notesAfterUpdate).toHaveLength(initialBlogs.length)
        const corrBlog = notesAfterUpdate.filter(blag => blag.title == change_this.title)
        expect(corrBlog[0].likes).toEqual(old_likes + 1)
    })

})


afterAll(async () => {
    await mongoose.connection.close()
})