import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import Register from '../Pages/Register';
// import Login from '../Pages/Login';
const Header = () => {
 const Navigate =useNavigate();
 const token= localStorage.getItem("token");
 const username= localStorage.getItem("username");

 const handleLogout =()=>{
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  alert("Logout Successfully");
  Navigate(`/login`);
 };
  return (
    <>
   <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/">Kathan's Blog App</Navbar.Brand>
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/add-blog">AddBlog</Nav.Link>
         <Nav.Link href="/add-category">Add Category</Nav.Link>
         </Nav>
        </Navbar.Collapse>
      </Container>
      {token && token!=null ?(
      <>
        <Link >
         <Button  className="me-2" >Welcome:{username}</Button>
         </Link>
         <Link>
         <Button type="submit"  className="me-2" onClick={handleLogout}>Logout</Button>
       </Link>
       </>) :(
       <>
       <Link to ="/login">
         <Button type="submit"  className="me-2" >Login</Button>
       </Link>
        <Link to= "/register">
       <Button type="submit" className="me-2">Register</Button>
       </Link>
       </>
      )}
    </Navbar>
    
    </>
  )
}

export default Header;