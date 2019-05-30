import React, { Component } from 'react'
import styled from 'styled-components'
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap'


class Show extends Component{
  state = {
    comment: ''
  }


  render(){
    const { posts } = this.props
    console.log(posts)
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
