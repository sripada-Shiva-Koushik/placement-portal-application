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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='' element={<Home />}></Route>
          <Route path='/placement' element={<Placement />}></Route>
          <Route path='/internship' element={<Internship />}></Route>
          <Route path='/create' element={<AddStudent />}></Route>
          <Route path='/addplacement' element={<AddPlacement />}></Route>
          <Route path='/studentEdit/:id' element={<EditStudent />}></Route>
          <Route path='/placementEdit/:id' element={<EditPlacement />}></Route>
          <Route path='/selectEdit/:id' element={<SelectEdit />}></Route>
          <Route path='/singlePlaceEdit/:id/:company' element={<SinglePlaceEdit />}></Route>\
          <Route path='/selectDelete/:id' element={<StudentDelete />}></Route>
          <Route path='/singlePlaceDelete/:id/:company' element={<SinglePlaceDelete />}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
