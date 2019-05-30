import React, { Component } from 'react';
import Comment from '../comment/Comment'

class Show extends Component{
  state = {
    user: "",
    comment: '',
    listOfComment: []
  }



  componentDidMount(){
    this.getComments().then(res => {
      {
        this.props.isLogged
        ? (  this.setState({
            listOfComment: res,
            user: this.props.currentUser.id
          }))
        :(
          this.setState({
            listOfComment: res
          })
        )
      }

    })
  }

  inputHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  submitHandler = async(e) => {
    try {
      e.preventDefault()
      const createComment = await fetch('http://localhost:8000/comment/comment', {
        method: "POST",
        body: JSON.stringify(this.state),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }catch(err){
      return err
    }
  }

  getComments = async() => {
    try{
      const postData = await fetch('http://localhost:8000/comment/comment', {
        credentials: 'include'
      })
      const resParsed = await postData.json()
      return resParsed
    }catch(err){
      return err
    }
  }


  render(){
    const { posts } = this.props
    const { comment } = this.state
    const rest = posts[this.props.match.params.id]
    return(
      <div>
        {rest
          ?(
            <div>
              <h1>{rest.name}</h1>
              <h3>{rest.address}</h3>
              <p>{rest.review}</p>
              <h1>comment id: {rest.id}</h1>
              <Comment currentUser={this.props.currentUser} commentId={rest.id} listOfComment={this.state.listOfComment}/>
              <form onSubmit={this.submitHandler}>
                <input type="text" name="comment" placeholder="comment/review" value={comment} onChange={this.inputHandler}></input>
                <button type='Submit'>Submit</button>
              </form>
            </div>
          )
          :<h1>Loading...</h1>
        }
      </div>
    )
  }
}

export default Show;
