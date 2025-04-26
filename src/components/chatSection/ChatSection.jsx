import React, { useContext } from 'react'
import "./ChatSection.css"
import { IoSend } from "react-icons/io5";
import Darkmode from '../Darkmode/Darkmode'
import { datacontext } from '../../context/UserContext';
import user from "../../assets/user.png"
import ai from "../../assets/ai.png"

function ChatSection() {
  const { sent, input, setinput, showresult, messages, loading } = useContext(datacontext)
  
  return (
    <div className='chatsection'>
      <div className="topsection">
        {!showresult ? (
          <div className="headings">
            <span>HELLO VAIBHAVI,</span>
            <span>I'm Your Own Assistant</span>
            <span>How Can I Help You?</span>
          </div>
        ) : (
          <div className='result'>
            {messages.map((message, index) => (
              <div key={index} className={message.type === 'user' ? 'userbox' : 'aibox'}>
                <img src={message.type === 'user' ? user : ai} alt={message.type} />
                <p>{message.text}</p>
              </div>
            ))}
            {loading && (
              <div className="loader">
                <hr />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="bottomsection">
        <input 
          onChange={(e) => setinput(e.target.value)} 
          type='text' 
          placeholder='Message ChatGPT' 
          value={input}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              sent(input);
            }
          }}
        />
        <button 
          className='sendbtn' 
          onClick={() => input.trim() && sent(input)}
          disabled={loading}
        >
          <IoSend />
        </button>
        <Darkmode/>
      </div>
    </div>
  )
}

export default ChatSection
