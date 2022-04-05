import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Latestcard(props) {
  return (
    <div>
        <Card style={{ width: '12rem',margin:"3px" }}>
            <Card.Img variant="top" src={props.img} style={{width:"150px",margin:"auto",padding:"10px"}} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
            </Card.Body>
            <Button style={{backgroundColor:"#13f060",width:"50%",color:"black",margin:"-20px auto 5px"}} as={Link} to={`/mobile/${props.slug}`}>View</Button>
        </Card>
    </div>
  )
}
