import React from 'react';

const Follower = (props) => {
  return(
    <div className='follower'>
      <img
      src={props.follower.avatar_url}
      alt='profile-pic'></img>
      <h2>{props.follower.login}</h2>
    </div>
  )
}

// href={props.follower.url}
export default Follower;