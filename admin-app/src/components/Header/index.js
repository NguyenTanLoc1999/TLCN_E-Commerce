import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'

/**
* @author
* @function Header
**/

const Header = (props) => {
    return (
        <Navbar collapseOnSelect fixed="top" bg="dark" expand="lg" variant="dark">
            <Container>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        {/* {<NavDropdown title="Dropdown" id="basic-nav-dropdown">
              
                        </NavDropdown>} */}
                    </Nav>
                    <Nav>
                        {/* <Nav.Link href="#">Signin</Nav.Link> */}
                        <li className="nav-item">
                            <NavLink to="signin" className="nav-link">Signin</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="signup" className="nav-link">Signup</NavLink>
                        </li>  
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )

}

export default Header