import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'

export default function Brandcard(props) {
    const [image,setImage] = useState([])
    useEffect(()=>{
        fetch(`https://api-mobilespecs.azharimm.site/v2/brands/${props.img}`)
        .then(res=>res.json())
        .then(json=>setImage(json.data.phones[0].image))
    },[])
  return (
    <div>
        <Card style={{ width: '20rem',margin:"3px"}}>
            <Card.Img variant="top" src={image} style={{width:"200px",margin:"auto"}} />
            <Card.Body>
                <Card.Title> {props.name} </Card.Title>
                <Button style={{backgroundColor:"#13f060",color:"black"}} >Open</Button>
            </Card.Body>
        </Card>
    </div>
  )
}
