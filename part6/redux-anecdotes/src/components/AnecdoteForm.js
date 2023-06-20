import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.new_anecdote.value
        event.target.new_anecdote.value = ''
        dispatch(createAnecdote(content))
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