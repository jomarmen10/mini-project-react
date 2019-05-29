import React, { Component} from 'react';
import './App.css';
import Register from './components/register/Register'
import Post from './components/posts/Posts'


class App extends Component {
  state = {
    post: []
  }

  componentDidMount(){
    this.allPost().then(res => {
      this.setState({
        post: res
      })
    })
  }

  allPost = async() => {
    try{
      const postData = await fetch('http://localhost:8000/api/v1/posts', {
        credentials: 'include'
      })
      const resParsed = await postData.json()
      console.log(resParsed)
      return resParsed
    }catch(err){
      return err
    }
  }

  // handleRegister = async (data) => {
  //   try {
  //     const registerCall = await fetch('http://localhost:8000/users/registration', {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     const response = await registerCall.json()
  //     console.log(response, 'from the flask server on localhost:8000')
  //
  //   } catch(err){
  //     console.log(err)
  //   }
  // }

  register = async(data) => {
    try{
      const registerUser = await fetch('http://localhost:8000/users/registration', {
        method: "POST",
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response = await registerUser.json()
    }catch(err){
      return err
    }
  }



  render() {
    return (
      <div>
        <Register register={this.register}/>
        <Post allPost={this.state.post}/>
      </div>
    );
  }
}

export default App;
