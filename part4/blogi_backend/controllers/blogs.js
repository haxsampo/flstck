const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    // blogs:  username, name, id
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    /*SEURAVAAKS POPULATION HOMMAT USERROUTER POSTIIN
    */
    console.log(request.body)
    let blog = new Blog(request.body)
    let user = 0
    if (request.body.user) {
        user = await User.findById(request.body.user)
    } else {
        const users = await User
            .find({}).populate('blogs')
        user = users[0]
    }
    blog.user = user._id
    if (!blog.likes) {
        blog.likes = 0
    }
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