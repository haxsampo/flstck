import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/NotificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.new_anecdote.value
        event.target.new_anecdote.value = ''
        dispatch(setNotification("new anecdote created", 5000))
        /*
        dispatch(setNotification("new anecdote created"))
        setTimeout(() => {
            dispatch(setNotification(""))
        }, 5000)
        */
        dispatch(createAnecdote(content))
        /*
        const newAnec = await anecdoteService.createNew(content)
        dispatch(createAnecdote(newAnec))
        */
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