import { useState } from "react"

const Blog = ({ blog, updateFunc }) => {
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

  const fullBlog = (blog) => {
    const newBlag = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    return (
      <div>
        {blog.title} {blog.author} {blog.likes} {blog.url}
        <button onClick={() => updateFunc(blog.id, newBlag)}>like</button>
      </div>
    )

  }
  /*
  {
  user: "5a43e6b6c37f3d065eaaa581", - eli käyttäjä -> blog.user.id
  likes: 1,
  author: "Joel Spolsky",
  title: "The Joel Test: 12 Steps to Better Code",
  url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/"
  }
  */

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