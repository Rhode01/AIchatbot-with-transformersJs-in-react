import React from 'react'
import "./chat.css"
import { useState, useEffect } from 'react'
const Chat = () => {
    const [messageList, setMessageList] = useState({
        user:"",
        response:""
    })
    const [message, setmessage] = useState("")
    const [showSendBtn, setSendBtn] = useState(false)
    const [results, setresults] = useEffect([])
    const worker = new Worker(new URL("./worker.js", import.meta.url),{
        type:"module"
    })
    worker.onmessage = (response) =>{

    }
    useEffect(()=>{
        const loadingModel = () =>{
            worker.postMessage("load model") 
        }
        loadingModel()
    },[])
    const getMessageResponse = ()=>{
        worker.postMessage({
            "message":message
        })
    }
    
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
                        <p className='message'></p>
                    </span>
                </div>
                <div className='receiver'>
                    <span>
                        <p className='message'></p>
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