import React, { Component } from 'react'
import styled from 'styled-components'
import Carousel from 'react-bootstrap/Carousel'


class Show extends Component{
  state = {
    comment: ''
  }


  render(){
    const { posts } = this.props
    console.log(posts)
    const rest = posts[this.props.match.params.id]
    return(
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
    )
  }
}

export default Show;
