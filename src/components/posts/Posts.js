import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

const CardStyle = styled.div`
  img {
    padding-bottom: 10px;
  }

  button {
    background-color: black;
    border-radius: 10px;
    color: white;
  }

  .card-subtitle {
    font-size: 14px;
  }

  // .store {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: space-evenly;
  // }
`


class Post extends Component {
  render(){
    const { allPost } = this.props
    return(
      <CardStyle>
        <Container>
          <Col>
            <Card style={{ width: '15rem', flex: 1 }}>
                  {allPost.map((p,i)=>{
                    return <div className='store'>
                      <Card.Img variant='top' src={`${p.picture}`} />
                      <Link to={`/show/${i}`}>
                        <Card.Title><Col>{p.name}</Col></Card.Title>
                      </Link>
                      <Card.Subtitle className='mb-2 text-muted'><Col>{p.cuisine}</Col></Card.Subtitle>
                      <Col><p>{p.review}</p></Col>
                      <Link to={`/show/${i}`}>
                        <button>View More</button>
                      </Link>
                    </div>
                  })}
            </Card>
          </Col>
        </Container>
      </CardStyle>
    )
  }
}

export default Post
