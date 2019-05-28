import React, { Component } from 'react'

class Post extends Component {
  render(){
    const { allPost } = this.props
    return(
      <div>
        {allPost.map((p,i)=>{
          return <h1>{p.title}</h1>
        })}
      </div>
    )
  }
}

export default Post
