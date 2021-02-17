import React from 'react'
import FormModal from './formModal'
import logo from '../assets/logo.png'
import { darkBlue } from '../util'

const Header = () => {
  return (
  <div style={header}>
    <a href='https://welbi.co' alt='The Real Welbi Site' style={{textDecoration:'none'}}>
      <img style={{display: 'inline', size: '60%'}} src={logo}/>
    </a>
    <h1 style={{fontSize: '15vh'}}>WELBI</h1>
    <FormModal title='Program'/>
    <FormModal title='Resident'/>
  </div>
)}

export default Header

const header = {
  color: darkBlue,
  backgroundColor: 'white',
  height: '96vh',
  borderRadius: '5px',
  padding: '5%',
  marginBottom: 20

}