import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter ,Routes, Route,Router } from 'react-router-dom'
import axios from 'axios'
import Signin from './components/signin'
import Signup from './components/signup'
import Todo from './todo'

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/todo' element={<Todo/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
