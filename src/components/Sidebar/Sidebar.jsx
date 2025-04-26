import React, { useContext, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import { datacontext } from '../../context/UserContext';
function Sidebar() {
    const [extend, setextend] = useState(false)
    const{sent,previousresponse}=useContext(datacontext)
  return (
    <>
    <div className='sidebar'>
    <GiHamburgerMenu id='ham' onClick={()=>{
        setextend(prev=>!prev);
    }}/>
    <div className="newchat">
    <FaPlus />
    {extend?<p>New Chat</p>:null}
    </div>
    {previousresponse.map((item,index)=>{
    return(<div className="recent">
      <FaRegMessage />
      {extend?<p>{item}</p>:null}
      </div>)
    })}
    </div>
    </>
  )
}

export default Sidebar
