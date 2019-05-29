import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'

const NavStyle = styled.div`
  .navbar {
    background-color: #222;
  }

  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    margin: 10px;

    &:hover {
      color: white;
    }
  }

  .icon {
    color: white;
  }
`


class Header extends Component {
  render(){
    return(
      <NavStyle>
        <Navbar expand='lg'>
        <Navbar.Brand href='/'>Happy Hour</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>

                <Nav.Item>
                  <NavLink to={'/register'}>Register</NavLink>
                  {/* <Nav.Link href='/register'>Register</Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                <NavLink to={'/login'}>Login</NavLink>
                  {/* <Nav.Link href='/login'>Login</Nav.Link> */}
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
      </NavStyle>
    )
  }
}

export default Header
