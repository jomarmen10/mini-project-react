import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Register from './components/register/Register'
import Post from './components/posts/Posts'
import Header from './components/header/Header'


class App extends Component {
  state = {
    currentUser: null,
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
      const resParsed = await registerUser.json()
      this.setState({
        currentUser: resParsed
      })
    }catch(err){
      return err
    }
  }



  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path={'/'} render={()=>(<Post allPost={this.state.post}/>)} />
          <Route exact path={'/register'} render={()=>( <Register register={this.register}/> )} />
        </Switch>
      </div>
    );
  }
}

export default App;
