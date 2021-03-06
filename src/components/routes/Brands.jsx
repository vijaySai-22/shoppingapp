import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Brandcard from '../cards/Brandcard'

export default function Brands() {
  const [brands,setBrands] = useState([])
  useEffect(()=>{
      fetch(`https://api-mobilespecs.azharimm.site/v2/brands`)
      .then(res=>res.json())
      .then(json=>setBrands(json.data))
  },[])
  return (
    <div>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} style={{margin:"auto"}}>
          {
            (brands)?
            brands.map((e)=> <Brandcard name={e.brand_name} img={e.brand_slug} key={Math.random()}/>)
            :null
          }
        </Row>
      </Container>
    </div>
  )
}
