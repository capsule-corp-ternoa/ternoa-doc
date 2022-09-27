import React from 'react';

const Avatar = ( {img, name, role} ) => {
  return (
    <div class="avatar">
       <img
          class="avatar__photo avatar__photo--xl"
          src={img}
        />
      <div class="avatar__intro">
        <div class="avatar__name">{name}</div>
        <small class="avatar__subtitle">{role}</small>
      </div>
  </div>
  ) 
}

export default Avatar