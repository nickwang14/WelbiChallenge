import React from "react"
import { Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux'
import Header from './components/header'
import List from './components/list'
import Loading from './components/loading'
import Program from './components/program'
import Resident from './components/resident'
import { lightBlue } from './util'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  const residentsStatus = useSelector(state => state.residents.status)
  const programsStatus = useSelector(state => state.programs.status)
  if (residentsStatus !== 'idle' && programsStatus !== 'idle')  return <Loading/>
  
  return (
    <div className="App" style={{textAlign: 'center', padding: '2%', backgroundColor: lightBlue}}>
    <Router>
      <Switch>
        <Route path="/program/:id" children={<Program/>} />
        <Route path="/resident/:id" children={<Resident/>} />
        <Route path='/'>
          <Header />
          <Home/>
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App

const Home = () => (
  <Row>
    <Col xs={12} s={6} md={6} lg={6}>
      <List programs/>
    </Col>
    <Col xs={12} s={6} md={6} lg={6}>
      <List residents/>
    </Col>
  </Row>
)