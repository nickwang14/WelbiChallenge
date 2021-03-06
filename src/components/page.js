import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap'
import {darkBlue, lightBlue, backgroundGrey} from '../util'

import { residentProgram, selectPrograms } from '../store/programSlice'
import { selectResidents, linkResidentToProgram } from '../store/residentSlice'
import Loading from './loading'

const engagementOptions = [
  'Active',
  'Passive',
  'Declined'
]

const Page = (props) => {
  const residentsStatus = useSelector(state => state.residents.status)
  const programsStatus = useSelector(state => state.programs.status)
  if (residentsStatus !== 'idle' && programsStatus !== 'idle')  return <Loading/>

  const {
    titleText,
    subtitleText,
    bodyText,
    listTitle,
    list,
    footerText,
    id
  } = props
  const [connectItems, setConnectItems] = useState('')
  const [engagementStatus, setEngagementStatus] = useState('')
  const dispatch = useDispatch()

  let handleClick
  let updateList
  let getDropdownItems
  if (listTitle === 'Attendees') {
    handleClick = async () => {
      let response = await dispatch(residentProgram({residentId: connectItems.id, programId: id, status: engagementStatus}))
      useDispatch(linkResidentToProgram(id, connectItems.id, engagementStatus))
      return response
    }
    updateList = useSelector(selectResidents)
    getDropdownItems = () => updateList ? updateList.length && updateList.map(residentItem => (
      <Dropdown.Item
        eventKey={`${titleText}-${residentItem.id}`}
        key={`${titleText}-${residentItem.id}`}
        active={connectItems.id}
        onClick={e => setConnectItems({id: residentItem.id, name: residentItem.name})}
      > 
        {residentItem.name}
      </Dropdown.Item>)) : <Dropdown>Loading...</Dropdown>
  } else {
    handleClick = async () => {
      let response = await dispatch(residentProgram({residentId: id, programId: connectItems.id, status: engagementStatus}))
      useDispatch(linkResidentToProgram(connectItems.id, id, engagementStatus))
      return response
    }
    updateList = useSelector(selectPrograms)
    getDropdownItems = () => updateList ? updateList.length && updateList.map(programItem => (
      <Dropdown.Item
        eventKey={`${titleText}-${programItem.id}`}
        key={`${titleText}-${programItem.id}`}
        active={connectItems.id}
        onClick={e => setConnectItems({id: programItem.id, name: programItem.name})}
      > 
        {programItem.name}
      </Dropdown.Item>)) : <Dropdown>Loading...</Dropdown>
    }

  return (
    <Card key={id}>
     <Card.Header style={{backgroundColor: backgroundGrey, color: darkBlue}}>
        <Card.Title id='title' > { titleText } </Card.Title>
        <Card.Subtitle className='mb-2 text-muted'> { subtitleText } </Card.Subtitle>
      </Card.Header>
      <Card.Body style={styles.card}>
        {bodyText[0] && bodyText.map((line, index) => <Card.Text key={index}> { line } </Card.Text>)}
        <Form.Label style={{fontWeight: 500}}>Add Resident to Event</Form.Label>
        <Row>
          <DropdownButton
            style={{marginLeft:'15px'}}
            id={`list-${titleText}-${id}`}
            title={connectItems ? connectItems.name : 'Pick One'}
          >
            {getDropdownItems()}
          </DropdownButton>
          <DropdownButton
            style={{marginLeft:'1%'}}
            id={`status-${titleText}-${id}-`}
            title={engagementStatus ? engagementStatus : 'Pick One'}
          >
            {
             engagementOptions.map(option => (
              <Dropdown.Item
                eventKey={`${titleText}-${option}`}
                key={`${titleText}-${option}`}
                active={engagementStatus}
                onClick={e => setEngagementStatus(option)}
              > 
                {option}
              </Dropdown.Item>))
            }
          </DropdownButton>
          <Button style={{marginLeft:'1%'}} onClick={handleClick} type='submit'> Connect </Button>
        </Row>
      </Card.Body>
        <Card.Title style={{textAlign:'left', marginLeft:'20px'}}> { listTitle } </Card.Title>
      <ListGroup className='list-group-flush' style={{textAlign:'left'}}>
      {
        list ? list.length && list.map((listItem) => 
          <ListGroupItem key={listItem.id}>
            { listItem.name }, Engagement: { listItem.status }
          </ListGroupItem>) : <ListGroupItem key={0}>Nothing to show</ListGroupItem>
      }
      </ListGroup>
      <Card.Body style={{...styles.card, color: lightBlue}}>
        <Link to={'/'}>Back</Link>
      </Card.Body>
      <Card.Footer style={{color: darkBlue}}>
        { footerText }
      </Card.Footer>
    </Card>
)}

const styles = {
  card: {
    textAlign: 'left',
  }
}  

export default Page