import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/FilterReducer'
import NotificationReducer from './reducers/NotificationReducer'

const storeExp = configureStore({
    reducer: {
        anecdotes: reducer,
        filter: filterReducer,
        notification: NotificationReducer
    }
})

export default storeExp