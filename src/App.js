import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes, Link } from "react-router-dom";
import Home from './components/Home';
import Brands from './components/Brands';
import Offers from './components/Offers';
import Cartt from './components/Cartt';
import Mobile from './components/Mobile';
import { CartFill } from 'react-bootstrap-icons';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from './firebase';

function App() {
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
  const signout=()=>{
    signOut(auth)
  }
  return (
    <div className="App">
      <Navbar sticky="top" expand="lg" style={{fontWeight:"bolder",fontSize:"1.3em",backgroundColor:"#13f060"}}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{color:"#13f060",backgroundColor:"black",padding:"2px 10px"}}>Phone Zone</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/brands">Brands</Nav.Link>
              <Nav.Link as={Link} to="/offers">Offers</Nav.Link>
              {
                (userIn)?
              <Nav.Link as={Link} to="/cart" style={{marginTop:"-2px"}}><CartFill/></Nav.Link>:null
              }
            </Nav>
            {
              (userIn)?
              <Nav.Link onClick={signout} style={{color:"black",border:"1px solid black",margin:"2px"}}>Logout</Nav.Link>:
              <>
              <Nav.Link as={Link} to="/login" style={{color:"black",border:"1px solid black",margin:"2px"}}>Login</Nav.Link>
              <Nav.Link as={Link} to="/signup" style={{color:"black",border:"1px solid black",margin:"2px"}}>Signup</Nav.Link>
              </>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/cart' element={<Cartt />} />
        <Route path='/mobile/:name' element={<Mobile/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
