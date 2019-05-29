import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Header extends Component {
  render(){
    return(
      <div>
        <NavLink to={'/'}>Home</NavLink> <br/>
        <NavLink to={'/register'}>Register</NavLink>
      </div>
    )
  }
}

export default Header
