import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Comment from '../comment/Comment'
import styled from 'styled-components'
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap'


const ShowStyle = styled.div`
  .right-column {
    padding-top: 16%;
    padding-left: 7%;
  }

  .cost {
    color: #FB6C0F;
  }

  img {
    max-width: 50rem;
    height: 48rem;
    object-fit: cover;
  }

  .join-link {
    padding-top: 35%;
  }

  input {
    outline: none;
  }

  form {
    padding-top: 20%;
  }
`


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
      <ShowStyle>
        <Container>
          <Row>
            <Col>
              <Carousel>
                <Carousel.Item>
                  <img className='d-block w-100' src='https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' alt='First slide' />
                  {/* d-block and w-100 on carousel images are there to prevent broswer default image alignment */}
                  <Carousel.Caption>
                    {/* <h3>First slide</h3> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className='d-block w-100' src='https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=987&q=80' alt='Second slide' />
                  <Carousel.Caption>
                    {/* <h3>Second slide</h3> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className='d-block w-100' src='https://s3-media1.fl.yelpcdn.com/bphoto/Xy6oJ25E2QUzw_zsBD-dhA/o.jpg' alt='Third slide' />
                  <Carousel.Caption>
                    {/* <h3>Third slide</h3> */}
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className='d-block w-100' src='https://s3-media2.fl.yelpcdn.com/bphoto/xYMrV9YH524qNtqMzLTJYQ/o.jpg' alt='Fourth slide' />
                  <Carousel.Caption>
                    {/* <h3>Fourth slide</h3> */}
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col className='right-column'>
              <Row className='top-row'>
                {rest
                  ? (
                    <div>
                      <h1>{rest.name}</h1>
                      <h4 className='cost'>{rest.cost} · {rest.cuisine}</h4>
                      <h5>{rest.address}</h5><br/>
                      <p>{rest.review}</p>
                      {/* <p>comment id: {rest.id}</p> */}
                      <Comment commentId={rest.id} listOfComment={this.state.listOfComment}/>
                      {
                        isLogged
                          ? (
                            <form onSubmit={this.submitHandler}>
                              <input type="text" name="comments" placeholder="Add a suggestion" value={comment} onChange={this.inputHandler}></input>
                              <button type='Submit'>Submit</button>
                            </form>
                          )
                          : <h4 className='join-link'><Link to={'/login'}>Login</Link> or <Link to={'/register'}>Register</Link> to leave a suggestion</h4>
                      }

                    </div>
                  )
                  :<h1>Be the first to post a comment!</h1>
                }
              </Row>
              <Row className='bottom-row'>
                
              </Row>
            </Col>
          </Row>
        </Container>
      </ShowStyle>
    )
  }
}

export default Show;
