import { createContext, useReducer, useContext } from 'react'

const notifChange = (state, action) => {
    return action.payload
}

const NotifContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notif, notifDispatch] = useReducer(notifChange, '')
    return (
        <NotifContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotifContext.Provider>
    )
}

export const useNotifValue = () => {
    const notifAndDispatch = useContext(NotifContext)
    return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
    const notifAndDispatch = useContext(NotifContext)
    return notifAndDispatch[1]
}

export default NotifContext