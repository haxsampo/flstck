import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blogObj = {
            title: title,
            author: author,
            url: url
        }

        const ret = createBlog(blogObj)
        console.log(ret)
        //setBlogs(blogs.concat(ret))
        setTitle('')
        setAuthor('')
        setUrl('')
        /*
        setErrorMessage(`Added new blog: ${ret.title} by ${ret.author}`)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
        */
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                Title
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                Url
                <input
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogForm