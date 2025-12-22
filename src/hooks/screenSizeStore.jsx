import React, { useState,useEffect } from 'react'

export default function useScreenSize() {
    //hook ตรวจจับการปรับหน้าจอ
    const [screenWidth,setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResizeScreen = ()=>{
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize",handleResizeScreen);
        return () => window.removeEventListener("resize",handleResizeScreen);
      }
    }, [])
    
  return screenWidth;
}
