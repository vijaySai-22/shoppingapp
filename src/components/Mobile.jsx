import React, { useEffect, useState } from 'react'
import { Carousel, Col, Container, Row, Table } from 'react-bootstrap'
import { useParams } from 'react-router'

export default function Mobile() {
  const {name} = useParams()
  const [mobileData,setMobileData] = useState([])
  useEffect(async ()=>{
    await fetch(`https://api-mobilespecs.azharimm.site/v2/${name}`)
    .then(res=>res.json())
    .then(json=>setMobileData(json.data))
    console.log(mobileData)
  },[])
  return (
    <div>
      <Container>
        <h1>{mobileData.phone_name}</h1>
        <Row>
            <Col md={6}>
              {
                (mobileData.phone_images)?
                <Carousel style={{width:"350px",margin:"auto"}}>
                  {
                    mobileData.phone_images.map((e)=>
                      <Carousel.Item>
                        <img src={e} style={{width:"300px",height:"300px"}} />
                      </Carousel.Item>
                    )
                  }
                </Carousel>
                :null
              }
              <img src={mobileData.thumbnail} style={{width:"300px",height:"300px",padding:"10px",margin:"10px",border:"2px solid black"}}/>
            </Col>
            <Col md={6}>
              <Table striped bordered hover style={{margin:"10px"}}>
                <tbody>
                  <tr>
                    <td>Brand</td>
                    <td>{mobileData.brand}</td>
                  </tr>
                  <tr>
                    <td>Dimension</td>
                    <td>{mobileData.dimension}</td>
                  </tr>
                  <tr>
                    <td>OS</td>
                    <td>{mobileData.os}</td>
                  </tr>
                  <tr>
                    <td>Storage</td>
                    <td>{mobileData.storage}</td>
                  </tr>
                </tbody>
              </Table>
              {
                mobileData.specifications.map((e)=>
                  <div>
                    <p>{e.title}</p>
                    <Table striped bordered hover style={{margin:"10px"}}>
                      <tbody>
                        {
                          e.specs.map((x)=>
                            <tr>
                              <td>{x.key}</td>
                              <td>{x.val}</td>
                            </tr>
                          )
                        }
                      </tbody>
                    </Table>
                  </div>
                )
              }
            </Col>
        </Row>
        
      </Container>
    </div>
  )
}