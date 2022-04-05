import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'

export default function Carttcard(props) {
    const [mobileData,setMobileData] = useState([])
    useEffect(()=>{
        async function fetchData(){
        await fetch(`https://api-mobilespecs.azharimm.site/v2/${props.slug}`)
        .then(res=>res.json())
        .then(json=>setMobileData(json.data))
        }
        fetchData()
    },[])
  return (
    <div>
        <Container>
            <Card style={{maxWidth:"600px",margin:"20px auto"}}>
                <Row>
                    <Col md={6} sm={12}>
                        <Card.Img variant="top" src={mobileData.thumbnail} style={{width:"200px",padding:"20px"}} alt="..." />
                    </Col>
                    <Col md={6} sm={12}>
                        <Card.Body>
                        <Card.Title>{mobileData.phone_name}</Card.Title>
                        <Button variant="primary">Buy Now</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    </div>
  )
}
