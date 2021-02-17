import React from "react"
import Page from './page'
import { selectProgramById } from '../store/programSlice'
import { selectResidentById } from '../store/residentSlice'
import { useSelector } from 'react-redux'
import { formatDate } from '../util'

import { useParams } from "react-router-dom";

const Resident = () => {
  let { id } = useParams()
  const {
    ambulation,
    attendance,
    birthDate,
    moveInDate,
    lastName,
    firstName,
    levelOfCare,
    preferredName,
    room,
    status,
    createdAt,
    updatedAt
  } = useSelector(state => selectResidentById(state, id))

  const mainText = [
    `Birthday: ${formatDate(birthDate['@ts'])}`,
    `Move In Date: ${formatDate(moveInDate['@ts'])}`,
    `Room Number: ${room}`,
    `Status: ${status}`
  ]

  const attendanceListWithNames = () => attendance.map(
    activity => {
      return { ...activity, name: useSelector(state => selectProgramById(state, activity.programId)).name, id: activity.programId }
  })

  return <Page
      id={id}
      titleText={`${lastName}, ${preferredName? `"${preferredName}" ,`: ""} ${firstName}`}
      subtitleText={`Care Needed: ${levelOfCare}, Ambulation: ${ambulation}`}
      bodyText={mainText}
      listTitle='Activities'
      list={attendanceListWithNames()}
      footerText={`Created: ${formatDate(createdAt['@ts'])}, Updated: ${formatDate(updatedAt['@ts'])}`}

    />
}

export default Resident