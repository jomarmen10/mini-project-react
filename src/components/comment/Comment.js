import React, { Component } from 'react';

class Comment extends Component {

  render(){
    const { listOfComment, commentId, currentUser } = this.props
    console.log(currentUser)
    return(
      <div>
        {
          this.props.commentId
            ? (
              <div>
                {listOfComment.map((m,i)=>{
                  {if(Number(m.postId) === commentId ){
                    return <h1 key={i}>{m.comments}</h1>
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
