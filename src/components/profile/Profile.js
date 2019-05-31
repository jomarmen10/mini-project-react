import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import styled from 'styled-components'


class Profile extends Component {
  state = {
    listOfComments: [],
    post: [],
    show: false,
    commentId: null,
    comments: "",
    username: "",
    userId: null,
    postId: null
  }

  componentDidMount(){
    this.getComments().then(res => {
      this.setState({
        listOfComments: res
      })
    })
  }

  addPostId = () => {
    console.log(this.commentsAndPosts())
    this.commentsAndPosts().map((p,i)=>{
      if(this.state.username === p.comment.username){
        this.setState({
          postId: p.post.id
        })
      }
    })
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = (e) => {
    this.setState({
      show: true,
      [e.currentTarget.name]: e.currentTarget.value
     })
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

  handleEdit = async(e) =>{
    try{
      e.preventDefault()
      const createComment = await fetch(`http://localhost:8000/comment/comment/${this.state.commentId}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      this.handleClose()
    }catch(err){
      return err
    }
  }

  handleInput = async(e) => {
    try{
      await this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
        username: this.props.currentUser.username,
        userId: this.props.currentUser.id
      })
      await this.addPostId()
    }catch(err){

    }

  }

  handleDelete = async() => {
    try{
      const deleteComment = await fetch(`http://localhost:8000/comment/comment/${this.state.commentId}`, {
        method: "DELETE",
        credentials: 'include'
      })
      this.handleClose()
    }catch(err){
      return err
    }
  }

  commentsAndPosts = () =>{
    const { listOfComments } = this.state
    const { allPost, currentUser } = this.props
    let array = []
    for (let i = 0; i < listOfComments.length; i++){
      if(currentUser.id === Number(listOfComments[i].userId)){
        for(let j = 0; j < allPost.length; j++){
          if(Number(listOfComments[i].postId) === allPost[j].id ){
            let obj = {
              comment: listOfComments[i],
              post: allPost[j]
            }
            array.push(obj)
          }
        }
      }
    }
    return array;
  }

  render(){
    const { currentUser, isLogged, allPost } = this.props
    const { listOfComments, comments } = this.state
    return(
      <div>
        {
          isLogged
            ? (
              <div>
                <h2>Hello, {currentUser.username}</h2>
                {this.commentsAndPosts().map((c, i)=>{
                  return(
                    <div key={i}>
                      <h1>{c.post.name}</h1>
                      <p>{c.comment.comments} </p>
                      <h2>post: {c.post.id}</h2>
                      <Button variant="primary" onClick={this.handleShow} name="commentId" value={c.comment.id}>
                        Edit
                      </Button>
                      <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>{c.post.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form onSubmit={this.handleEdit}>
                            <input placeholder='Enter New Comment' name='comments' value={comments} onChange={this.handleInput}></input>
                          </form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={this.handleEdit}>
                            Edit
                          </Button>
                          <Button  variant='outline-danger' onClick={this.handleDelete}>
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  )
                })}
              </div>
            )
            : (
              <div>
                <h2>Loading</h2>
              </div>
            )
        }
      </div>
    )
  }
}

export default Profile
