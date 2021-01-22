import React, { useState } from "react";
import { Button, DropdownButton, Dropdown, Form, Col} from 'react-bootstrap';
import Api from '../apiCalls';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const levelOfCare = ['ASSISTED', 'INDEPENDENT', 'LONGTERM', 'MEMORY'];
const residentAmbulation = ['CANE', 'NOLIMITATIONS', 'WALKER', 'WHEELCHAIR'];
const eventDimension = ['Community', 'Intellectual', 'Physical', 'Social'];
const eventTags = ['Outing', 'Special', 'Technology', 'Vendor'];
const eventHobbies = [ 'Alchohol'
                     , 'Arts'
                     , 'Billiards'
                     , 'Role Playing'
                     , 'Board Games'
                     , 'Boating'
                     , 'Computer'
                     , 'Crafts'
                     , 'Dance'
                     , 'Debate'
                     , 'Learning'
                     , 'Paintball'
                     , 'Pottery'
                     , 'Pub Games'
                     , 'Public Speaking'
                     , 'Space'
                     , 'Storytelling'
                     , 'Video Games'
                     , 'Virtual Reality'
                    ];
const eventLocation = ['Cafeteria', 'Group Study Room F', 'Gymnasium', 'Parking Lot', 'The Green Door', 'Workshop']
const eventFacilitators = ['Director Of Rec', 'Rec Aide', 'Resident']

// const GetFormattedDate = (date) => `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`

