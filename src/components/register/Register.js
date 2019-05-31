import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

const FormStyle = styled.div`
  form {
    padding-left: 10%;
    padding-top: 3%;
  }

  .form-control {
    width: 40%;
  }



`

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
      <FormStyle>
      <Form className='form-container'>
        <h1>Register</h1>
        <p>Register with us today, so you can add suggestions about your favorite Happy Hour deals!</p>
        <form onSubmit={this.submitHandler}>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Username</Form.Label>
              <Form.Control type='text' name='username' placeholder='username' value={username} onChange={this.inputHandler} />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
            <Form.Control type='password' name='password' placeholder='password' value={password} onChange={this.inputHandler} />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
          <Form.Label>Verify your password</Form.Label>
            <Form.Control type='password' name='verify_password' placeholder='verify password' value={verify_password} onChange={this.inputHandler} />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
            <Form.Control type='text' name='email' placeholder='email' value={email} onChange={this.inputHandler} />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>
          <Button variant='outline-primary' type='Submit'>Register</Button>
        </form>
      </Form>
      </FormStyle>
    )
  }
}

export default Register;
