import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import storeExp from './store'
/*
const reduc = combineReducers({
  anecdotes: reducer,
  filter: filterReducer
})

const store = createStore(reduc)
*/
const store = storeExp

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)