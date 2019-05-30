import React, { Component } from 'react'
import styled from 'styled-components'
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap'



class Show extends Component{
  state = {
    userId: "",
    postId: "",
    username: "",
    comments: '',
    listOfComment: []
  }



  componentDidMount(){
    this.getComments().then(res => {
      {
        this.props.isLogged
        ? (  this.setState({
            listOfComment: res,
            userId: this.props.currentUser.id,
            username: this.props.currentUser.username,
            postId: this.props.posts[this.props.match.params.id].id
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
    const { posts, isLogged } = this.props
    const { comment } = this.state
    const rest = posts[this.props.match.params.id]

    return(
      <Carousel>
        <Carousel.Item>
          <img className='d-block w-100' src='' alt='First slide' />
          <Carousel.Caption>
            <h3>First slide</h3>
            <p>add pic here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src='' alt='Second slide' />
          <Carousel.Caption>
            <h3>Second slide</h3>
            <p>add pic here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src='' alt='Third slide' />
          <Carousel.Caption>
            <h3>Third slide</h3>
            <p>add pic here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src='' alt='Fourth slide' />
          <Carousel.Caption>
            <h3>Fourth slide</h3>
            <p>add pic here</p>
          </Carousel.Caption>
        </Carousel.Item>
        <div>
        {rest
          ?(
            <div>
              <h1>{rest.name}</h1>
              <h3>{rest.address}</h3>
              <p>{rest.review}</p>
              <h1>comment id: {rest.id}</h1>
              <Comment  commentId={rest.id} listOfComment={this.state.listOfComment}/>
              {
                isLogged
                  ? (
                    <form onSubmit={this.submitHandler}>
                      <input type="text" name="comments" placeholder="comment/review" value={comment} onChange={this.inputHandler}></input>
                      <button type='Submit'>Submit</button>
                    </form>
                  )
                  : <h2>Login to add comment</h2>
              }

            </div>
          )
          :<h1>Loading...</h1>
        }
      </div>
      </Carousel>

    )
  }
}

export default Show;
