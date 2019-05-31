import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'


class Profile extends Component {
  state = {
    listOfComments: [],
    post: [],
    show: false,
    commentId: null
  }

  componentDidMount(){
    this.getComments().then(res => {
      this.setState({
        listOfComments: res
      })
    })
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = (e) => {
    this.setState({
      show: true,
      [e.currentTarget.name]: e.currentTarget.value
     });
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
    const { listOfComments } = this.state
    console.log(this.props.allPost)
    return(
      <div>
        {
          isLogged
            ? (
              <div>
                <h2>{currentUser.username}</h2>
                {this.commentsAndPosts().map((c, i)=>{
                  return(
                    <div key={i}>
                      <h1>{c.post.name}</h1>
                      <p>{c.comment.comments} </p>
                      <h2>commentId: {c.comment.id}</h2>
                      <Button variant="primary" onClick={this.handleShow} name="commentId" value={c.comment.id}>
                        Edit
                      </Button>
                      <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>{c.post.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <input placeholder="testsedsfs" value={c.comment.comments}></input>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button  onClick={this.handleClose}>
                            Close
                          </Button>
                          <Button  onClick={this.handleDelete}>
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
