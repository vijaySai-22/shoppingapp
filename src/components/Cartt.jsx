import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import Carttcard from './Carttcard'
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { auth, db } from '../firebase';
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function Cartt() {
  const [id,setId] = useState()
  const [ids,setIds] = useState([])
  useEffect(()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        setId(user.email)
    }
    console.log(id)
  },[])
  useEffect(()=>{
    async function gettingData(){
      await getDocs(collection(db, `${id}cart`))
      .then((snapshot)=>{
          let data = []
          snapshot.docs.forEach((doc)=>{
              data.push({...doc.data(),id:doc.id})
          })
          setIds(data)
      })
    }
    gettingData()
    console.log(ids)
  },[id])

  //checking user logged in or not
  const [userIn,setUserIn] = useState(false)
  useEffect(()=>{
      function fetched(){
          const check=onAuthStateChanged(auth,(user)=>{
              if (user!=null){
                  setUserIn(true)
              }
              else{
                  setUserIn(false)
              }
          })
          return check
      }
      fetched()
  },[])
  return (
    <div>
      {
        (userIn)?
          (ids.length!==0)?
          ids.map((e)=>{
            return <Carttcard slug={e.id} qty={e.qty} />
          })
          :<h3>No items in Cart</h3>
        :<>
          <h1>Logout Successful</h1>
          <Button as={Link} to='/'>Go to Home</Button>
        </>
      }
      
    </div>
  )
}
