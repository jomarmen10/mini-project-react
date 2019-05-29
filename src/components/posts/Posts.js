import React, { Component } from 'react'

class Post extends Component {
  render(){
    const { allPost } = this.props
    return(
      <div>
        {allPost.map((p,i)=>{
          return  <div>
            <h1>{p.title}</h1>
            <h2>{p.review}</h2>
          </div>
        })}
      </div>
    )
  }
}

export default Post
