import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Trendingcard(props) {
    const [image,setImage] = useState([])
    useEffect(async ()=>{
        await fetch(`${props.detail}`)
        .then(res=>res.json())
        .then(json=>setImage(json.data.phone_images[0]))
    },[])
  return (
    <div>
        <Card style={{ width: '12rem',margin:"3px"}}>
            <Card.Img variant="top" src={image} style={{width:"150px",margin:"auto",padding:"10px"}} />
            <Card.Body>
                <Card.Title> {props.name} </Card.Title>
                <Button style={{backgroundColor:"#13f060",color:"black",margin:"-5px auto auto"}} as={Link} to={`/mobile/${props.slug}`} >Open</Button>
            </Card.Body>
        </Card>
    </div>
  )
}
