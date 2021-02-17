import React from "react"
import Page from './page'
import { selectProgramById } from '../store/programSlice'
import { selectResidentById } from '../store/residentSlice'
import { useSelector } from 'react-redux'
import { formatDateTime } from '../util'

import { useParams } from "react-router-dom";

const Program = () => {
  let { id } = useParams()
  const {
    name,
    location,
    attendance,
    dimension,
    facilitators,
    hobbies,
    isRepeated,
    levelOfCare,
    tags,
    start,
    end
  } = useSelector(state => selectProgramById(state, id))

  const mainText = [
    `Dimension: ${dimension}`,
    `Located: ${location}, Facilitators: ${facilitators.join(', ')}`,
    `Level of Care: ${levelOfCare.join(', ')}`,
    `Suitable Interests: ${hobbies.length > 0 ? hobbies.join(', ') : 'None'}`,
    `Recurring: ${isRepeated? 'Yes': 'No'}`
  ]

  const attendeeListWithNames = () => attendance.map(
    attendee => {
      return { ...attendee, name: useSelector(state => selectResidentById(state, attendee.residentId)).name, id: attendee.residentId }
  })

  return <Page 
  titleText={name}
  subtitleText={`Start: ${formatDateTime(start)}, End: ${formatDateTime(end)}`}
  bodyText={mainText}
  listTitle='Attendees'
  list={attendeeListWithNames(attendance)}
  footerText={`Tags: ${tags.length > 0 ? tags.join(', ') : 'None'}`}
  id={id}
/>
}

export default Program