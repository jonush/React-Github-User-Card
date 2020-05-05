import React from 'react';
import './App.css';
import axios from 'axios';
import Follower from './Follower';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      followers: [],
    }
  }

  componentDidMount() {
    axios
      .get('https://api.github.com/users/jonush')
      .then(res => {
        this.setState({
          user: res.data
        });
        axios.get('https://api.github.com/users/jonush/followers')
          .then(res => {
            this.setState({
              followers: res.data
            })
          })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='container'>
        <h1>GitHub User Cards</h1>
        
        <div className='user'>
          <img src={this.state.user.avatar_url}></img>
          <div className='info'>
            <h2>{this.state.user.name}</h2>
            <h3>Location: {this.state.user.location}</h3>
            <h3>Followers: {this.state.user.followers}</h3>
          </div>
        </div>

        {this.state.followers.map(follower => {
          return (
            <div>
              <Follower follower={follower} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default App;
