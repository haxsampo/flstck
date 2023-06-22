import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import store from '../store'
import { setNotification } from './NotificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const changed = action.payload.anec
      /*
      const chgAne = state.find(n => n.id === id)
      const changed = {
        ...chgAne,
        votes: chgAne.votes + 1
      }
      */
      return state.map(anec => anec.id !== id ? anec : changed)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecs))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnec))
  }
}

export const newVote = (id) => {
  return async dispatch => {
    const chgAne = store.getState().anecdotes.find(n => n.id === id)
    const changed = {
      ...chgAne,
      votes: chgAne.votes + 1
    }
    /*
    const chgAne = state.find(n => n.id === id)
    const changed = {
      ...chgAne,
      votes: chgAne.votes + 1
    }
    */
    const changedAnecdote = await anecdoteService.voteFor(id, changed)
    dispatch(vote({ id: id, anec: changedAnecdote }))
  }
}

export default anecdoteSlice.reducer


/*

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

    createAnecdote(state, action) {
      state.push(action.payload)
    },

    const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


*/