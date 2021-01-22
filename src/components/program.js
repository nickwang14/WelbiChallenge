import React from "react";
import { ListGroupItem } from 'react-bootstrap';
import Page from './page'

const Program = (props) => {
  const { id
        , name
        , location
        , attendance
        , dimension
        , facilitators
        , hobbies
        , isRepeated
        , levelOfCare
        , tags
        , start
        , end
        , residents
      } = props;
      
  const getProgramAttendees = list => 
    list.map( (attendee) => 
      <ListGroupItem key={attendee.residentId}>
        { filterList(attendee.residentId)[0] && filterList(attendee.residentId)[0].name }, Engagement: {attendee.status}
      </ListGroupItem>
    );

  const filterList = id => residents.filter((resident) => resident.id === id)

  const mainText = [
    `Dimension: ${dimension}`,
    `Located: ${location}, Facilitators: ${facilitators.join(', ')}`,
    `Level of Care: ${levelOfCare.join(', ')}`,
    `Suitable Interests: ${hobbies.length > 0 ? hobbies.join(', ') : 'None'}`,
    `Recurring: ${isRepeated? 'Yes': 'No'}`
  ]

  return <Page 
  titleText={name}
  subtitleText={`Start: ${start}, End: ${end}`}
  bodyText={mainText}
  listTitle='Attendees'
  list={getProgramAttendees(attendance)}
  footerText={`Tags: ${tags.length > 0 ? tags.join(', ') : 'None'}`}
  id={id}
/>
}

export default Program;