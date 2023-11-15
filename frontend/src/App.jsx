import { useState } from 'react'
import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Internship from './Internship'
import Placement from './Placement'
import Home from './Home'
import AddStudent from './AddStudent'
import AddPlacement from './AddPlacement'
import EditStudent from './EditStudent'
import EditPlacement from './EditPlacement'
import SelectEdit from './SelectEdit'
import SinglePlaceEdit from './SinglePlaceEdit'
import StudentDelete from './StudentDelete'
import SinglePlaceDelete from './SinglePlaceDelete'
import BarChart from './Charts/BarChart'
import AddInternship from './AddInternship'
import SelectInternEdit from './SelectInternEdit'
import SingleInternEdit from './SingleInternEdit'
import SingleInternDelete from './SingleInternDelete'
import MainClass from './MainClass'
import ResumeMaker from './ResumeMaker'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<MainClass />}></Route>
        <Route path='/' element={<Dashboard />}>

          <Route path='/home' element={<Home />}></Route>
          <Route path='/resume' element={<ResumeMaker />}></Route>
          <Route path='/placement' element={<Placement />}></Route>
          <Route path='/internship' element={<Internship />}></Route>
          <Route path='/create' element={<AddStudent />}></Route>
          <Route path='/addplacement' element={<AddPlacement />}></Route>
          <Route path='/addInternship' element={<AddInternship />}></Route>
          <Route path='/studentEdit/:id' element={<EditStudent />}></Route>
          <Route path='/placementEdit/:id' element={<EditPlacement />}></Route>
          <Route path='/selectEdit/:id' element={<SelectEdit />}></Route>
          <Route path='/selectInternEdit/:id' element={<SelectInternEdit />}></Route>
          <Route path='/singleInternEdit/:id/:comany' element={<SingleInternEdit />}></Route>
          <Route path='/singlePlaceEdit/:id/:company' element={<SinglePlaceEdit />}></Route>
          <Route path='/singleInternDelete/:id/:company' element={<SingleInternDelete />}></Route>
          <Route path='/selectDelete/:id' element={<StudentDelete />}></Route>
          <Route path='/singlePlaceDelete/:id/:company' element={<SinglePlaceDelete />}></Route>\
          <Route path='/chartEx' element={<BarChart />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
