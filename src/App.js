import React from "react"
import { Row, Col } from 'react-bootstrap'
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
    <div className="App" style={{textAlign: 'center'}}>
      <h2>Welbi Event Calendar</h2>
      <FormModal title='Resident'/>
      <FormModal title='Program'/>
      <Row>
      {
        (programs.length && residents.length) ?
        <>
          <Col> {programs.map( program => <Program program={program} key={program}/> )} </Col>
          <Col> {residents.map( resident => <Resident resident={resident} key={resident} />)} </Col>
        </>
         : <Col>Loading...</Col>
      }
      </Row>
      
    </div>
  )
}

export default App
