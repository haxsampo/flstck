import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/NotificationReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.new_anecdote.value
        event.target.new_anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification("new anecdote created"))
        setTimeout(() => {
            dispatch(setNotification(""))
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="new_anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote