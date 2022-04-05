import { createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { addDoc, collection } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Signup(props) {
    const[data,setData]=useState({
        email:'',
        password:'',
    })
    const {email,password,}=data
    const change=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    async function signup(){
        try{
            await createUserWithEmailAndPassword(auth,email,password)
            .then(user=>console.log(user))
            try {
                const docRef = await addDoc(collection(db, "users"), {
                  email: email,
                  password: password,
                });
                console.log("Document written with ID: ", docRef.id);
            }catch (e) {
                console.error("Error adding document: ", e);
            }
        }catch(e){
            alert(e.message)
        }
        setData({ email:'',password:''})
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
              (!userIn)?
                <Container>
                    <Card style={{width:"20rem",margin:"100px auto"}}>
                        <Card.Body>
                            <Card.Title>Signup</Card.Title>
                            <h5>Email</h5>
                            <input type='email' onChange={change} value={email} name='email' placeholder='Enter Your Mail' required/>
                            <h5>Password</h5>
                            <input type='password' onChange={change} value={password} name='password' placeholder='Set New Password' required/>
                            <br/>
                            <br/>
                            <Button variant="primary" onClick={signup}>Sign Up</Button>
                        </Card.Body>
                    </Card>
                </Container>:
                <>
                    <h1>Signup Successful</h1>
                    <Button as={Link} to='/'>Go to Home</Button>
                </>
            }
        </div>
  )
}