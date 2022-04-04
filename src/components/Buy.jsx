import React from 'react'
import {Button} from 'react-bootstrap'
export default function Buy(props) {
    const s = String(props.status)
    var status = false
    if(s.includes("Available"))
        status=true
    else if(s.includes("Coming soon"))
        status=false
  return (
    <div>
        {
            (status)?
            <div>
                <Button style={{backgroundColor:"#13f060",color:"black",margin:"10px"}}>Buy Now</Button>
                <Button>Add to Cart</Button>
            </div>:<h3>Coming Soon</h3>
        }
    </div>
  )
}
