import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Post extends Component {
  render(){
    const { allPost } = this.props
    return(
      <div>
        {allPost.map((p,i)=>{
          return  <div>
          <Link to={`/show/${i}`}>
            <h1>{p.name}</h1>
          </Link>
            <h2>{p.review}</h2>
          </div>
        })}
      </div>
    )
  }
}

export default Post
