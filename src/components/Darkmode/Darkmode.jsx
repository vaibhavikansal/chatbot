import React, { useEffect, useState } from 'react'
import { IoSunnyOutline } from "react-icons/io5";

import "./Darkmode.css"

function Darkmode() {
   const [mode, setmode] = useState("darkmode")
   useEffect(() => {
     document.body.className=mode
   }, [mode])
   
  return (
    <button className="darkmodebtn"onClick={()=>{
     if(mode==="darkmode"){
        setmode("lightmode")
     }
     else{
        setmode("darkmode")
     }
    }}><IoSunnyOutline /></button>
  )
}

export default Darkmode
