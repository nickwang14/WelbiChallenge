import React from "react"
import { Card, ListGroup } from 'react-bootstrap'
import { selectPrograms } from '../store/programSlice'
import { selectResidents } from '../store/residentSlice'
import { useSelector } from "react-redux"

import { Link } from "react-router-dom"

const List = (props) => {
  let list = []
  const { programs } = props
  programs ? list = useSelector(selectPrograms) : list = useSelector(selectResidents)

  return (
    <Card>
      <ListGroup>
        <Card.Header style={{fontWeight: 500}}>{programs? 'PROGRAMS' : 'RESIDENTS'}</Card.Header>
        {
          list.map( item => 
            <ListGroup.Item key={item.id}>
              <Link to={`/${programs? 'program' : 'resident'}/${item.id}`}>
                <Card.Text>{item.name}</Card.Text>
              </Link>
            </ListGroup.Item>
          )
        }
      </ListGroup>
    </Card>
)}

export default List