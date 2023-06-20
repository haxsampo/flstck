import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/FilterReducer'


const storeExp = configureStore({
    reducer: {
        anecdotes: reducer,
        filter: filterReducer
    }
})

export default storeExp