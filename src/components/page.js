import React from "react";
import { Card, ListGroup } from 'react-bootstrap';

const Page = (props) => {
  const { titleText
        , subtitleText
        , bodyText
        , listTitle
        , list
        , footerText
        , id
        } = props;
      
  return (
    <Card key={id} style={{margin: '5px'}}>
      <Card.Body style={styles.card}>
        <Card.Title id="title"> { titleText } </Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> { subtitleText } </Card.Subtitle>
        {bodyText[0] && bodyText.map((line, index) => <Card.Text key={index}> { line } </Card.Text>)}
      </Card.Body>
      <Card.Title> { listTitle } </Card.Title>
        <ListGroup className="list-group-flush"> { list } </ListGroup>
      <Card.Footer> { footerText } </Card.Footer>
    </Card>
)}

const styles = {
  card: {
    textAlign: 'left',
    margin: '5px'
  }
}  

export default Page;