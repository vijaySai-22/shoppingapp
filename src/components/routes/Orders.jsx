import React, { useEffect, useState } from 'react'
import Orderscard from '../cards/Orderscard'
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { auth, db } from '../../firebase';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap'

export default function Orders() {
  const [id,setId] = useState()
  const [items,setItems] = useState([])
  const [cancelClicked,setCancelClicked]= useState(0)
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
      await getDocs(collection(db, `${id}orders`))
      .then((snapshot)=>{
          let data = []
          snapshot.docs.forEach((doc)=>{
              data.push({...doc.data()})
          })
          setItems(data)
      })
    }
    gettingData()
    console.log(items)
  },[id,cancelClicked])
  function back(){
    setCancelClicked(cancelClicked+1)
  }
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
          (items.length!==0)?
          items.map((e)=>{
            return <Orderscard mobileName={e.itemname} slug={e.itemslugname} back={back} />
          })
          :<h3>No items in Orders</h3>
        :<>
          <h1>Logout Successful</h1>
          <Button as={Link} to='/'>Go to Home</Button>
        </>
      }
    </div>
  )
}
