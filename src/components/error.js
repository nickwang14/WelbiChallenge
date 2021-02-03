import React from "react"
import { Button } from 'react-bootstrap'

const Error = () => {
  return (
    <div
    style={{
      width:"100%",
      height: "100%",
      textTransform: "capitalize",
      textAlign: "right",
      justifyContent: "bottom"
    }}
    >
      Sorry! Something Went Wrong <b/>
      Please Return to the Last Page
      <Button onClick={window.history.back()}>Return</Button>
    </div>
  )
}

export default Error