const ResidentForm = (props) => {
  const [resident, setResident] = useState({
    id: '',
    preferredName: '',
    lastName: '',
    firstName: '',
    room: '',
    birthDate: new Date("2000-01-01"),
    moveInDate: new Date(),
    levelOfCare: '',
    ambulation: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(resident)
    //Api.addResident(resident);
    props.handleClose();
  };
  
  return (
  <Form onSubmit={handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="id">
        <Form.Control type="text" placeholder="Resident Id" onChange={e => setResident({...resident, id: e.target.value}) }/>
      </Form.Group>
      <Form.Group as={Col} controlId="preferredName">
        <Form.Control type="text" placeholder="Nickname" onChange={e => setResident({...resident, preferredName: e.target.value}) }/>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="lastName">
        <Form.Control type="text" placeholder="Last Name" onChange={e => setResident({...resident, lastName: e.target.value}) }/>
      </Form.Group>
      <Form.Group as={Col} controlId="firstName">
        <Form.Control type="text" placeholder="First Name" onChange={e => setResident({...resident, firstName: e.target.value}) }/>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="room">
        <Form.Control type="text" placeholder="Room Number" onChange={e => setResident({...resident, room: e.target.value}) }/>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="birthDate">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Birth Date</Form.Label>
        <DatePicker
        id="birthDate"
        selected={resident.birthDate}
        onChange={date => setResident({...resident, birthDate: {'@ts': date}}) }/>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="moveInDate">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Move In Date</Form.Label>
        <DatePicker
        id="moveInDate"
        selected={resident.moveInDate}
        onChange={date => setResident({...resident, moveInDate: {'@ts':date}}) }/>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="levelOfCare">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Level Of Care</Form.Label>
        <DropdownButton
          id={'levelOfCare-Dropdown'}
          title={resident.levelOfCare? resident.levelOfCare : 'Pick One'}
        >
          {levelOfCare.map(care => (
          <Dropdown.Item
            eventKey={care}
            active={resident.levelOfCare === care}
            onClick={() => setResident({...resident, levelOfCare: care}) }
          >
            {care}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
      <Form.Group as={Col} controlId="ambulation">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Ambulation</Form.Label>
        <DropdownButton
          id={'ambulation-Dropdown'}
          title={resident.ambulation? resident.ambulation : 'Pick One'}
        >
          {residentAmbulation.map(type => (
          <Dropdown.Item
            eventKey={type}
            active={resident.ambulation === type}
            onClick={() => setResident({...resident, ambulation: type}) }
          >
            {type}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
    </Form.Row>
    <Button variant="primary" type="submit">Save</Button>
  </Form>
)}

const ProgramForm = (props) => {
  const [program, setProgram] = useState({
    id: '',
    name: '',
    allDay: false,
    isRepeated: false,
    start: new Date(),
    end: new Date(),
    location: '',
    facilitators: [],
    levelOfCare: '',
    dimension: '',
    tags: [],
    hobbies: []
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(program);
    // Api.addProgram(program);
    props.handleClose();
  };

  return (
  <Form onSubmit={handleSubmit}>
    <Form.Row>
      <Form.Group as={Col} controlId="id">
        <Form.Control type="text" placeholder="Program Id" onChange={e => setProgram({...program, id: e.target.value}) }/>
      </Form.Group>
      <Form.Group as={Col} controlId="programName">
        <Form.Control type="text" placeholder="Activity" onChange={e => setProgram({...program, name: e.target.value}) }/>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="allDay">
        <div className="mb-3">
          <Form.Check label={'All Day Event?'} type={'checkbox'}  onClick={() => setProgram({...program, allDay: !program.allDay}) }/>
        </div>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="isRepeated">
        <div className="mb-3">
          <Form.Check label={'Recurring Event?'} type={'checkbox'} onClick={() => setProgram({...program, isRepeated: !program.isRepeated}) }/>
        </div>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="start">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Start</Form.Label>
          <DatePicker
          selected={program.start}
          showTimeSelect={program.allDay}
          onChange={date => setProgram({...program, start: date})}
          />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Form.Group as={Col} controlId="end">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>End</Form.Label>
          <DatePicker
          selected={program.end}
          showTimeSelect={program.allDay}
          onChange={date => setProgram({...program, end: date})}
          />
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="eventLocation">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Location</Form.Label>
        <DropdownButton
          id={'Location-Dropdown'}
          title={program.location ? program.location : 'Pick One'}
        >
          {eventLocation.map(locationItem => (
          <Dropdown.Item
            eventKey={locationItem}
            active={program.location === locationItem}
            onClick={e => setProgram({...program, location: locationItem}) }
          >
            {locationItem}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
      <Form.Group as={Col} controlId="eventDimension">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Dimension</Form.Label>
        <DropdownButton
          id={'Dimension-Dropdown'}
          title={program.dimension ? program.dimension : 'Pick One'}
        >
          {eventDimension.map(dimensionItem => (
          <Dropdown.Item
            eventKey={dimensionItem}
            active={program.dimension === dimensionItem}
            onClick={e => setProgram({...program, dimension: dimensionItem}) }
          >
            {dimensionItem}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
      <Form.Group as={Col} controlId="levelOfCare">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Level Of Care</Form.Label>
        <DropdownButton
          id={'levelOfCare-Dropdown'}
          title={program.levelOfCare ? program.levelOfCare : 'Pick One'}
        >
          {levelOfCare.map(care => (
          <Dropdown.Item
            eventKey={care}
            active={program.levelOfCare === care}
            onClick={() => setProgram({...program, levelOfCare: care}) }
          >
            {care}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
    </Form.Row>

    <Form.Row>
      <Form.Group as={Col} controlId="eventFacilitators">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Facilitators</Form.Label>
        <DropdownButton
          id={'Facilitators-Dropdown'}
          title={program.facilitators.length ? `${program.facilitators.length} ${program.facilitators.length>1 ? 'Facilitators' : 'Facilitator'} Selected` : 'Select All That Apply'}
        >
          {eventFacilitators.map(facilitator => (
            <Dropdown.Item
              eventKey={facilitator}
              active={program.facilitators.length > 0 && program.facilitators.includes(facilitator)}
              onClick={() => {
                let newFacilitators = program.facilitators.length > 0 && program.facilitators.includes(facilitator) ? program.facilitators.filter(member => member !== facilitator && member) : [...program.facilitators, facilitator]
                setProgram({ ...program, facilitators: newFacilitators})
                }
              }
            >
            {facilitator}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
      <Form.Group as={Col} controlId="eventTags">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Tags</Form.Label>
        <DropdownButton
          id={'Tags-Dropdown'}
          title={program.tags.length ? `${program.tags.length} ${program.tags.length>1? 'Tags' : 'Tag'} Selected` : 'Select All That Apply'}
        >
          {eventTags.map(tag => (
            <Dropdown.Item
              eventKey={tag}
              active={program.tags.length > 0 && program.tags.includes(tag)}
              onClick={() => {
                let newTags = program.tags.length > 0 && program.tags.includes(tag) ? program.tags.filter(member => member !== tag && member) : [...program.tags, tag]
                setProgram({ ...program, tags: newTags})
                }
              }
            >
            {tag}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
      <Form.Group as={Col} controlId="eventHobbies">
        <Form.Label style={{fontWeight: 500 , marginRight:10}}>Hobbies</Form.Label>
        <DropdownButton
          id={'Hobbies-Dropdown'}
          title={program.hobbies.length ?`${program.hobbies.length} ${program.hobbies.length>1? 'Hobbies' : 'Hobby'} Selected` : 'Select All That Apply'}
        >
          {eventHobbies.map(hobby => (
            <Dropdown.Item
              eventKey={hobby}
              active={program.hobbies.length > 0 && program.hobbies.includes(hobby)}
              onClick={() => {
                let newhobbies = program.hobbies.length > 0 && program.hobbies.includes(hobby) ? program.hobbies.filter(member => member !== hobby && member) : [...program.hobbies, hobby]
                setProgram({ ...program, hobbies: newhobbies})
                }
              }
            >
            {hobby}
          </Dropdown.Item>)
          )}
        </DropdownButton>
      </Form.Group>
    </Form.Row>
    <Button variant="primary" type="submit">Save</Button>
  </Form>
)}

export { ResidentForm, ProgramForm }