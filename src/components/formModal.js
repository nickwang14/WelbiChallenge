import React, { useState } from "react"
import { Button, Modal} from 'react-bootstrap'
import { ResidentForm, ProgramForm } from './addForm'
import "react-datepicker/dist/react-datepicker.css"

const FormModal = (props) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  return (
    <>
      <Button variant="primary" style={{margin:10}} onClick={handleShow}> Add {props.title} </Button>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" size='lg'>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          { props.title === 'Resident'? <ResidentForm handleClose={handleClose} /> : <ProgramForm  handleClose={handleClose} /> }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FormModal