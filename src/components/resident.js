import React from "react"
import { ListGroupItem } from 'react-bootstrap'
import Page from './page'
import { selectProgramById } from '../store/programSlice'
import { selectResidentById } from '../store/residentSlice'
import { useSelector } from 'react-redux'

const Resident = (props) => {
  const {
    ambulation,
    attendance,
    birthDate,
    moveInDate,
    id,
    lastName,
    firstName,
    levelOfCare,
    preferredName,
    room,
    status,
    createdAt,
    updatedAt
  } = useSelector(selectResidentById(props.resident))


  const getActivities = list => list.map((activity) => 
      <ListGroupItem key={activity.programId}>
        { useSelector(selectProgramById(activity.programId)).name }, Engagement: { activity.status }
      </ListGroupItem>
    )

  const mainText = [
    `Birthday: ${birthDate['@ts']}`,
    `Move In Date: ${moveInDate['@ts']}`,
    `Room Number: ${room}`,
    `Status: ${status}`
  ]

  return <Page 
      titleText={`${lastName}, ${preferredName? `"${preferredName}" ,`: ""} ${firstName}`}
      subtitleText={`Care Needed: ${levelOfCare}, Ambulation: ${ambulation}`}
      bodyText={mainText}
      listTitle='Activities'
      list={getActivities(attendance)}
      footerText={`Created: ${createdAt['@ts']}, Updated: ${updatedAt['@ts']}`}
      id={id}
    />
}

export default Resident