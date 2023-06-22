import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/FilterReducer'
import NotificationReducer from './reducers/NotificationReducer'
import anecdoteService from './services/anecdotes'
import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'

const storeExp = configureStore({
    reducer: {
        anecdotes: reducer,
        filter: filterReducer,
        notification: NotificationReducer
    }
})

anecdoteService.getAll().then(anecs =>
    storeExp.dispatch(setAnecdotes(anecs))
)


export default storeExp