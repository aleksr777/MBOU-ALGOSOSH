import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './fonts/fonts.css'
import './components/ui/common.css'
import './components/ui/box.css'
import App from './components/app/app'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById( 'root' )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
