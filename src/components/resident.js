import React from "react";
import { ListGroupItem } from 'react-bootstrap';
import Page from './page';

const Resident = (props) => {
  const { ambulation
        , attendance
        , birthDate
        , moveInDate
        , id
        , lastName
        , firstName
        , levelOfCare
        , preferredName
        , room
        , status
        , createdAt
        , updatedAt
        , programs
      } = props;

  const getActivities = list => list.map((activity) => 
      <ListGroupItem key={activity.programId}>
        { filterList(activity.programId)[0] && filterList(activity.programId)[0].name }, Engagement: {activity.status}
      </ListGroupItem>
    );

  const filterList = id => programs.filter((program) => program.id === id)

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

export default Resident;