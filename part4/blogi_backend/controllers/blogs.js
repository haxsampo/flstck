const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.likes) {
        blog.likes = 0
    }
    if (!blog.url || !blog.title) {
        response.status(400).end()
        return
    }
    const savedBlog = await blog.save()
    response.json(savedBlog)
})

blogRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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