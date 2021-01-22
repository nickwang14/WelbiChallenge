// import React, { useState } from "react";
// import { Button, DropdownButton, Dropdown, Form, Col} from 'react-bootstrap';
// import Api from '../apiCalls';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const DropdownPicker = (props) => {
//     const {
//         singlePicker,
//         items,
//         activeItems
//     } = props

//     return (
//         <DropdownButton
//         key={variant}
//         id={`dropdown-variants-${variant}`}
//         title={name}
//       >
//         {items.map(item => return(
//             <Dropdown.Item eventKey={item}>Action</Dropdown.Item>
//         ))}
        
//         <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
//         <Dropdown.Item eventKey="3" active>
//           Active Item
//         </Dropdown.Item>
//         <Dropdown.Divider />
//         <div>{singlePicker? 'Select One' : 'Select All That Apply'}</div>
//       </DropdownButton>
//     )
// }