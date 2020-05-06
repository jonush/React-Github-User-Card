import React from 'react';

const Follower = (props) => {
  return(
    <div className='follower'>
      <img
      src={props.follower.avatar_url}
      alt='profile-pic'></img>
      <div className='follower-info'>
        <h2>{props.follower.login}</h2>
        <a href={props.follower.html_url}>Visit Profile</a>
      </div>
    </div>
  )
}

export default Follower;