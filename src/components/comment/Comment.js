import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Comment extends Component {

  render(){
    const { listOfComment, commentId } = this.props
    return(
      <div>
        {
          this.props.commentId
            ? (
              <div>
                {listOfComment.map((m,i)=>{
                  {if(Number(m.postId) === commentId ){
                    return <p key={i}>{m.username}:{ m.comments}</p>
                  }}
                })}
              </div>
            )
            : <h1>Loading..</h1>
        }
      </div>
    )
  }
}

export default Comment
