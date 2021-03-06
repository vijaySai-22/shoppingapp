import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { CartFill } from 'react-bootstrap-icons';
import { Route, Routes, Link } from "react-router-dom";
import Home from './components/routes/Home';
import Brands from './components/routes/Brands';
import Orders from './components/routes/Orders';
import Cartt from './components/routes/Cartt';
import Mobile from './components/other/Mobile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from './firebase';
import Buy from './components/other/Buy';

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
              {
                (userIn)?
                <>
                  <Nav.Link as={Link} to="/orders">Your Orders</Nav.Link>
                  <Nav.Link as={Link} to="/cart" style={{marginTop:"-2px"}}><CartFill/></Nav.Link>
                </>:null
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
        <Route path='/orders' element={<Orders />} />
        <Route path='/cart' element={<Cartt />} />
        <Route path='/mobile/:name' element={<Mobile/>} />
        <Route path='/buy/:name' element={<Buy/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
