import React, { Component } from 'react';

class Profile extends Component {
  state = {
    listOfComments: [],
    post: []
  }

  componentDidMount(){
    this.getComments().then(res => {
      this.setState({
        listOfComments: res
      })
    })
  }

  getComments = async() => {
    try{
      const postData = await fetch('http://localhost:8000/comment/comment', {
        credentials: 'include'
      })
      const resParsed = await postData.json()
      return resParsed
    }catch(err){
      return err
    }
  }

  commentsAndPosts = () =>{
    const { listOfComments } = this.state
    const { allPost, currentUser } = this.props
    let array = []
    for (let i = 0; i < listOfComments.length; i++){
      if(currentUser.id === Number(listOfComments[i].userId)){
        for(let j = 0; j < allPost.length; j++){
          if(Number(listOfComments[i].postId) === allPost[j].id ){
            let obj = {
              comment: listOfComments[i],
              post: allPost[j]
            }
            array.push(obj)
          }
        }
      }
    }
    return array;
  }

  render(){
    const { currentUser, isLogged, allPost } = this.props
    const { listOfComments } = this.state
    console.log(this.props.allPost)
    return(
      <div>
        {
          isLogged
            ? (
              <div>
                <h2>{currentUser.username}</h2>
                {this.commentsAndPosts().map((c, i)=>{
                  return(
                    <div key={i}>
                      <h1>{c.post.name}</h1>
                      <p>{c.comment.comments}</p>
                      <button>edit</button>
                    </div>
                  )
                })}
              </div>
            )
            : (
              <div>
                <h2>Loading</h2>
              </div>
            )
        }
      </div>
    )
  }
}

export default Profile
