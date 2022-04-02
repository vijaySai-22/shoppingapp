import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes, Link } from "react-router-dom";
import Home from './components/Home';
import Categories from './components/Categories';
import Offers from './components/Offers';
import Cartt from './components/Cartt';
import { CartFill } from 'react-bootstrap-icons';

function App() {
  return (
    <div className="App">
      <Navbar sticky="top" expand="lg" style={{fontWeight:"bolder",fontSize:"1.3em",backgroundColor:"#13f060"}}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{color:"#13f060",backgroundColor:"black",padding:"2px 10px"}}>Shopping App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
              <Nav.Link as={Link} to="/offers">Offers</Nav.Link>
              <Nav.Link as={Link} to="/cart" style={{marginTop:"-2px"}}><CartFill/></Nav.Link>
            </Nav>
            <Nav.Link style={{color:"black"}}>Login</Nav.Link>
            <Nav.Link style={{color:"black"}}>Signup</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/cart' element={<Cartt />} />
      </Routes>
    </div>
  );
}

export default App;
