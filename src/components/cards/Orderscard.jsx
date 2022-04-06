import { getAuth } from '@firebase/auth'
import { deleteDoc, doc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'

export default function Orderscard(props) {
    const [data,setData] = useState([])
    useEffect(()=>{
        async function fetchData(){
            await fetch(`https://api-mobilespecs.azharimm.site/v2/${props.slug}`)
            .then(res=>res.json())
            .then(json=>setData(json.data))
        }
        fetchData()
    })
    const [id,setId] = useState()
    useEffect(()=>{
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setId(user.email)
        }
        console.log(id)
      },[])
    const cancel=async ()=>{
        await deleteDoc(doc(db, `${id}orders`, `${props.slug}`));
    }
  return (
    <div>
        <Container>
            <Card style={{maxWidth:"600px",margin:"20px auto"}}>
                <Row>
                    <Col md={6} sm={12}>
                        <Card.Img variant="top" src={data.thumbnail} style={{width:"200px",padding:"20px"}} alt="..." />
                    </Col>
                    <Col md={6} sm={12}>
                        <Card.Body>
                            <Card.Title>{props.mobileName}</Card.Title>
                            <Button variant="primary" as={Link} to={`/mobile/${props.slug}`} >View</Button>
                            <br/>
                            <Button variant="warning" onClick={cancel} style={{margin:"10px"}}>Cancel Order</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    </div>
  )
}
