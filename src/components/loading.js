import React from "react"
import load from '../assets/tail-spin.svg'
import { lightBlue } from '../util'

const Loading = () => (
  <div style={{backgroundColor: lightBlue, textAlign: 'center', paddingTop: '40vh', width:'100vw', height:'100vh'}}>
    <img style={{width:'50%', height:'50%'}}src={load}/>
  </div>
)
export default Loading