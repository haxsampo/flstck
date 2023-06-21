import { createSlice } from '@reduxjs/toolkit'
import { filterChange } from './FilterReducer'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'initial notification',
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer