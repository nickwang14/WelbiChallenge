import React from "react"
import { Card, ListGroup } from 'react-bootstrap'
import { selectPrograms } from '../store/programSlice'
import { selectResidents } from '../store/residentSlice'
import { useSelector } from "react-redux"
import { lightBlue, darkBlue, backgroundGrey } from '../util'

import { Link } from "react-router-dom"

const List = (props) => {
  let list = []
  const { programs } = props
  programs ? list = useSelector(selectPrograms) : list = useSelector(selectResidents)

  return (
    <Card style ={{marginBottom: 20}}>
      <ListGroup>
        <Card.Header style={{fontWeight: 500, color: darkBlue, backgroundColor: backgroundGrey}}>{programs? 'PROGRAMS' : 'RESIDENTS'}</Card.Header>
        {
          list.map( item => 
            <ListGroup.Item key={item.id}>
              <Link to={`/${programs? 'program' : 'resident'}/${item.id}`} style={{color:lightBlue}}>
                <Card.Text>{item.name}</Card.Text>
              </Link>
            </ListGroup.Item>
          )
        }
      </ListGroup>
    </Card>
)}

export default List