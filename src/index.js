import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
require('dotenv').config()

// import * as serviceWorker from './serviceWorker'

import App from './App'

import store from './store/store'
import { fetchResidents } from './store/residentSlice'
import { fetchPrograms } from './store/programSlice'

store.dispatch(fetchResidents())
store.dispatch(fetchPrograms())

const rootElement = document.getElementById("root")
ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <App />
     </Provider>
  </React.StrictMode>,
  rootElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
