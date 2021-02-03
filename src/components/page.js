import React, { useState } from "react"
import { Card, ListGroup, Button, DropdownButton, Dropdown, Form, } from 'react-bootstrap'
import { residentProgram } from '../store/programSlice'
import { useSelector } from "react-redux";

const Page = (props) => {
  const {
    titleText,
    subtitleText,
    bodyText,
    listTitle,
    list,
    footerText,
    id
  } = props
  const [itemId, setItemId] = useState('')

  handleClick = async () => listTitle === "Attendees" ? await residentProgram(id, itemId) : await residentProgram(itemId, id)

  return (
    <Card key={id} style={{margin: '5px'}}>
      <Card.Body style={styles.card}>
        <Card.Title id="title"> { titleText } </Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> { subtitleText } </Card.Subtitle>
        {bodyText[0] && bodyText.map((line, index) => <Card.Text key={index}> { line } </Card.Text>)}
      </Card.Body>
      <Card.Title> { listTitle } </Card.Title>
      <ListGroup className="list-group-flush"> { list } </ListGroup>
      <Form.Label style={{fontWeight: 500 , marginRight:10}}>Add Resident to Program</Form.Label>
        <DropdownButton
          id={'listTitle'}
          title={list}
        >
          {list.map(listItem => (
          <Dropdown.Item
            eventKey={listItem}
            active={listItem}
            onClick={e => setItemId(listItem) }
          >
            {listItem}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      <Button onClick={handleClick}> Add Resident to Program </Button>
      
      <Card.Footer> { footerText } </Card.Footer>
    </Card>
)}

const styles = {
  card: {
    textAlign: 'left',
    margin: '5px'
  }
}  

export default Page