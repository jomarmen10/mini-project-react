import React, { Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Register from './components/register/Register'
import Post from './components/posts/Posts'
import Header from './components/header/Header'
import Login from './components/login/Login'
import Show from './components/show/Show'
import Profile from './components/profile/Profile'
import EditDelete from './components/editDelete/EditDelete'

///addd the picture function

class App extends Component {
  state = {
    currentUser: null,
    isLogged: false,
    post: [],
    pic: []
  }

  componentDidMount(){
    const user = localStorage.getItem("current")
    const parsedUser = JSON.parse(user)
      this.allPost().then(res => {
        this.setState({
          post: res,
          currentUser: parsedUser
        })
      })
  }

  doSetCurrentUser = user =>
    this.setState({
      currentUser: user
    })

  allPost = async() => {
    try{
      const postData = await fetch('http://localhost:8000/api/v1/posts', {
        credentials: 'include'
      })
      const resParsed = await postData.json()
      return resParsed
    }catch(err){
      return err
    }
  }

  userLogin = async(data)=> {
    try{
      const loginData = await fetch('http://localhost:8000/users/login', {
        method: "POST",
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resParsed = await loginData.json()
      if(resParsed.success){
        localStorage.setItem("current", JSON.stringify(resParsed.user))
        this.setState({
          isLogged: true,
          currentUser: resParsed.user
        })
      }

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
        isLogged: true,
        currentUser: resParsed
      })
    }catch(err){
      return err
    }
  }



  render() {
    return (
      <div>
        <Header isLogged={this.state.isLogged}/>
        <Switch>
          <Route exact path={'/edit'} render={()=>(<EditDelete />)} />
          <Route exact path={'/profile'} render={(props)=> <Profile {...props} allPost={this.state.post} isLogged={this.state.isLogged} currentUser={this.state.currentUser}/>} />
          <Route exact path={'/show/:id'} render={(props)=>{ return <Show {...props}  posts={this.state.post} currentUser={this.state.currentUser} isLogged={this.state.isLogged}/>}}/>
          <Route exact path={'/'} render={()=>(<Post allPost={this.state.post} />)} />
          <Route exact path={'/register'} render={()=>( <Register isLogged={this.state.isLogged} register={this.register}/> )} />
          <Route exact path={'/login'} render={()=>( <Login login={this.userLogin} isLogged={this.state.isLogged}/>)} />
        </Switch>
      </div>
    );
  }
}

export default App;
