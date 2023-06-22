import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
/*
const reduc = combineReducers({
  anecdotes: reducer,
  filter: filterReducer
})

const store = createStore(reduc)
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)