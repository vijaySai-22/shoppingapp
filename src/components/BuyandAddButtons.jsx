import React, { useEffect, useState } from 'react'
import { getAuth } from '@firebase/auth'
import { addDoc, collection, doc, setDoc,getDoc, getDocFromCache } from '@firebase/firestore'
import { db } from '../firebase'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function BuyandAddButtons(props) {
    const s = String(props.status)
    var status = false
    if(s.includes("Available"))
        status=true
    else if(s.includes("Coming soon"))
        status=false
    const [id,setId] = useState()
    useEffect(()=>{
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setId(user.email)
        }
        console.log(id)
    },[])
    // to check mobile in cart or not
    const [exist,setExist] = useState(false)
    async function check(){
        const docRef = doc(db, `${id}cart`, `${props.mobileName}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) setExist(true)
        
        else setExist(false)
    }
    check()
    //to add cart
    const cart=async ()=>{
        console.log(props.mobileName)
        try{
            await setDoc(doc(db, `${id}cart`,`${props.mobileName}`), {
                qty:1
            });
            setExist(true)
        }catch(e){
            console.log(e)
        }
    }
  return (
    <div>
        {
            (status)?
            <div>
                <Button style={{backgroundColor:"#13f060",color:"black",margin:"10px"}}>Buy Now</Button>
                {
                    (exist)?
                    <Button as={Link} to='/cart' >Go to Cart</Button>:
                    <Button onClick={cart}>Add to Cart</Button>
                    
                }
            </div>:<h3>Coming Soon</h3>
        }
    </div>
  )
}
