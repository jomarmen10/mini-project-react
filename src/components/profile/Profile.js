import React, { Component } from 'react';

class Profile extends Component {
  state = {
    listOfComments: []
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

  render(){
    const { currentUser, isLogged } = this.props
    const { listOfComments } = this.state
    console.log(listOfComments)
    return(
      <div>
        {
          isLogged
            ? (
              <div>
                <h2>{currentUser.username}</h2>
                {listOfComments.map((c,i)=>{
                  {if(currentUser.id === Number(c.userId)){
                    return <h2 key={i}>{c.comments}</h2>
                  }}
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
