import React from 'react'
import FormModal from './formModal'

const Header = () => {
  return (
  <div style={header}>
    <h1>WELBI</h1>
    <FormModal title='Program'/>
    <FormModal title='Resident'/>
  </div>
)}

export default Header

const header = {
  color: 'white',
  padding: '5%'
}