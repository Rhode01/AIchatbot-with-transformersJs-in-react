import React from 'react'
import "./chat.css"
import { useState, useEffect } from 'react'
const Chat = () => {
    const worker = new Worker(new URL("./worker.js", import.meta.url),{
        type:"module"
    })
    const [message, setmessage] = useState("")
    const [showSendBtn, setSendBtn] = useState(false)
    const handleInputChange = (e) =>{
        setmessage(e.target.value)
    }
  return (
    <div className='container'>
        <div>
        <h6>AI CHATBOT IN REACT USING TRANSFORMERS JS</h6>
            <div className='message-list'>
                <div className='sender'>
                    <span>
                        <p className='message'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi doloremque, porro quod magnam quisquam aperiam quo modi amet magni rerum asperiores officia voluptatum nobis. Dignissimos quibusdam optio expedita totam nesciunt. </p>
                    </span>
                </div>
                <div className='receiver'>
                    <span>
                        <p className='message'>HELLO How are u</p>
                    </span>
                </div>
            </div>
            <form>
                
                <input type="text" value={message} onChange={handleInputChange} />
             {showSendBtn   &&  <input type="submit" value="Send"  /> }   
            </form>
        </div>
    </div>
  )
}
export default Chat