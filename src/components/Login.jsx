import React, { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { Card, Container, Button } from 'react-bootstrap';
import Home from './Home';
import { Link } from 'react-router-dom';
function Login(props) {
    const emailref = useRef()
    const passwordref = useRef()
    async function signin(){
        try{
            await signInWithEmailAndPassword(auth,emailref.current.value,passwordref.current.value)
            .then(user=>console.log(user))
        }catch{
            alert("Invalid Details")
        }
        emailref.current.value=''
        passwordref.current.value=''
    }
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
                            <Card.Title>Sign In</Card.Title>
                            <h5>Email</h5>
                            <input placeholder="Enter MailId" type='email' ref={emailref} required/>
                            <h5>Password</h5>
                            <input placeholder="Enter Password" type='password' ref={passwordref} required/>
                            <br/>
                            <br/>
                            <Button variant="primary" onClick={signin}>Sign In</Button>
                        </Card.Body>
                    </Card>
                </Container>:
                <>
                    <h1>Login Successful</h1>
                    <Button as={Link} to='/'>Go to Home</Button>
                </>
          }
          
      </div>
  )
}
export default Login;