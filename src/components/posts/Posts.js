import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Post extends Component {
  render(){
    const { allPost } = this.props
    return(
      <Container>
        {/* <Row> */}
          <div>
            {allPost.map((p,i)=>{
              return <div>
                <Col><h1>{p.picture}</h1></Col>
                <Link to={`/show/${i}`}>
                  <Col><h1>{p.name}</h1></Col>
                </Link>
                <Col><h2>{p.review}</h2></Col>
              </div>
            })}
          </div>
        {/* </Row> */}
      </Container>

    )
  }
}

export default Post
