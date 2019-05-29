import React, { Component } from 'react';

class Register extends Component {
  state = {
    username: '',
    password: '',
    verify_password: '',
    email: ''
  }

  inputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  submitHandler= async(e) => {
  e.preventDefault();
  this.props.register(this.state)
}


  render(){
    const { username, password, verify_password, email } = this.state
    return(
      <div>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='username' placeholder='username' value={username} onChange={this.inputHandler}></input>
          <input type='password' name='password' placeholder='password' value={password} onChange={this.inputHandler}></input>
          <input type='password' name='verify_password' placeholder='verify password' value={verify_password} onChange={this.inputHandler}></input>
          <input type='text' name='email' placeholder='email' value={email} onChange={this.inputHandler}></input>
          <button type='Submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default Register;
