import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'
import { selectProgramIds } from './store/programSlice'
import { selectResidentIds } from './store/residentSlice'

import Program from "./components/program"
import Resident from "./components/resident"
import FormModal from './components/formModal'

/* eslint-disable no-undef */
const App = () => {
  const programs = useSelector(selectProgramIds)
  const residents = useSelector(selectResidentIds)
  
  return (
    <div className="App">
      <h2>Welbi Event Calendar</h2>
      <FormModal title='Resident'/>
      <FormModal title='Program'/>
      {/* { programs.map( program => <Program props={program} key={program}/> ) }
      { residents.map( resident => <Resident props={resident} key={resident} />) } */}
      <Resident props={0} key={0} />
    </div>
  )
}

export default App
