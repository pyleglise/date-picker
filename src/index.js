import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import DatePicker from '../lib/components/datePicker'
export { DatePicker }
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
