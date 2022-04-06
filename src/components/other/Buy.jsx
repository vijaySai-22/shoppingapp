import { getAuth } from '@firebase/auth'
import { setDoc, doc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {db} from '../../firebase'

export default function Buy() {
  const {name} = useParams()
  const [data,setData] = useState([])
  useEffect(()=>{
    async function fetchData(){
      await fetch(`https://api-mobilespecs.azharimm.site/v2/${name}`)
      .then(res=>res.json())
      .then(json=>setData(json.data))
    }
    fetchData()
  },[])
  console.log(data)
  // getting user mail Id
  const [id,setId] = useState()
    useEffect(()=>{
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setId(user.email)
        }
        console.log(id)
    },[])
  const order=async ()=>{
    try{
        await setDoc(doc(db, `${id}orders`,`${name}`), {
          itemname: data.phone_name,
          itemslugname: name
        });
    }catch(e){
        console.log(e)
    }
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
                        <Card.Title>{data.phone_name}</Card.Title>
                        <Button variant="danger" as={Link} to={`/mobile/${name}`} style={{margin:"10px"}}>Cancel</Button>
                        <Button variant="success" as={Link} to="/orders" onClick={order}>Order</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    </div>
  )
}
