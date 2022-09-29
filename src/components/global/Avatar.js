import React from 'react';
import Avatar from '@static'

// here add TS config 

const Avatar = ( {imgSrc, name, role} ) => {
  return (
    <div class="avatar">
       <img
          class="avatar__photo avatar__photo--xl"
          src={imgSrc}
          alt={name}
        />
      <div class="avatar__intro">
        <div class="avatar__name">{name}</div>
        <small class="avatar__subtitle">{role}</small>
      </div>
  </div>
  ) 
}

export default Avatar