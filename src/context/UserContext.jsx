import React, { createContext, useState } from 'react'
import run from '../gemini'
export const datacontext = createContext()

function UserContext({children}) {
  const [input, setinput] = useState("")
  const [showresult, setshowresult] = useState(false)
  const [loading, setloading] = useState(false)
  const [messages, setMessages] = useState([])
  const [recentprompt, setrecentprompt] = useState("")
  const [previousresponse, setpreviousresponse] = useState([])

  // Function to clean response text from markdown formatting
  const cleanResponse = (text) => {
    return text
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '')   // Remove italic markdown
      .replace(/`/g, '')    // Remove code markdown
      .trim()
  }

  async function sent(prompt) {
    if (!prompt.trim()) return;
    
    setshowresult(true)
    setrecentprompt(prompt)
    setloading(true)
    
    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      text: prompt
    }])
    
    try {
      const response = await run(prompt)
      // Clean and add AI response
      setMessages(prev => [...prev, {
        type: 'ai',
        text: cleanResponse(response)
      }])
      setpreviousresponse(prev => [...prev, prompt])
    } catch (error) {
      console.error('Error getting response:', error)
      // Add error message
      setMessages(prev => [...prev, {
        type: 'ai',
        text: 'Sorry, I encountered an error processing your request.'
      }])
    }
    
    setloading(false)
    setinput("")
  }

  const data = {
    loading,
    setloading,
    showresult,
    setshowresult,
    messages,
    setMessages,
    input,
    setinput,
    sent,
    recentprompt,
    setrecentprompt,
    previousresponse
  }

  return (
    <datacontext.Provider value={data}>
      {children}
    </datacontext.Provider>
  )
}

export default UserContext
