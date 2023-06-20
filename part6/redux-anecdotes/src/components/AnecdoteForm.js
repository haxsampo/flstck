import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/noteReducer'

const newAnecdote = () => {

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.new_anecdote.value
        event.target.new_anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name="new_anecdote" /></div>
            <button type="submit">create</button>
        </form>
    )
}

export default newAnecdote