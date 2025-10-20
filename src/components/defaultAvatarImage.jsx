import React from 'react'

export default function DefaultAvatarImage({username}) {
    const splitusername = username.split(" ");
    const profileLetter = splitusername?splitusername[0].charAt(0)+splitusername[1].charAt(0):"FL";
    

  return (
    <div className='avartarImageDefault'>{profileLetter}</div>
  )
}
