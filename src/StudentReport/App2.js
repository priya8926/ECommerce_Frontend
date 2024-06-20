import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateStudent from '../StudentReport/CreateStudent'
import Students from './Students'
import Navbar from './Navbar'
import Department from './Department'
import StudentDetails from './StudentDetails'
import Attendence from './Attendence'
import AttendaceReport from './AttendaceReport'
import AttendanceByDate from './AttendanceByDate'
import CreateCollege from './CreateCollege'
import Faculty from './Faculty'
import AllClgs from './AllClgs'
import AllFaculty from './AllFaculty'

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
        <Route path='/attendance/report' element = {<AttendaceReport/>} />
        <Route path='/attendance/report/date' element = {<AttendanceByDate/>} />
        <Route path='/college/new' element = {<CreateCollege/>} />
        <Route path='/college/all' element = {<AllClgs/>} />
        <Route path='/college/faculty' element = {<Faculty/>} />
        <Route path='/college/faculty/all' element = {<AllFaculty/>} />
      </Routes>
    </>
  )
}

export default App2
