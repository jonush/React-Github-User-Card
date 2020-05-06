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
      search: '',
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


  // search functionality
  searchFollower = follower => {
    axios.get(`https://api.github.com/users/${follower}`)
      .then(res => {
        this.setState({
          ...this.state,
          user: res.data
        })
      })
      .catch(err => console.log(err))
  }

  handleInput = e => {
    this.setState({
      ...this.state,
      search: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.searchFollower(this.state.search);
    this.setState({
      ...this.state,
      search: '',
    })
  }

  render() {
    return (
      <div className='container'>
        <h1>Profile</h1>
        
        <div className='user'>
          <div className='user-content'>
            <div className='my-profile'>
              <img className='profile-pic' src={this.state.user.avatar_url} alt='user-profile'></img>
              <div className='info'>
                <h2>{this.state.user.name}</h2>
                <h3>Location: {this.state.user.location}</h3>
                <h3>Repositories: {this.state.user.public_repos}</h3>
              </div>
            </div>
            <img
              className='chart'
              style={
                {
                  border: '4px solid black',
                  borderRadius: '5px',
                  background: 'black',
                  padding: '.5rem, 1rem'
                }}
              src={`https://ghchart.rshah.org/${this.state.user.login}`}
              alt="2020jonush's Github chart"
            />
          </div>
        </div>

        <h2 className='follower-title'>Followers</h2>
        <form className= 'form' onSubmit={this.handleSubmit}>
          <input 
            type='text'
            placeholder='Enter a profile name'
            value={this.state.search}
            onChange={this.handleInput}
          />
          <button onSubmit={this.handleSubmit}>Search</button>
        </form>
        {this.state.followers.map((follower, index) => {
          return (
            <div  key={index} className='list'>
              <Follower follower={follower} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default App;
