import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useNotifDispatch } from '../NotifContext'


const AnecdoteForm = () => {
  const dispatch = useNotifDispatch()
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 }, {
      onError: (newA) => {
        dispatch({ payload: `VIRHE TÖÖTÖÖT, anecdote must have length 5 or more` })
        setTimeout(() => {
          dispatch({ payload: '' })
        }, 5000)
      },
      onSuccess: (asd) => {
        dispatch({ payload: `anecdote "${content}" created` })
        setTimeout(() => {
          dispatch({ payload: '' })
        }, 5000)
      }
    })

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
