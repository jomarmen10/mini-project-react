import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username:'',
    password: ''
  }

  inputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.login(this.state)
  }


  render(){
    const { username, password } = this.state
    const { isLogged } = this.props
    return(
      <div>
        {
          isLogged
          ? <Redirect to={`/`} />
          : <form onSubmit={this.submitHandler}>
          <input type='text' name='username' placeholder='username' value={username} onChange={this.inputHandler}></input>
          <input type='password' name='password' placeholder='password' value={password} onChange={this.inputHandler}></input>
          <button type='Submit'>Login</button>
        </form>
        }

      </div>
    )
  }
}

export default Login;
