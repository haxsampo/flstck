const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    /*
    let user = 0
    if (request.body.user) {
        user = await User.findById(request.body.user)
    } else {
        const users = await User
            .find({}).populate('blogs')
        user = users[0]
    }
    */
    //let blog = new Blog(request.body)
    const user = await User.findById(request.user)
    const body = request.body
    let likes = body.likes === undefined || body.likes === null
        ? 0
        : body.likes
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes,
        user: user._id
    })
    /*
    blog.user = user._id
    if (!blog.likes) {
        blog.likes = 0
    }
    */
    if (!blog.url || !blog.title) {
        response.status(400).end()
        return
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    console.log("decotok ", decodedToken)
    console.log("req.params.id blog:", blog)
    console.log("decodedToken.id", decodedToken.id, "    request.body.user:", blog.user)
    if (decodedToken.id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'blog targeted for deletion not made by active user - access denied' })
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    if (!request.params.id) {
        response.status(400).end()
        return
    }
    const blag = new Blog(request.body._doc)
    await Blog.findByIdAndUpdate(request.params.id, blag, { new: true })
    response.status(204).end()
})

module.exports = blogRouter