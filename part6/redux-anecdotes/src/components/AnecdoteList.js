import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/NotificationReducer'

const Anecdotes = () => {
    const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state)

    const anecdotes = useSelector(state => {
        //console.log("anecdotes", state.anecdotes)
        const filteredAnecdotes = state.anecdotes.filter(a => a.content.includes(state.filter))
        return filteredAnecdotes
    })

    const voter = (id) => {
        dispatch(vote(id))
        dispatch(setNotification(`you voted for ${id}`))
        setTimeout(() => {
            dispatch(setNotification(""))
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voter(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Anecdotes