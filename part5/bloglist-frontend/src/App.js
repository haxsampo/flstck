import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const sortBlogsDescending = (a, b) => {
    return parseFloat(b.likes) - parseFloat(a.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(sortBlogsDescending))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUserId', JSON.stringify(user.userid))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addLike = async ({ id }) => {
    let blag = blogs.find(n => n.id === id)
    const newBlag = {
      user: blag.user.id,
      likes: blag.likes + 1,
      author: blag.author,
      title: blag.title,
      url: blag.url
    }
    const resp = await blogService.update(id, newBlag)
    setBlogs(blogs.map(blarg => blarg.id !== id ? blarg : resp.data))
  }

  const delBlog = async (blog) => {
    let blag = blogs.find(n => n.id === blog.id)
    const resp = await blogService.deleteBlog(blog.id, blog.user.id)
    const newblogs = blogs.filter(bl => bl.id !== blag.id)
    setBlogs(newblogs)
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          updateFunc={() => addLike(blog)}
          delFunc={() => delBlog(blog)} />
      )}
    </div>
  )

  const logoutForm = () => (
    <button onClick={handleLogout}>
      Logout
    </button>
  )

  const addBlog = async (blogObj) => {
    const ret = await blogService.create(blogObj)
    setBlogs(blogs.concat(ret))

  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Login</h2>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <Togglable buttonLabel='new blog'>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogForm()}
        {logoutForm()}
      </div>
      }
    </div>

  )
}

export default App