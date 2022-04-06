import React, { useEffect, useState } from 'react'
import { Card, Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { deleteDoc, doc } from '@firebase/firestore'
import { db } from '../../firebase'
import { getAuth } from '@firebase/auth'

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
    const [id,setId] = useState()
    useEffect(()=>{
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setId(user.email)
        }
        console.log(id)
      },[])
    const deleteItem =async ()=>{
        await deleteDoc(doc(db, `${id}cart`, `${props.slug}`));
    }
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
                        <Button variant="primary" as={Link} to={`/buy/${props.slug}`}>Buy Now</Button>
                        <br/>
                        <Button variant="danger" onClick={deleteItem} style={{margin:"10px"}}>Remove</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    </div>
  )
}
