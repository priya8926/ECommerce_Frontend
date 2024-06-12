import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateStudent from '../StudentReport/CreateStudent'
import Students from './Students'
import Navbar from './Navbar'
import Department from './Department'
import StudentDetails from './StudentDetails'
import Attendence from './Attendence'

function App2() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<CreateStudent/>}/>
        <Route path='/all' element={<Students/>}/>
        <Route path='/department' element={<Department/>}/>
        <Route path='/department/studentDetails/:id' element={<StudentDetails/>}/>
        <Route path='/attendence' element = {<Attendence/>} />
      </Routes>
    </>
  )
}

export default App2
