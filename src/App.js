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



  render() {
    return (
      <div>
        <Register />
        <Post allPost={this.state.post}/>
      </div>
    );
  }
}

export default App;
