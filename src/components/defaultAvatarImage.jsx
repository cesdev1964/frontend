import React from 'react'

export default function DefaultAvatarImage({username ,width,height,fontSize}) {
    const splitusername = username.split(" ");
    const profileLetter = splitusername?splitusername[0].charAt(0)+splitusername[1].charAt(0):"FL";
    

  return (
    <div className='avartarImageDefault' style={{width:width,height:height,fontSize:fontSize}}>{profileLetter}</div>
  )
}
