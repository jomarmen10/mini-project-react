import React, { Component } from 'react';

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
    return(
      <div>
        <form onSubmit={this.submitHandler}>
          <input type='text' name='username' placeholder='username' value={username} onChange={this.inputHandler}></input>
          <input type='password' name='password' placeholder='password' value={password} onChange={this.inputHandler}></input>
          <button type='Submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;
