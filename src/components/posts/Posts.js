import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDeck, Col, Image } from 'react-bootstrap'
import styled from 'styled-components'

const CardStyle = styled.div`
  .cardDeck {
    margin: 50%;
  }

  img {
    padding-bottom: 10px;
    max-width: 20rem;
    height: 10rem;
    object-fit: cover;
  }

  button {
    background-color: black;
    border-radius: 10px;
    color: white;
    position: absolute;
    bottom: 10px;
    align-content: center;
    outline: none;

    &:hover {
      background-color: #990EFF;
    }
  }

  .card-subtitle {
    font-size: 14px;
  }

  .card-body {
    // height: 15rem;
  }
`


class Post extends Component {
  render(){
    const { allPost } = this.props
    return(
      <CardStyle>
        <CardDeck>
          {(allPost || []).map((p,i)=>{
            return <Card style={{ width: 12 + 'rem' }}>
                      {/* <Col xs={ 6 } md={ 4 }> */}
                        <Card.Img variant='top' src={`${p.picture}`} thumbnail />
                      {/* </Col> */}
                      <Card.Body>
                        <Link to={`/show/${i}`}>
                          <Card.Title><Col>{p.name}</Col></Card.Title>
                        </Link>
                        <Card.Subtitle className='mb-2 text-muted'><Col>{p.cuisine}</Col></Card.Subtitle>
                        <Card.Text><Col><p>{p.review}</p></Col></Card.Text>
                        <Link to={`/show/${i}`}>
                          <button>View More</button>
                        </Link>
                      </Card.Body>
            </Card>
          })}
        </CardDeck>
      </CardStyle>
    )
  }
}

export default Post
