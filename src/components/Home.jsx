import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import Latestcard from './Latestcard'
import Trendingcard from './Trendingcard'
export default function Home() {
  const [trending,setTrending] = useState([])
  useEffect(()=>{
    fetch("https://api-mobilespecs.azharimm.site/v2/top-by-interest")
    .then(res=>res.json())
    .then(json=>setTrending(json.data.phones))
  },[])

  const [latest,setLatest] = useState([])
  useEffect(() => {
    fetch("https://api-mobilespecs.azharimm.site/v2/latest")
    .then(res=>res.json())
    .then(json=>setLatest(json.data.phones))
  }, [])

  return (
    <div>
        <Container>
          <h1 style={{textAlign:"left",margin:"20px"}} >Trending Mobiles:</h1>
          <Row md={4} xs={2} sm={2} lg={6}>
            {
              (trending)?
              trending.map((e)=><Trendingcard name={e.phone_name} detail={e.detail} slug={e.slug} key={Math.random()}/>)
              :null
            }
          </Row>
          <h1 style={{textAlign:"left",margin:"20px"}} >Latest Mobiles:</h1>
          <Row md={4} xs={2} sm={2} lg={6}>
            {
              (latest)?
              latest.map((e)=><Latestcard name={e.phone_name} img={e.image} key={Math.random()}/>)
              :null
            }
          </Row>
        </Container>
    </div>
  )
}
