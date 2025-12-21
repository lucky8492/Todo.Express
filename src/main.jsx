import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Route,Router } from 'react-router-dom'
import Signin from './components/signin.jsx'
import Signup from './components/signin.jsx'
import Todo from './Todo.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

    <App />

)
