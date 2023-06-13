import { useState } from "react"

const Blog = ({ blog }) => {
  const [showFull, setShowFull] = useState(false)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: showFull ? 'none' : '' }
  const showWhenVisible = { display: showFull ? '' : 'none' }

  const fullBlog = (blog) => (
    <div>
      {blog.title} {blog.author} {blog.likes} {blog.url}
    </div>
  )

  const miniBlog = (blog) => (
    <div>
      {blog.title}
    </div>
  )

  const toggleVisibility = () => {
    setShowFull(!showFull)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
      </div>
      {showFull && fullBlog(blog)}
      {!showFull && miniBlog(blog)}

    </div>
  )
}

export default Blog